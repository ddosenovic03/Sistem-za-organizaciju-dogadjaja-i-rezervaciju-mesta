package singidunum.isa.sistemzarezervaciju.app.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import singidunum.isa.sistemzarezervaciju.app.exception.BadRequestException;
import singidunum.isa.sistemzarezervaciju.app.exception.ResourceNotFoundException;
import singidunum.isa.sistemzarezervaciju.app.model.Lokacija;
import singidunum.isa.sistemzarezervaciju.app.repository.LokacijaRepository;

@Service
public class LokacijaService {

	@Autowired
	private LokacijaRepository lokacijaRepository;

	public List<Lokacija> findAll() {
		return (List<Lokacija>) this.lokacijaRepository.findAll();
	}

	public Lokacija findById(Long id) {
		Optional<Lokacija> lokacija = this.lokacijaRepository.findById(id);

		if (lokacija.isEmpty()) {
			throw new ResourceNotFoundException("Lokacija nije pronađena.");
		}

		return lokacija.get();
	}

	public Lokacija save(Lokacija l) {

		if (l.getKapacitet() <= 0) {
			throw new BadRequestException("Kapacitet lokacije mora biti veći od 0.");
		}

		return this.lokacijaRepository.save(l);
	}

	public Lokacija update(Long id, Lokacija l) {
		Lokacija lokacija = this.findById(id);

		if (l.getKapacitet() <= 0) {
			throw new BadRequestException("Kapacitet lokacije mora biti veći od 0.");
		}

		lokacija.setNaziv(l.getNaziv());
		lokacija.setAdresa(l.getAdresa());
		lokacija.setGrad(l.getGrad());
		lokacija.setKapacitet(l.getKapacitet());

		return this.lokacijaRepository.save(lokacija);
	}

	public void delete(Long id) {
		Lokacija lokacija = this.findById(id);
		this.lokacijaRepository.delete(lokacija);
	}
}
