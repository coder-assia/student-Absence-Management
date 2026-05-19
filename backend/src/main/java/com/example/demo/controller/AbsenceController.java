package com.example.demo.controller;

import java.io.IOException;
import java.net.MalformedURLException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.time.LocalDate;
import java.util.List;
import java.util.UUID;

import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;

import com.example.demo.dto.AbsenceRequest;
import com.example.demo.model.Absence;
import com.example.demo.model.Etudiant;
import com.example.demo.repository.EtudiantRepository;
import com.example.demo.service.AbsenceService;

@RestController
@RequestMapping("/absences")
@CrossOrigin(origins = "http://localhost:5173")
public class AbsenceController {

    private static final Path JUSTIFICATION_DIR = Path.of("uploads", "justifications");

    private final AbsenceService service;
    private final EtudiantRepository etudiantRepository;

    public AbsenceController(AbsenceService service, EtudiantRepository etudiantRepository) {
        this.service = service;
        this.etudiantRepository = etudiantRepository;
    }

    // GET ALL
    @GetMapping
    public List<Absence> getAll() {
        return service.getAll();
    }

    // CREATE (PROPRE + SAFE)
    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public Absence create(@ModelAttribute AbsenceRequest request) {

        Etudiant etudiant = findEtudiant(request);

        Absence absence = new Absence();
        absence.setDate(request.getDate());
        absence.setMotif(request.getMotif());
        absence.setMatiere(request.getMatiere());
        absence.setJustified(request.isJustified());
        absence.setJustificationDocument(saveJustificationDocument(request));
        absence.setEtudiant(etudiant);

        return service.save(absence);
    }

    // UPDATE
    @PutMapping(value = "/{id}", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public Absence update(@PathVariable Long id, @ModelAttribute AbsenceRequest request) {

        Etudiant etudiant = findEtudiant(request);

        Absence absence = new Absence();
        absence.setDate(request.getDate());
        absence.setMotif(request.getMotif());
        absence.setMatiere(request.getMatiere());
        absence.setJustified(request.isJustified());
        absence.setJustificationDocument(saveJustificationDocument(request));
        absence.setEtudiant(etudiant);

        return service.update(id, absence);
    }

    @GetMapping("/{id}/justification")
    public ResponseEntity<Resource> downloadJustification(@PathVariable Long id) {
        Absence absence = service.getById(id);

        if (absence.getJustificationDocument() == null || absence.getJustificationDocument().isBlank()) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Document de justification introuvable");
        }

        try {
            Path file = JUSTIFICATION_DIR.resolve(absence.getJustificationDocument()).normalize();
            Resource resource = new UrlResource(file.toUri());

            if (!resource.exists() || !resource.isReadable()) {
                throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Document de justification introuvable");
            }

            return ResponseEntity.ok()
                    .header(HttpHeaders.CONTENT_DISPOSITION,
                            "attachment; filename=\"" + absence.getJustificationDocument() + "\"")
                    .body(resource);
        } catch (MalformedURLException e) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Document de justification introuvable");
        }
    }

    // DELETE
    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        service.delete(id);
    }

    private Etudiant findEtudiant(AbsenceRequest request) {
        if (request.getEtudiantId() != null) {
            return etudiantRepository.findById(request.getEtudiantId())
                    .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Etudiant introuvable"));
        }

        if (request.getNom() == null || request.getPrenom() == null
                || request.getNom().isBlank() || request.getPrenom().isBlank()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Nom et prenom sont obligatoires");
        }

        return etudiantRepository.findFirstByNomIgnoreCaseAndPrenomIgnoreCase(
                request.getNom().trim(),
                request.getPrenom().trim())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Etudiant introuvable"));
    }

    private String saveJustificationDocument(AbsenceRequest request) {
        MultipartFile file = request.getJustificationDocument();

        if (!request.isJustified() || file == null || file.isEmpty()) {
            return null;
        }

        try {
            Files.createDirectories(JUSTIFICATION_DIR);
            String originalName = StringUtils.cleanPath(file.getOriginalFilename());
            String filename = UUID.randomUUID() + "_" + originalName;
            Path destination = JUSTIFICATION_DIR.resolve(filename).normalize();
            file.transferTo(destination);
            return filename;
        } catch (IOException e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR,
                    "Impossible d'enregistrer le document de justification");
        }
    }
    
    @GetMapping("/search")
    public List<Absence> search(
            @RequestParam(required = false) String nom,
            @RequestParam(required = false) String matiere,
            @RequestParam(required = false) String date
    ) {

        LocalDate parsedDate = null;

        if (date != null && !date.isEmpty()) {
            parsedDate = LocalDate.parse(date);
        }

        return service.search(nom, matiere, parsedDate);
    }
}
