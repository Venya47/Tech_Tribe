package com.techtribe.backend.repository;

import com.techtribe.backend.entity.Technology;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface TechnologyRepository extends JpaRepository<Technology, Long> {

    // Find technology by name
    Optional<Technology> findByName(String name);

    // Check if technology already exists
    boolean existsByName(String name);
}