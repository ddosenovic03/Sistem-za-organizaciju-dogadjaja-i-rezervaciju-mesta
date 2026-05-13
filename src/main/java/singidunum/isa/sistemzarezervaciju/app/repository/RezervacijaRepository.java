package singidunum.isa.sistemzarezervaciju.app.repository;

import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import singidunum.isa.sistemzarezervaciju.app.model.Rezervacija;

public interface RezervacijaRepository extends CrudRepository<Rezervacija, Long> {

	@Query("SELECT r FROM Rezervacija r WHERE r.dogadjaj.id = :dogadjajId")
	List<Rezervacija> findByDogadjaj(@Param("dogadjajId") Long dogadjajId);

	@Query("SELECT r FROM Rezervacija r WHERE r.posetilac.id = :posetilacId")
	List<Rezervacija> findByPosetilac(@Param("posetilacId") Long posetilacId);

	@Query("SELECT COUNT(r) > 0 FROM Rezervacija r WHERE r.dogadjaj.id = :dogadjajId AND r.posetilac.id = :posetilacId AND r.status = 'AKTIVNA'")
	boolean postojiAktivnaRezervacija(@Param("dogadjajId") Long dogadjajId, @Param("posetilacId") Long posetilacId);
}
