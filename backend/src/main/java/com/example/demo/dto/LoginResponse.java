package com.example.demo.dto;

import com.example.demo.model.Role;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class LoginResponse {

    private Long id;
    private String nom;
    private String email;
    private Role role;
    private String matiere;
    private String filiere;
}
