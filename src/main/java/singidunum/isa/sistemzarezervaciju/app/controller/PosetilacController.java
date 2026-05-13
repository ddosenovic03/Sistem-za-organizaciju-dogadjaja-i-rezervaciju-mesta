package singidunum.isa.sistemzarezervaciju.app.controller;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import singidunum.isa.sistemzarezervaciju.app.dto.PosetilacDTO;
import singidunum.isa.sistemzarezervaciju.app.model.Posetilac;
import singidunum.isa.sistemzarezervaciju.app.service.PosetilacService;

@RestController
@RequestMapping(path = "/api/posetioci")
public class PosetilacController {

	@Autowired
	private PosetilacService posetilacService;

	@GetMapping
	public List<PosetilacDTO> findAll() {
		return posetilacService.findAll().stream().map(this::konvertujUDTO).collect(Collectors.toList());
	}

	@GetMapping("/{id}")
	public PosetilacDTO findById(@PathVariable Long id) {
		return konvertujUDTO(posetilacService.findById(id));
	}

	@PostMapping
	public PosetilacDTO save(@RequestBody PosetilacDTO dto) {
		Posetilac p = konvertujUEntitet(dto);
		return konvertujUDTO(posetilacService.save(p));
	}

	@PutMapping("/{id}")
	public PosetilacDTO update(@PathVariable Long id, @RequestBody PosetilacDTO dto) {
		Posetilac p = konvertujUEntitet(dto);
		return konvertujUDTO(posetilacService.update(id, p));
	}

	@DeleteMapping("/{id}")
	public void delete(@PathVariable Long id) {
		posetilacService.delete(id);
	}

	private PosetilacDTO konvertujUDTO(Posetilac p) {
		return new PosetilacDTO(p.getId(), p.getIme(), p.getPrezime(), p.getEmail(), p.getTelefon());
	}

	private Posetilac konvertujUEntitet(PosetilacDTO dto) {
		return new Posetilac(dto.getId(), dto.getIme(), dto.getPrezime(), dto.getEmail(), dto.getTelefon());
	}
}
