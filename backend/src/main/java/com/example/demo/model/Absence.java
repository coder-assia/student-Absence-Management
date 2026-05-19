package com.example.demo.model;

import java.time.LocalDate;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
public class Absence {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private LocalDate date;

    private String motif;

    private String matiere;

    private String justificationDocument;

    @Column(nullable = false)
    private boolean justified = false;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "etudiant_id")
    private Etudiant etudiant;
}
