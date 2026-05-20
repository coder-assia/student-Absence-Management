package com.example.demo.controller;

import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.model.Etudiant;
import com.example.demo.model.Role;
import com.example.demo.model.User;
import com.example.demo.security.RoleAccessService;
import com.example.demo.service.EtudiantService;

import jakarta.servlet.http.HttpServletRequest;

@RestController
@CrossOrigin(origins ="http://localhost:5173")
@RequestMapping("/etudiants")
public class EtudiantController {

    private final EtudiantService service;
    private final RoleAccessService roleAccessService;

    public EtudiantController(EtudiantService service, RoleAccessService roleAccessService) {
        this.service = service;
        this.roleAccessService = roleAccessService;
    }

    @GetMapping
    public List<Etudiant> getAll(HttpServletRequest request) {
        User user = roleAccessService.requireAny(request, Role.ADMIN, Role.ENSEIGNANT, Role.ETUDIANT);

        if (user.getRole() == Role.ADMIN) {
            return service.getAll();
        }

        if (user.getRole() == Role.ENSEIGNANT) {
            return service.getByFiliere(user.getFiliere());
        }

        return List.of(service.getByEmail(user.getEmail()));
    }

    @PostMapping
    public Etudiant create(@RequestBody Etudiant e, HttpServletRequest request) {
        User user = roleAccessService.requireAny(request, Role.ADMIN, Role.ENSEIGNANT);

        if (user.getRole() == Role.ENSEIGNANT) {
            e.setFiliere(user.getFiliere());
        }

        return service.save(e);
    }

    @PutMapping("/{id}")
    public Etudiant update(@PathVariable Long id, @RequestBody Etudiant e, HttpServletRequest request) {
        roleAccessService.requireAny(request, Role.ADMIN);
        return service.update(id, e);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id, HttpServletRequest request) {
        roleAccessService.requireAny(request, Role.ADMIN);
        service.delete(id);
    }
}
