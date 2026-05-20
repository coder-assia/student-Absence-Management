package com.example.demo;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import com.example.demo.model.Etudiant;
import com.example.demo.model.Role;
import com.example.demo.model.User;
import com.example.demo.repository.EtudiantRepository;
import com.example.demo.repository.UserRepository;

@SpringBootApplication
public class DemoApplication {

    public static void main(String[] args) {
        SpringApplication.run(DemoApplication.class, args);
    }

    @Bean
    CommandLineRunner initDatabase(UserRepository userRepository, EtudiantRepository etudiantRepository) {
        return args -> {
            if (userRepository.findByEmail("admin@gmail.com").isEmpty()) {
                User admin = new User();
                admin.setNom("Admin");
                admin.setEmail("admin@gmail.com");
                admin.setPassword("1234");
                admin.setRole(Role.ADMIN);
                userRepository.save(admin);
            }

            if (userRepository.findByEmail("prof@gmail.com").isEmpty()) {
                User teacher = new User();
                teacher.setNom("Prof Informatique");
                teacher.setEmail("prof@gmail.com");
                teacher.setPassword("1234");
                teacher.setRole(Role.ENSEIGNANT);
                teacher.setMatiere("Java, Spring Boot, Base de donnees");
                teacher.setFiliere("Informatique, Reseaux");
                userRepository.save(teacher);
            }

            if (etudiantRepository.findByEmailIgnoreCase("etudiant@gmail.com").isEmpty()) {
                Etudiant etudiant = new Etudiant();
                etudiant.setNom("Etudiant");
                etudiant.setPrenom("Demo");
                etudiant.setEmail("etudiant@gmail.com");
                etudiant.setFiliere("Informatique");
                etudiantRepository.save(etudiant);
            }

            if (userRepository.findByEmail("etudiant@gmail.com").isEmpty()) {
                User student = new User();
                student.setNom("Etudiant Demo");
                student.setEmail("etudiant@gmail.com");
                student.setPassword("1234");
                student.setRole(Role.ETUDIANT);
                student.setFiliere("Informatique");
                userRepository.save(student);
            }
        };
    }
}
