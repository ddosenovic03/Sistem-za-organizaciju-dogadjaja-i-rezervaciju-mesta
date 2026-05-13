package singidunum.isa.sistemzarezervaciju.app.exception;

public class BadRequestException extends RuntimeException {

	/**
	 * 
	 */
	private static final long serialVersionUID = -2953233100240877141L;

	public BadRequestException(String poruka) {
		super(poruka);
	}
}
