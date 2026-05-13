package singidunum.isa.sistemzarezervaciju.app.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import singidunum.isa.sistemzarezervaciju.app.model.Organizator;
import singidunum.isa.sistemzarezervaciju.app.repository.OrganizatorRepository;

@Service
public class OrganizatorService {

	@Autowired
	private OrganizatorRepository organizatorRepository;

	public Iterable<Organizator> findAll() {
		return this.organizatorRepository.findAll();
	}

	public Organizator findById(Long id) {
		Optional<Organizator> organizator = this.organizatorRepository.findById(id);

		if (organizator.isEmpty()) {
			throw new RuntimeException("Organizator nije pronađen.");
		}

		return organizator.get();
	}

	public Organizator save(Organizator o) {
		return this.organizatorRepository.save(o);
	}

	public Organizator update(Long id, Organizator o) {
		Organizator organizator = this.findById(id);

		organizator.setIme(o.getIme());
		organizator.setEmail(o.getEmail());
		organizator.setKompanija(o.getKompanija());

		return this.organizatorRepository.save(organizator);
	}
}
