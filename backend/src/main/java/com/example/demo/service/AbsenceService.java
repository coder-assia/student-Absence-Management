package com.example.demo.service;

import java.time.LocalDate;
import java.util.Arrays;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.example.demo.model.Absence;
import com.example.demo.repository.AbsenceRepository;

@Service
public class AbsenceService {

    private final AbsenceRepository repo;

    public AbsenceService(AbsenceRepository repo) {
        this.repo = repo;
    }

    public List<Absence> getAll() {
        return repo.findAll();
    }

    public List<Absence> getForStudent(String email) {
        return repo.findByEtudiantEmailIgnoreCase(email);
    }

    public List<Absence> getForTeacher(String matiere, String filiere) {
        return filterForTeacher(repo.findAll(), matiere, filiere);
    }

    public Absence save(Absence a) {
        return repo.save(a);
    }

    public Absence getById(Long id) {
        return repo.findById(id)
                .orElseThrow(() -> new RuntimeException("Absence not found"));
    }

    public Absence update(Long id, Absence newData) {

        Absence a = getById(id);

        a.setDate(newData.getDate());
        a.setMotif(newData.getMotif());
        a.setMatiere(newData.getMatiere());
        a.setJustified(newData.isJustified());
        a.setEtudiant(newData.getEtudiant());

        if (!newData.isJustified()) {
            a.setJustificationDocument(null);
        } else if (newData.getJustificationDocument() != null) {
            a.setJustificationDocument(newData.getJustificationDocument());
        }

        return repo.save(a);
    }

    public void delete(Long id) {
        repo.deleteById(id);
    }

    public List<Absence> search(String nom, String matiere, LocalDate date) {
    return repo.search(nom, matiere, date);
    }

    public List<Absence> searchForStudent(String nom, String matiere, LocalDate date, String email) {
        return repo.searchForStudent(nom, matiere, date, email);
    }

    public List<Absence> searchForTeacher(
            String nom,
            String matiere,
            LocalDate date,
            String teacherMatiere,
            String teacherFiliere) {
        return repo.searchForTeacher(nom, matiere, date, teacherMatiere, teacherFiliere);
    }

    public List<Absence> searchForTeacherMulti(
            String nom,
            String matiere,
            LocalDate date,
            String teacherMatieres,
            String teacherFilieres) {
        return filterForTeacher(repo.search(nom, matiere, date), teacherMatieres, teacherFilieres);
    }

    private List<Absence> filterForTeacher(List<Absence> absences, String matieres, String filieres) {
        Set<String> allowedMatieres = splitValues(matieres);
        Set<String> allowedFilieres = splitValues(filieres);

        return absences.stream()
                .filter(absence -> absence.getEtudiant() != null)
                .filter(absence -> allowedMatieres.contains(clean(absence.getMatiere())))
                .filter(absence -> allowedFilieres.contains(clean(absence.getEtudiant().getFiliere())))
                .collect(Collectors.toList());
    }

    private Set<String> splitValues(String value) {
        return Arrays.stream(value == null ? new String[0] : value.split(","))
                .map(this::clean)
                .filter(item -> !item.isBlank())
                .collect(Collectors.toSet());
    }

    private String clean(String value) {
        return value == null ? "" : value.trim().toLowerCase();
    }
}
