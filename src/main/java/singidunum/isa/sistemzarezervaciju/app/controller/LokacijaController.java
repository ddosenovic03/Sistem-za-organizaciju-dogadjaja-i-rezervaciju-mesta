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

import singidunum.isa.sistemzarezervaciju.app.dto.LokacijaDTO;
import singidunum.isa.sistemzarezervaciju.app.model.Lokacija;
import singidunum.isa.sistemzarezervaciju.app.service.LokacijaService;

@RestController
@RequestMapping("/api/lokacije")
public class LokacijaController {

	@Autowired
	private LokacijaService lokacijaService;

	@GetMapping
	private List<LokacijaDTO> findAll() {
		return lokacijaService.findAll().stream().map(this::konvertujUDTO).collect(Collectors.toList());
	}

	@GetMapping("/{id}")
	public LokacijaDTO findById(@PathVariable Long id) {
		return konvertujUDTO(lokacijaService.findById(id));
	}

	@PostMapping
	public LokacijaDTO save(@RequestBody LokacijaDTO dto) {
		Lokacija l = konvertujUEntitet(dto);
		return konvertujUDTO(lokacijaService.save(l));
	}

	@PutMapping("/{id}")
	public LokacijaDTO update(@PathVariable Long id, @RequestBody LokacijaDTO dto) {
		Lokacija l = konvertujUEntitet(dto);
		return konvertujUDTO(lokacijaService.update(id, l));
	}

	@DeleteMapping("/{id}")
	public void delete(@PathVariable Long id) {
		lokacijaService.delete(id);
	}

	private LokacijaDTO konvertujUDTO(Lokacija l) {
		return new LokacijaDTO(l.getId(), l.getNaziv(), l.getAdresa(), l.getGrad(), l.getKapacitet());
	}

	private Lokacija konvertujUEntitet(LokacijaDTO dto) {
		return new Lokacija(dto.getId(), dto.getNaziv(), dto.getAdresa(), dto.getGrad(), dto.getKapacitet());
	}
}
