package singidunum.isa.sistemzarezervaciju.app.exception;

public class ResourceNotFoundException extends RuntimeException {

	/**
	 * 
	 */
	private static final long serialVersionUID = -5071600943765057446L;

	public ResourceNotFoundException(String poruka) {
		super(poruka);
	}
}
