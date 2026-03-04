package com.techtribe.backend.repository;

import com.techtribe.backend.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;
import java.util.List;

public interface UserRepository extends JpaRepository<User, Long> {

    // Find user by email (for login)
    Optional<User> findByEmail(String email);

    // Check duplicate email during registration
    boolean existsByEmail(String email);

    // Get all users of a specific technology
    List<User> findByTechnologyId(Long technologyId);
}