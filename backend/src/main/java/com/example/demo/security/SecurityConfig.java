package com.example.demo.security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
public class SecurityConfig {

  @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
    http
        // 1. Désactiver le CSRF (nécessaire pour les requêtes POST distantes/APIs)
        .csrf(csrf -> csrf.disable())
        
        // 2. Configurer la gestion de base ou désactiver la session si tu utilises du JWT plus tard
        .httpBasic(basic -> basic.disable()) // Désactive si tu n'as pas besoin de l'authentification Basic native sur TOUTES les routes
        
        // 3. Définir les règles d'accès aux URL
        .authorizeHttpRequests(auth -> auth
            .requestMatchers("/auth/**").permitAll() // Autorise explicitement l'accès public à ton contrôleur
            .anyRequest().authenticated()            // Tout le reste est sécurisé
        );

    return http.build();
}
}