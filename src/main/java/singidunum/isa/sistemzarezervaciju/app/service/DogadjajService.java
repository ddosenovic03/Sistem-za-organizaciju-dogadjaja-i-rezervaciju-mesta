package singidunum.isa.sistemzarezervaciju.app.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import singidunum.isa.sistemzarezervaciju.app.model.Dogadjaj;
import singidunum.isa.sistemzarezervaciju.app.model.StatusDogadjaja;
import singidunum.isa.sistemzarezervaciju.app.repository.DogadjajRepository;

@Service
public class DogadjajService {

	@Autowired
	private DogadjajRepository dogadjajRepository;

	public Iterable<Dogadjaj> findAll() {
		return this.dogadjajRepository.findAll();
	}

	public Dogadjaj findById(Long id) {
		Optional<Dogadjaj> dogadjaj = dogadjajRepository.findById(id);

		if (dogadjaj.isEmpty()) {
			throw new RuntimeException("Dogadjaj nije pronađen.");
		}

		return dogadjaj.get();
	}

	public Dogadjaj save(Dogadjaj d) {

		if (d.getBrSlobodnihMesta() == null) {
			d.setBrSlobodnihMesta(d.getMaksBrMesta());
		}

		if (d.getStatus() == null) {
			d.setStatus(StatusDogadjaja.AKTIVAN);
		}

		if (d.getMaksBrMesta() <= 0) {
			throw new RuntimeException("Maksimalan broj mesta mora biti veći od 0.");
		}

		if (d.getLokacija().getKapacitet() < d.getMaksBrMesta()) {
			throw new RuntimeException("Maksimalan broj mesta ne može biti veći od kapaciteta lokacije.");
		}

		return this.dogadjajRepository.save(d);
	}

	public Dogadjaj update(Long id, Dogadjaj d) {
		Dogadjaj dogadjaj = this.findById(id);

		dogadjaj.setNaziv(d.getNaziv());
		dogadjaj.setBrSlobodnihMesta(d.getBrSlobodnihMesta());
		dogadjaj.setMaksBrMesta(d.getMaksBrMesta());
		dogadjaj.setOpis(d.getOpis());
		dogadjaj.setDatumOdrzavanja(d.getDatumOdrzavanja());
		dogadjaj.setLokacija(d.getLokacija());
		dogadjaj.setOrganizator(d.getOrganizator());
		dogadjaj.setStatus(d.getStatus());

		return this.dogadjajRepository.save(dogadjaj);
	}

	public void delete(Long id) {
		Dogadjaj dogadjaj = this.findById(id);
		this.dogadjajRepository.delete(dogadjaj);
	}
}
