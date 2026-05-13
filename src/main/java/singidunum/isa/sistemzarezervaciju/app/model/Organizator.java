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
public class Organizator {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@Column(nullable = false)
	private String ime;

	@Column(nullable = false, unique = true)
	private String email;

	@Column(nullable = false)
	private String kompanija;
	
	@OneToMany(mappedBy = "organizator")
	private List<Dogadjaj> dogadjaji = new ArrayList<>();

	public Organizator() {
		super();
		// TODO Auto-generated constructor stub
	}

	public Organizator(Long id, String ime, String email, String kompanija) {
		super();
		this.id = id;
		this.ime = ime;
		this.email = email;
		this.kompanija = kompanija;
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

	public String getIme() {
		return ime;
	}

	public void setIme(String ime) {
		this.ime = ime;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getKompanija() {
		return kompanija;
	}

	public void setKompanija(String kompanija) {
		this.kompanija = kompanija;
	}

}
