package singidunum.isa.sistemzarezervaciju.app.dto;

public class LokacijaDTO {

	private Long id;
	private String naziv;
	private String adresa;
	private String grad;
	private Integer kapacitet;

	public LokacijaDTO() {
		super();
		// TODO Auto-generated constructor stub
	}

	public LokacijaDTO(Long id, String naziv, String adresa, String grad, Integer kapacitet) {
		super();
		this.id = id;
		this.naziv = naziv;
		this.adresa = adresa;
		this.grad = grad;
		this.kapacitet = kapacitet;
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

	public Integer getKapacitet() {
		return kapacitet;
	}

	public void setKapacitet(Integer kapacitet) {
		this.kapacitet = kapacitet;
	}

}
