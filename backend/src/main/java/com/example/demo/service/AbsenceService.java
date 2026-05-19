package com.example.demo.service;

import java.util.List;

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
}
