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

    List<Absence> findByEtudiantEmailIgnoreCase(String email);

    List<Absence> findByMatiereIgnoreCaseAndEtudiantFiliereIgnoreCase(String matiere, String filiere);

    @Query("""
        SELECT a FROM Absence a
        WHERE (:nom IS NULL OR LOWER(a.etudiant.nom) LIKE LOWER(CONCAT('%', :nom, '%')))
        AND (:matiere IS NULL OR LOWER(a.matiere) LIKE LOWER(CONCAT('%', :matiere, '%')))
        AND (:date IS NULL OR a.date = :date)
        AND LOWER(a.etudiant.email) = LOWER(:email)
    """)
    List<Absence> searchForStudent(
            @Param("nom") String nom,
            @Param("matiere") String matiere,
            @Param("date") LocalDate date,
            @Param("email") String email
    );

    @Query("""
        SELECT a FROM Absence a
        WHERE (:nom IS NULL OR LOWER(a.etudiant.nom) LIKE LOWER(CONCAT('%', :nom, '%')))
        AND (:matiere IS NULL OR LOWER(a.matiere) LIKE LOWER(CONCAT('%', :matiere, '%')))
        AND (:date IS NULL OR a.date = :date)
        AND LOWER(a.matiere) = LOWER(:teacherMatiere)
        AND LOWER(a.etudiant.filiere) = LOWER(:teacherFiliere)
    """)
    List<Absence> searchForTeacher(
            @Param("nom") String nom,
            @Param("matiere") String matiere,
            @Param("date") LocalDate date,
            @Param("teacherMatiere") String teacherMatiere,
            @Param("teacherFiliere") String teacherFiliere
    );
}
