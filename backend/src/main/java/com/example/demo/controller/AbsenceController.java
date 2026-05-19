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

import com.example.demo.model.Absence;
import com.example.demo.service.AbsenceService;

@RestController
@RequestMapping("/absences")
@CrossOrigin(origins = "http://localhost:5173")
public class AbsenceController {

    private final AbsenceService service;

    public AbsenceController(AbsenceService service) {
        this.service = service;
    }

    @GetMapping
    public List<Absence> getAll() {
        return service.getAll();
    }

    @PostMapping(consumes = "application/json", produces = "application/json")
    public Absence create(@RequestBody Absence a) {
    return service.save(a);
}

    @PutMapping("/{id}")
    public Absence update(@PathVariable Long id, @RequestBody Absence a) {
        return service.update(id, a);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        service.delete(id);
    }
}