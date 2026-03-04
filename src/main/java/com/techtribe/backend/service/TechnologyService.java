package com.techtribe.backend.service;

import com.techtribe.backend.entity.Technology;
import com.techtribe.backend.repository.TechnologyRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class TechnologyService {

    private final TechnologyRepository technologyRepository;

    public Technology createTechnology(String name, String description) {

        name = name.trim().toLowerCase();

        String finalName = name;
        return technologyRepository.findByName(name)
                .orElseGet(() -> {
                    Technology tech = Technology.builder()
                            .name(finalName)
                            .description(description)
                            .build();
                    return technologyRepository.save(tech);
                });
    }

    public List<Technology> getAllTechnologies() {
        return technologyRepository.findAll();
    }

    public Technology getTechnologyById(Long id) {
        return technologyRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Technology not found"));
    }
}
