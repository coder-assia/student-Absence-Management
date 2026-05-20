package com.example.demo.controller;

import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.model.Role;
import com.example.demo.model.User;
import com.example.demo.repository.UserRepository;
import com.example.demo.security.RoleAccessService;

import jakarta.servlet.http.HttpServletRequest;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
@RequestMapping("/users")
public class UserController {

    private final UserRepository userRepository;
    private final RoleAccessService roleAccessService;

    public UserController(UserRepository userRepository, RoleAccessService roleAccessService) {
        this.userRepository = userRepository;
        this.roleAccessService = roleAccessService;
    }

    @GetMapping
    public List<User> getAll(HttpServletRequest request) {
        roleAccessService.requireAny(request, Role.ADMIN);
        return userRepository.findAll();
    }

    @PostMapping
    public User create(@RequestBody User user, HttpServletRequest request) {
        roleAccessService.requireAny(request, Role.ADMIN);
        return userRepository.save(user);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id, HttpServletRequest request) {
        roleAccessService.requireAny(request, Role.ADMIN);
        userRepository.deleteById(id);
    }
}
