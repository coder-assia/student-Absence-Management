package com.example.demo.service;

import com.example.demo.dto.LoginRequest;
import com.example.demo.dto.LoginResponse;
import com.example.demo.model.Etudiant;
import com.example.demo.model.Role;
import com.example.demo.model.User;
import com.example.demo.repository.EtudiantRepository;
import com.example.demo.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.http.HttpStatus;

@Service
public class AuthService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private EtudiantRepository etudiantRepository;

    public LoginResponse login(LoginRequest request) {

        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new RuntimeException("Email incorrect"));

        if (!user.getPassword().equals(request.getPassword())) {
            throw new RuntimeException("Mot de passe incorrect");
        }

        return new LoginResponse(
                user.getId(),
                user.getNom(),
                user.getEmail(),
                user.getRole(),
                user.getMatiere(),
                user.getFiliere()
        );
    }

    public LoginResponse signup(User request) {
        if (request.getEmail() == null || request.getEmail().isBlank()
                || request.getPassword() == null || request.getPassword().isBlank()
                || request.getNom() == null || request.getNom().isBlank()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Nom, email et mot de passe sont obligatoires");
        }

        if (userRepository.findByEmail(request.getEmail()).isPresent()) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "Cet email existe deja");
        }

        Role role = request.getRole() == null ? Role.ETUDIANT : request.getRole();
        if (role == Role.ADMIN) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "La creation d'un admin n'est pas ouverte");
        }

        User user = new User();
        user.setNom(request.getNom().trim());
        user.setEmail(request.getEmail().trim());
        user.setPassword(request.getPassword());
        user.setRole(role);
        user.setMatiere(role == Role.ENSEIGNANT ? normalizeList(request.getMatiere()) : null);
        user.setFiliere(normalizeList(request.getFiliere()));

        User saved = userRepository.save(user);

        if (role == Role.ETUDIANT && etudiantRepository.findByEmailIgnoreCase(saved.getEmail()).isEmpty()) {
            Etudiant etudiant = new Etudiant();
            String[] parts = saved.getNom().trim().split("\\s+", 2);
            etudiant.setNom(parts[0]);
            etudiant.setPrenom(parts.length > 1 ? parts[1] : "");
            etudiant.setEmail(saved.getEmail());
            etudiant.setFiliere(firstValue(saved.getFiliere()));
            etudiantRepository.save(etudiant);
        }

        return new LoginResponse(
                saved.getId(),
                saved.getNom(),
                saved.getEmail(),
                saved.getRole(),
                saved.getMatiere(),
                saved.getFiliere()
        );
    }

    private String normalizeList(String value) {
        if (value == null) {
            return null;
        }

        String normalized = value.replace(";", ",").trim().replaceAll("\\s*,\\s*", ", ");
        return normalized.isBlank() ? null : normalized;
    }

    private String firstValue(String value) {
        if (value == null || value.isBlank()) {
            return "";
        }

        return value.split(",")[0].trim();
    }
}
