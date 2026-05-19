package com.example.demo.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.example.demo.model.Etudiant;
import com.example.demo.repository.EtudiantRepository;

@Service
public class EtudiantService {

    private final EtudiantRepository repo;

    public EtudiantService(EtudiantRepository repo) {
        this.repo = repo;
    }

    public List<Etudiant> getAll() {
        return repo.findAll();
    }

    public Etudiant save(Etudiant e) {
        return repo.save(e);
    }

    public Etudiant update(Long id, Etudiant newData) {
        Etudiant e = repo.findById(id)
                .orElseThrow(() -> new RuntimeException("Student not found"));

        e.setNom(newData.getNom());
        e.setPrenom(newData.getPrenom());
        e.setEmail(newData.getEmail());
        e.setFiliere(newData.getFiliere());

        return repo.save(e);
    }

    public void delete(Long id) {
        repo.deleteById(id);
    }
}