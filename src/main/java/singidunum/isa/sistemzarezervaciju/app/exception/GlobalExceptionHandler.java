package singidunum.isa.sistemzarezervaciju.app.exception;

import java.time.LocalDateTime;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class GlobalExceptionHandler {

	@ExceptionHandler(ResourceNotFoundException.class)
	public ResponseEntity<ErrorResponse> handleNotFound(ResourceNotFoundException ex) {

		ErrorResponse e = new ErrorResponse(LocalDateTime.now(), HttpStatus.NOT_FOUND.value(), "NOT FOUND",
				ex.getMessage());
		return new ResponseEntity<ErrorResponse>(e, HttpStatus.NOT_FOUND);
	}

	@ExceptionHandler(BadRequestException.class)
	public ResponseEntity<ErrorResponse> handleBadRequest(BadRequestException ex) {

		ErrorResponse e = new ErrorResponse(LocalDateTime.now(), HttpStatus.BAD_REQUEST.value(), "BAD REQUEST",
				ex.getMessage());
		return new ResponseEntity<ErrorResponse>(e, HttpStatus.BAD_REQUEST);
	}

	@ExceptionHandler(Exception.class)
	public ResponseEntity<ErrorResponse> handleGeneral(Exception ex) {

		ErrorResponse e = new ErrorResponse(LocalDateTime.now(), HttpStatus.INTERNAL_SERVER_ERROR.value(),
				"INTERNAL SERVER ERROR", ex.getMessage());
		return new ResponseEntity<ErrorResponse>(e, HttpStatus.INTERNAL_SERVER_ERROR);
	}
}
