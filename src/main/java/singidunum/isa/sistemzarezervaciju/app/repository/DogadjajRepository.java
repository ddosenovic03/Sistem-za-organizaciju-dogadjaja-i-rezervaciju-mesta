package singidunum.isa.sistemzarezervaciju.app.repository;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import singidunum.isa.sistemzarezervaciju.app.model.Dogadjaj;
import singidunum.isa.sistemzarezervaciju.app.model.StatusDogadjaja;

public interface DogadjajRepository extends CrudRepository<Dogadjaj, Long> {

	@Query("SELECT d FROM Dogadjaj d WHERE LOWER(d.naziv) LIKE LOWER(CONCAT('%', :naziv, '%'))")
	List<Dogadjaj> findByNazivContaining(@Param("naziv") String naziv);

	@Query("SELECT d FROM Dogadjaj d WHERE d.status = :status")
	List<Dogadjaj> findByStatus(@Param("status") StatusDogadjaja status);

	@Query("SELECT d FROM Dogadjaj d WHERE d.datumOdrzavanja > :datum")
	List<Dogadjaj> findByDatumOdrzavanjaAfter(@Param("datum") LocalDateTime datum);
}
