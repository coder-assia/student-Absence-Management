package com.example.demo.dto;

import java.time.LocalDate;

import lombok.Data;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.multipart.MultipartFile;

@Data
public class AbsenceRequest {
    @DateTimeFormat(iso = DateTimeFormat.ISO.DATE)
    private LocalDate date;
    private String motif;
    private String matiere;
    private boolean justified;
    private MultipartFile justificationDocument;
    private Long etudiantId;
    private String nom;
    private String prenom;
}
