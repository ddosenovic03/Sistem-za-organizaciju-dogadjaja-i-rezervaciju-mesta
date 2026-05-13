package singidunum.isa.sistemzarezervaciju.app.model;

import java.util.ArrayList;
import java.util.List;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;

@Entity
public class Lokacija {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@Column(nullable = false)
	private String naziv;

	@Column(nullable = false)
	private String adresa;

	@Column(nullable = false)
	private String grad;

	@Column(nullable = false)
	private int kapacitet;

	@OneToMany(mappedBy = "lokacija")
	private List<Dogadjaj> dogadjaji = new ArrayList<>();

	public Lokacija() {
		super();
		// TODO Auto-generated constructor stub
	}

	public Lokacija(Long id, String naziv, String adresa, String grad, int kapacitet) {
		super();
		this.id = id;
		this.naziv = naziv;
		this.adresa = adresa;
		this.grad = grad;
		this.kapacitet = kapacitet;
	}

	public List<Dogadjaj> getDogadjaji() {
		return dogadjaji;
	}

	public void setDogadjaji(List<Dogadjaj> dogadjaji) {
		this.dogadjaji = dogadjaji;
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

	public String getAdresa() {
		return adresa;
	}

	public void setAdresa(String adresa) {
		this.adresa = adresa;
	}

	public String getGrad() {
		return grad;
	}

	public void setGrad(String grad) {
		this.grad = grad;
	}

	public int getKapacitet() {
		return kapacitet;
	}

	public void setKapacitet(int kapacitet) {
		this.kapacitet = kapacitet;
	}

}
