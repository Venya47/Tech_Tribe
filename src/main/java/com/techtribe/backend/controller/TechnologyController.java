package com.techtribe.backend.controller;


import com.techtribe.backend.entity.Technology;
import com.techtribe.backend.service.TechnologyService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/technologies")
@RequiredArgsConstructor
public class TechnologyController {

    private final TechnologyService technologyService;

    // Create Technology manually (optional)
    @PostMapping
    public Technology createTechnology(
            @RequestParam String name,
            @RequestParam String description
    ) {
        return technologyService.createTechnology(name, description);
    }

    // Get all communities
    @GetMapping
    public List<Technology> getAllTechnologies() {
        return technologyService.getAllTechnologies();
    }

    // Get by id
    @GetMapping("/{id}")
    public Technology getById(@PathVariable Long id) {
        return technologyService.getTechnologyById(id);
    }
}