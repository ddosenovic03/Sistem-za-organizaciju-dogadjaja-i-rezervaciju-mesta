package singidunum.isa.sistemzarezervaciju.app.dto;

public class RezervacijaRequestDTO {

	private Long dogadjajId;
	private Long posetilacId;
	private Integer brMesta;

	public RezervacijaRequestDTO() {
		super();
		// TODO Auto-generated constructor stub
	}

	public RezervacijaRequestDTO(Long dogadjajId, Long posetilacId, Integer brMesta) {
		super();
		this.dogadjajId = dogadjajId;
		this.posetilacId = posetilacId;
		this.brMesta = brMesta;
	}

	public Long getDogadjajId() {
		return dogadjajId;
	}

	public void setDogadjajId(Long dogadjajId) {
		this.dogadjajId = dogadjajId;
	}

	public Long getPosetilacId() {
		return posetilacId;
	}

	public void setPosetilacId(Long posetilacId) {
		this.posetilacId = posetilacId;
	}

	public Integer getBrMesta() {
		return brMesta;
	}

	public void setBrMesta(Integer brMesta) {
		this.brMesta = brMesta;
	}

}
