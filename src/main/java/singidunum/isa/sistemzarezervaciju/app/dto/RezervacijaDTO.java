package singidunum.isa.sistemzarezervaciju.app.dto;

import java.time.LocalDateTime;

import singidunum.isa.sistemzarezervaciju.app.model.StatusRezervacije;

public class RezervacijaDTO {

	private Long id;
	private LocalDateTime datumRezervacije;
	private Integer brMesta;
	private StatusRezervacije status;

	private Long dogadjajId;
	private String dogadjajNaziv;

	private Long posetilacId;
	private String posetilacIme;
	private String posetilacPrezime;

	public RezervacijaDTO() {
		super();
		// TODO Auto-generated constructor stub
	}

	public RezervacijaDTO(Long id, LocalDateTime datumRezervacije, Integer brMesta, StatusRezervacije status,
			Long dogadjajId, String dogadjajNaziv, Long posetilacId, String posetilacIme, String posetilacPrezime) {
		super();
		this.id = id;
		this.datumRezervacije = datumRezervacije;
		this.brMesta = brMesta;
		this.status = status;
		this.dogadjajId = dogadjajId;
		this.dogadjajNaziv = dogadjajNaziv;
		this.posetilacId = posetilacId;
		this.posetilacIme = posetilacIme;
		this.posetilacPrezime = posetilacPrezime;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public LocalDateTime getDatumRezervacije() {
		return datumRezervacije;
	}

	public void setDatumRezervacije(LocalDateTime datumRezervacije) {
		this.datumRezervacije = datumRezervacije;
	}

	public Integer getBrMesta() {
		return brMesta;
	}

	public void setBrMesta(Integer brMesta) {
		this.brMesta = brMesta;
	}

	public StatusRezervacije getStatus() {
		return status;
	}

	public void setStatus(StatusRezervacije status) {
		this.status = status;
	}

	public Long getDogadjajId() {
		return dogadjajId;
	}

	public void setDogadjajId(Long dogadjajId) {
		this.dogadjajId = dogadjajId;
	}

	public String getDogadjajNaziv() {
		return dogadjajNaziv;
	}

	public void setDogadjajNaziv(String dogadjajNaziv) {
		this.dogadjajNaziv = dogadjajNaziv;
	}

	public Long getPosetilacId() {
		return posetilacId;
	}

	public void setPosetilacId(Long posetilacId) {
		this.posetilacId = posetilacId;
	}

	public String getPosetilacIme() {
		return posetilacIme;
	}

	public void setPosetilacIme(String posetilacIme) {
		this.posetilacIme = posetilacIme;
	}

	public String getPosetilacPrezime() {
		return posetilacPrezime;
	}

	public void setPosetilacPrezime(String posetilacPrezime) {
		this.posetilacPrezime = posetilacPrezime;
	}

}
