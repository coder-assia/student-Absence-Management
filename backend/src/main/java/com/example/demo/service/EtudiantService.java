package com.example.demo.service;

import java.util.List;
import java.util.Set;
import java.util.Arrays;
import java.util.stream.Collectors;

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

    public List<Etudiant> getByFiliere(String filiere) {
        Set<String> allowed = splitValues(filiere);
        return repo.findAll().stream()
                .filter(etudiant -> allowed.contains(clean(etudiant.getFiliere())))
                .collect(Collectors.toList());
    }

    public Etudiant getByEmail(String email) {
        return repo.findByEmailIgnoreCase(email)
                .orElseThrow(() -> new RuntimeException("Student not found"));
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
