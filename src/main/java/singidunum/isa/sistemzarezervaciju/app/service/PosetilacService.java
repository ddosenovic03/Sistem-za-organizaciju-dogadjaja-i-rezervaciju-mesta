package singidunum.isa.sistemzarezervaciju.app.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import singidunum.isa.sistemzarezervaciju.app.model.Posetilac;
import singidunum.isa.sistemzarezervaciju.app.repository.PosetilacRepository;

@Service
public class PosetilacService {

	@Autowired
	private PosetilacRepository posetilacRepository;

	public Iterable<Posetilac> findAll() {
		return this.posetilacRepository.findAll();
	}

	public Posetilac findById(Long id) {
		Optional<Posetilac> posetilac = this.posetilacRepository.findById(id);

		if (posetilac.isEmpty()) {
			throw new RuntimeException("Posetilac nije pronađen.");
		}

		return posetilac.get();
	}

	public Posetilac save(Posetilac p) {
		return this.posetilacRepository.save(p);
	}

	public Posetilac update(Long id, Posetilac p) {
		Posetilac posetilac = this.findById(id);

		posetilac.setIme(p.getIme());
		posetilac.setPrezime(p.getPrezime());
		posetilac.setEmail(p.getEmail());
		posetilac.setTelefon(p.getTelefon());

		return this.posetilacRepository.save(posetilac);
	}

	public void delete(Long id) {
		Posetilac posetilac = this.findById(id);
		this.posetilacRepository.delete(posetilac);
	}
}
