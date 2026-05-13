package singidunum.isa.sistemzarezervaciju.app.model;

import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;

@Entity
public class Rezervacija {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@Column(nullable = false)
	private LocalDateTime datumRezervacije;

	@Column(nullable = false)
	private Integer brMesta;

	@Enumerated(EnumType.STRING)
	@Column(nullable = false)
	private StatusRezervacije status;

	@ManyToOne(optional = false)
	private Dogadjaj dogadjaj;

	@ManyToOne(optional = false)
	private Posetilac posetilac;

	public Rezervacija() {
		super();
		// TODO Auto-generated constructor stub
	}

	public Rezervacija(Long id, LocalDateTime datumRezervacije, Integer brMesta, StatusRezervacije status,
			Dogadjaj dogadjaj, Posetilac posetilac) {
		super();
		this.id = id;
		this.datumRezervacije = datumRezervacije;
		this.brMesta = brMesta;
		this.status = status;
		this.dogadjaj = dogadjaj;
		this.posetilac = posetilac;
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

	public Dogadjaj getDogadjaj() {
		return dogadjaj;
	}

	public void setDogadjaj(Dogadjaj dogadjaj) {
		this.dogadjaj = dogadjaj;
	}

	public Posetilac getPosetilac() {
		return posetilac;
	}

	public void setPosetilac(Posetilac posetilac) {
		this.posetilac = posetilac;
	}

}
