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

import singidunum.isa.sistemzarezervaciju.app.dto.OrganizatorDTO;
import singidunum.isa.sistemzarezervaciju.app.model.Organizator;
import singidunum.isa.sistemzarezervaciju.app.service.OrganizatorService;

@RestController
@RequestMapping(path = "/api/organizatori")
public class OrganizatorController {

	@Autowired
	private OrganizatorService organizatorService;

	@GetMapping
	public List<OrganizatorDTO> findAll() {
		return organizatorService.findAll().stream().map(this::konvertujUDTO).collect(Collectors.toList());
	}

	@GetMapping("/{id}")
	public OrganizatorDTO findById(@PathVariable Long id) {
		return konvertujUDTO(organizatorService.findById(id));
	}

	@PostMapping
	public OrganizatorDTO save(@RequestBody OrganizatorDTO dto) {
		Organizator o = konvertujUEntitet(dto);
		return konvertujUDTO(organizatorService.save(o));
	}

	@PutMapping("/{id}")
	public OrganizatorDTO update(@PathVariable Long id, @RequestBody OrganizatorDTO dto) {
		Organizator o = konvertujUEntitet(dto);
		return konvertujUDTO(organizatorService.update(id, o));
	}

	@DeleteMapping("/{id}")
	public void delete(@PathVariable Long id) {
		organizatorService.delete(id);
	}

	private OrganizatorDTO konvertujUDTO(Organizator o) {
		return new OrganizatorDTO(o.getId(), o.getIme(), o.getEmail(), o.getKompanija());
	}

	private Organizator konvertujUEntitet(OrganizatorDTO dto) {
		return new Organizator(dto.getId(), dto.getIme(), dto.getEmail(), dto.getKompanija());
	}
}
