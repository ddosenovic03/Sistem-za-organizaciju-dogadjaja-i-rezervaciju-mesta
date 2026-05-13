package singidunum.isa.sistemzarezervaciju.app.model;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;

@Entity
public class Dogadjaj {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@Column(nullable = false)
	private String naziv;

	@Column(nullable = false)
	private String opis;

	@Column(nullable = false)
	private LocalDateTime datumOdrzavanja;

	@Column(nullable = false)
	private Integer maksBrMesta;

	@Column(nullable = false)
	private Integer brSlobodnihMesta;

	@Enumerated(EnumType.STRING)
	@Column(nullable = false)
	private StatusDogadjaja status;

	@ManyToOne(optional = false)
	private Organizator organizator;

	@ManyToOne(optional = false)
	private Lokacija lokacija;

	@OneToMany(mappedBy = "dogadjaj")
	private List<Rezervacija> rezervacije = new ArrayList<>();

	public Dogadjaj() {
		super();
		// TODO Auto-generated constructor stub
	}

	public Dogadjaj(Long id, String naziv, String opis, LocalDateTime datumOdrzavanja, Integer maksBrMesta,
			Integer brSlobodnihMesta, StatusDogadjaja status, Organizator organizator, Lokacija lokacija) {
		super();
		this.id = id;
		this.naziv = naziv;
		this.opis = opis;
		this.datumOdrzavanja = datumOdrzavanja;
		this.maksBrMesta = maksBrMesta;
		this.brSlobodnihMesta = brSlobodnihMesta;
		this.status = status;
		this.organizator = organizator;
		this.lokacija = lokacija;
	}

	public List<Rezervacija> getRezervacije() {
		return rezervacije;
	}

	public void setRezervacije(List<Rezervacija> rezervacije) {
		this.rezervacije = rezervacije;
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

	public Organizator getOrganizator() {
		return organizator;
	}

	public void setOrganizator(Organizator organizator) {
		this.organizator = organizator;
	}

	public Lokacija getLokacija() {
		return lokacija;
	}

	public void setLokacija(Lokacija lokacija) {
		this.lokacija = lokacija;
	}

}
