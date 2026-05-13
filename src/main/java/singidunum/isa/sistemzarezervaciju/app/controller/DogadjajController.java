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

import singidunum.isa.sistemzarezervaciju.app.dto.DogadjajDTO;
import singidunum.isa.sistemzarezervaciju.app.model.Dogadjaj;
import singidunum.isa.sistemzarezervaciju.app.model.Lokacija;
import singidunum.isa.sistemzarezervaciju.app.model.Organizator;
import singidunum.isa.sistemzarezervaciju.app.service.DogadjajService;
import singidunum.isa.sistemzarezervaciju.app.service.LokacijaService;
import singidunum.isa.sistemzarezervaciju.app.service.OrganizatorService;

@RestController
@RequestMapping("/api/dogadjaji")
public class DogadjajController {
	
	@Autowired
	private DogadjajService dogadjajService;

	@Autowired
	private OrganizatorService organizatorService;

	@Autowired
	private LokacijaService lokacijaService;

	@GetMapping
	public List<DogadjajDTO> findAll() {
		return dogadjajService.findAll().stream().map(this::konvertujUDTO).collect(Collectors.toList());
	}

	@GetMapping("/{id}")
	public DogadjajDTO findById(@PathVariable Long id) {
		return konvertujUDTO(dogadjajService.findById(id));
	}

	@PostMapping
	public DogadjajDTO save(@RequestBody DogadjajDTO dto) {
		Dogadjaj d = konvertujUEntitet(dto);
		return konvertujUDTO(dogadjajService.save(d));
	}

	@PutMapping("/{id}")
	public DogadjajDTO update(@PathVariable Long id, @RequestBody DogadjajDTO dto) {
		Dogadjaj d = konvertujUEntitet(dto);
		return konvertujUDTO(dogadjajService.update(id, d));
	}

	@DeleteMapping("/{id}")
	public void delete(@PathVariable Long id) {
		dogadjajService.delete(id);
	}

	private DogadjajDTO konvertujUDTO(Dogadjaj d) {
		return new DogadjajDTO(
				d.getId(),
				d.getNaziv(),
				d.getOpis(),
				d.getDatumOdrzavanja(),
				d.getMaksBrMesta(),
				d.getBrSlobodnihMesta(),
				d.getStatus(),
				d.getOrganizator().getId(),
				d.getOrganizator().getIme(),
				d.getLokacija().getId(),
				d.getLokacija().getNaziv(),
				d.getLokacija().getGrad()
		);
	}

	private Dogadjaj konvertujUEntitet(DogadjajDTO dto) {
		Organizator organizator = organizatorService.findById(dto.getOrganizatorId());
		Lokacija lokacija = lokacijaService.findById(dto.getLokacijaId());

		return new Dogadjaj(
				dto.getId(),
				dto.getNaziv(),
				dto.getOpis(),
				dto.getDatumOdrzavanja(),
				dto.getMaksBrMesta(),
				dto.getBrSlobodnihMesta(),
				dto.getStatus(),
				organizator,
				lokacija
		);
	}
}
