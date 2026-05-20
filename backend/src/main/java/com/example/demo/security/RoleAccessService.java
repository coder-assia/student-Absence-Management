package com.example.demo.security;

import java.util.Arrays;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import com.example.demo.model.Role;
import com.example.demo.model.User;
import com.example.demo.repository.UserRepository;

import jakarta.servlet.http.HttpServletRequest;

@Service
public class RoleAccessService {

    private static final String USER_ID_HEADER = "X-User-Id";

    private final UserRepository userRepository;

    public RoleAccessService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public User requireAny(HttpServletRequest request, Role... allowedRoles) {
        User currentUser = getCurrentUser(request);

        boolean allowed = Arrays.stream(allowedRoles)
                .anyMatch(role -> role == currentUser.getRole());

        if (!allowed) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "Acces refuse pour ce role");
        }

        return currentUser;
    }

    public User getCurrentUser(HttpServletRequest request) {
        String userId = request.getHeader(USER_ID_HEADER);

        if (userId == null || userId.isBlank()) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Utilisateur non connecte");
        }

        try {
            return userRepository.findById(Long.valueOf(userId.trim()))
                    .orElseThrow(() -> new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Utilisateur introuvable"));
        } catch (NumberFormatException ex) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Utilisateur invalide");
        }
    }
}
