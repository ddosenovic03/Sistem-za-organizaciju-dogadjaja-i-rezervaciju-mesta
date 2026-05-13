package singidunum.isa.sistemzarezervaciju.app.service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import singidunum.isa.sistemzarezervaciju.app.model.Dogadjaj;
import singidunum.isa.sistemzarezervaciju.app.model.Posetilac;
import singidunum.isa.sistemzarezervaciju.app.model.Rezervacija;
import singidunum.isa.sistemzarezervaciju.app.model.StatusDogadjaja;
import singidunum.isa.sistemzarezervaciju.app.model.StatusRezervacije;
import singidunum.isa.sistemzarezervaciju.app.repository.DogadjajRepository;
import singidunum.isa.sistemzarezervaciju.app.repository.PosetilacRepository;
import singidunum.isa.sistemzarezervaciju.app.repository.RezervacijaRepository;

@Service
public class RezervacijaService {

	@Autowired
	private RezervacijaRepository rezervacijaRepository;

	@Autowired
	private DogadjajRepository dogadjajRepository;

	@Autowired
	private PosetilacRepository posetilacRepository;

	public List<Rezervacija> findAll() {
		return (List<Rezervacija>) this.rezervacijaRepository.findAll();
	}

	public Rezervacija findById(Long id) {
		Optional<Rezervacija> rezervacija = this.rezervacijaRepository.findById(id);
		
		if (rezervacija.isEmpty()) {
			throw new RuntimeException("Rezervacija nije pronađena.");
		}
		
		return rezervacija.get();
	}
	
	public Rezervacija save(Long dogadjajId, Long posetilacId, Integer brMesta) {

		Optional<Dogadjaj> dogadjajOptional = this.dogadjajRepository.findById(dogadjajId);
		Optional<Posetilac> posetilacOptional = this.posetilacRepository.findById(posetilacId);

		if (dogadjajOptional.isEmpty()) {
			throw new RuntimeException("Događaj nije pronađen.");
		}

		if (posetilacOptional.isEmpty()) {
			throw new RuntimeException("Posetilac nije pronađen.");
		}

		Dogadjaj dogadjaj = dogadjajOptional.get();
		Posetilac posetilac = posetilacOptional.get();

		if (dogadjaj.getStatus() != StatusDogadjaja.AKTIVAN) {
			throw new RuntimeException("Rezervacija nije moguća jer događaj nije aktivan.");
		}

		if (brMesta <= 0) {
			throw new RuntimeException("Broj mesta mora biti veći od 0.");
		}

		if (dogadjaj.getBrSlobodnihMesta() < brMesta) {
			throw new RuntimeException("Nema dovoljno slobodnih mesta.");
		}

		if (this.rezervacijaRepository.postojiAktivnaRezervacija(dogadjajId, posetilacId)) {
			throw new RuntimeException("Posetilac već ima aktivnu rezervaciju za ovaj događaj.");
		}

		Rezervacija r = new Rezervacija();
		r.setDogadjaj(dogadjaj);
		r.setPosetilac(posetilac);
		r.setBrMesta(brMesta);
		r.setDatumRezervacije(LocalDateTime.now());
		r.setStatus(StatusRezervacije.AKTIVNA);

		dogadjaj.setBrSlobodnihMesta(dogadjaj.getBrSlobodnihMesta() - brMesta);

		if (dogadjaj.getBrSlobodnihMesta() == 0) {
			dogadjaj.setStatus(StatusDogadjaja.POPUNJEN);
		}

		this.dogadjajRepository.save(dogadjaj);

		return this.rezervacijaRepository.save(r);
	}

	public Rezervacija delete(Long rezervacijaId) {

		Optional<Rezervacija> rezervacijaOptional = this.rezervacijaRepository.findById(rezervacijaId);

		if (rezervacijaOptional.isEmpty()) {
			throw new RuntimeException("Rezervacija nije pronađena.");
		}

		Rezervacija rezervacija = rezervacijaOptional.get();

		if (rezervacija.getStatus() == StatusRezervacije.OTKAZANA) {
			throw new RuntimeException("Rezervacija je već otkazana.");
		}

		Dogadjaj dogadjaj = rezervacija.getDogadjaj();

		rezervacija.setStatus(StatusRezervacije.OTKAZANA);
		dogadjaj.setBrSlobodnihMesta(dogadjaj.getBrSlobodnihMesta() + rezervacija.getBrMesta());

		if (dogadjaj.getStatus() == StatusDogadjaja.POPUNJEN) {
			dogadjaj.setStatus(StatusDogadjaja.AKTIVAN);
		}

		this.dogadjajRepository.save(dogadjaj);

		return this.rezervacijaRepository.save(rezervacija);

	}
}
