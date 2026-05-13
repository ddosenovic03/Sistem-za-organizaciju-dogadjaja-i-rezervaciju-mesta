package singidunum.isa.sistemzarezervaciju.app.dto;

import java.time.LocalDateTime;

import singidunum.isa.sistemzarezervaciju.app.model.StatusDogadjaja;

public class DogadjajDTO {

	private Long id;
	private String naziv;
	private String opis;
	private LocalDateTime datumOdrzavanja;
	private Integer maksBrMesta;
	private Integer brSlobodnihMesta;
	private StatusDogadjaja status;

	private Long organizatorId;
	private String organizatorIme;

	private Long lokacijaId;
	private String lokacijaNaziv;
	private String grad;

	public DogadjajDTO() {
		super();
		// TODO Auto-generated constructor stub
	}

	public DogadjajDTO(Long id, String naziv, String opis, LocalDateTime datumOdrzavanja, Integer maksBrMesta,
			Integer brSlobodnihMesta, StatusDogadjaja status, Long organizatorId, String organizatorIme,
			Long lokacijaId, String lokacijaNaziv, String grad) {
		super();
		this.id = id;
		this.naziv = naziv;
		this.opis = opis;
		this.datumOdrzavanja = datumOdrzavanja;
		this.maksBrMesta = maksBrMesta;
		this.brSlobodnihMesta = brSlobodnihMesta;
		this.status = status;
		this.organizatorId = organizatorId;
		this.organizatorIme = organizatorIme;
		this.lokacijaId = lokacijaId;
		this.lokacijaNaziv = lokacijaNaziv;
		this.grad = grad;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getNaziv() {
		return naziv;
	}

	public void setNaziv(String naziv) {
		this.naziv = naziv;
	}

	public String getOpis() {
		return opis;
	}

	public void setOpis(String opis) {
		this.opis = opis;
	}

	public LocalDateTime getDatumOdrzavanja() {
		return datumOdrzavanja;
	}

	public void setDatumOdrzavanja(LocalDateTime datumOdrzavanja) {
		this.datumOdrzavanja = datumOdrzavanja;
	}

	public Integer getMaksBrMesta() {
		return maksBrMesta;
	}

	public void setMaksBrMesta(Integer maksBrMesta) {
		this.maksBrMesta = maksBrMesta;
	}

	public Integer getBrSlobodnihMesta() {
		return brSlobodnihMesta;
	}

	public void setBrSlobodnihMesta(Integer brSlobodnihMesta) {
		this.brSlobodnihMesta = brSlobodnihMesta;
	}

	public StatusDogadjaja getStatus() {
		return status;
	}

	public void setStatus(StatusDogadjaja status) {
		this.status = status;
	}

	public Long getOrganizatorId() {
		return organizatorId;
	}

	public void setOrganizatorId(Long organizatorId) {
		this.organizatorId = organizatorId;
	}

	public String getOrganizatorIme() {
		return organizatorIme;
	}

	public void setOrganizatorIme(String organizatorIme) {
		this.organizatorIme = organizatorIme;
	}

	public Long getLokacijaId() {
		return lokacijaId;
	}

	public void setLokacijaId(Long lokacijaId) {
		this.lokacijaId = lokacijaId;
	}

	public String getLokacijaNaziv() {
		return lokacijaNaziv;
	}

	public void setLokacijaNaziv(String lokacijaNaziv) {
		this.lokacijaNaziv = lokacijaNaziv;
	}

	public String getGrad() {
		return grad;
	}

	public void setGrad(String grad) {
		this.grad = grad;
	}

}
