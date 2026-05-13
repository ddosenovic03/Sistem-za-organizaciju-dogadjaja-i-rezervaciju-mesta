package singidunum.isa.sistemzarezervaciju.app.controller;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import singidunum.isa.sistemzarezervaciju.app.dto.RezervacijaDTO;
import singidunum.isa.sistemzarezervaciju.app.dto.RezervacijaRequestDTO;
import singidunum.isa.sistemzarezervaciju.app.model.Rezervacija;
import singidunum.isa.sistemzarezervaciju.app.service.RezervacijaService;

@RestController
@RequestMapping(path = "/api/rezervacije")
public class RezervacijaController {

	@Autowired
	private RezervacijaService rezervacijaService;

	@GetMapping
	public List<RezervacijaDTO> findAll() {
		return rezervacijaService.findAll().stream().map(this::konvertujUDTO).collect(Collectors.toList());
	}

	@GetMapping("/{id}")
	public RezervacijaDTO findById(@PathVariable Long id) {
		return konvertujUDTO(rezervacijaService.findById(id));
	}

	@PostMapping
	public RezervacijaDTO save(@RequestBody RezervacijaRequestDTO dto) {
		Rezervacija r = rezervacijaService.save(
				dto.getDogadjajId(),
				dto.getPosetilacId(),
				dto.getBrMesta()
		);

		return konvertujUDTO(r);
	}

	@PutMapping("/{id}/otkazi")
	public RezervacijaDTO otkazi(@PathVariable Long id) {
		return konvertujUDTO(rezervacijaService.delete(id));
	}

	private RezervacijaDTO konvertujUDTO(Rezervacija r) {
		return new RezervacijaDTO(
				r.getId(),
				r.getDatumRezervacije(),
				r.getBrMesta(),
				r.getStatus(),
				r.getDogadjaj().getId(),
				r.getDogadjaj().getNaziv(),
				r.getPosetilac().getId(),
				r.getPosetilac().getIme(),
				r.getPosetilac().getPrezime()
		);
	}
}
