package com.example.demo.security;

import java.util.List;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

@Configuration
public class SecurityConfig {

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http)
            throws Exception {

        http

            // ✅ CORS
            .cors(Customizer.withDefaults())

            // ✅ disable csrf
            .csrf(csrf -> csrf.disable())

            // ✅ routes autorisées
            .authorizeHttpRequests(auth -> auth

                .requestMatchers("/auth/**").permitAll()

                .requestMatchers("/etudiants/**").permitAll()

                .requestMatchers("/absences/**").permitAll()

                .anyRequest().permitAll()

            );

        return http.build();
    }

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {

        CorsConfiguration configuration = new CorsConfiguration();

        // ✅ frontend React
        configuration.setAllowedOrigins(
                List.of("http://localhost:5173")
        );

        // ✅ méthodes HTTP
        configuration.setAllowedMethods(
                List.of(
                        "GET",
                        "POST",
                        "PUT",
                        "DELETE",
                        "OPTIONS"
                )
        );

        // ✅ headers
        configuration.setAllowedHeaders(List.of("*"));

        // ✅ authorization token
        configuration.setExposedHeaders(List.of("Authorization"));

        // ✅ credentials
        configuration.setAllowCredentials(true);

        UrlBasedCorsConfigurationSource source =
                new UrlBasedCorsConfigurationSource();

        source.registerCorsConfiguration(
                "/**",
                configuration
        );

        return source;
    }
}