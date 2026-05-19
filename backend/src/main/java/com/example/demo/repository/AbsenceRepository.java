package com.example.demo.repository;

import java.time.LocalDate;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.example.demo.model.Absence;
@Repository
public interface AbsenceRepository extends JpaRepository<Absence, Long> {

    @Query("""
        SELECT a FROM Absence a
        WHERE (:nom IS NULL OR LOWER(a.etudiant.nom) LIKE LOWER(CONCAT('%', :nom, '%')))
        AND (:matiere IS NULL OR LOWER(a.matiere) LIKE LOWER(CONCAT('%', :matiere, '%')))
        AND (:date IS NULL OR a.date = :date)
    """)
    List<Absence> search(
            @Param("nom") String nom,
            @Param("matiere") String matiere,
            @Param("date") LocalDate date
    );
}