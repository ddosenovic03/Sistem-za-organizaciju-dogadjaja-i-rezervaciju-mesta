package singidunum.isa.sistemzarezervaciju.app.dto;

public class OrganizatorDTO {

	private Long id;
	private String ime;
	private String email;
	private String kompanija;

	public OrganizatorDTO() {
		super();
		// TODO Auto-generated constructor stub
	}

	public OrganizatorDTO(Long id, String ime, String email, String kompanija) {
		super();
		this.id = id;
		this.ime = ime;
		this.email = email;
		this.kompanija = kompanija;
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
