package com.techtribe.backend.service;



import com.techtribe.backend.entity.Technology;
import com.techtribe.backend.entity.User;
import com.techtribe.backend.repository.TechnologyRepository;
import com.techtribe.backend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final TechnologyRepository technologyRepository;

    // Register User
    public User register(String username, String email, String password, String techName) {

        if (userRepository.existsByEmail(email)) {
            throw new RuntimeException("Email already registered");
        }

        techName = techName.trim().toLowerCase();

        String finalTechName = techName;
        Technology technology = technologyRepository
                .findByName(techName)
                .orElseGet(() -> {
                    Technology newTech = new Technology();
                    newTech.setName(finalTechName);
                    newTech.setDescription("Community for " + finalTechName);
                    return technologyRepository.save(newTech);
                });

        User user = User.builder()
                .username(username)
                .email(email)
                .password(password) // encrypt later
                .technology(technology)
                .build();

        return userRepository.save(user);
    }

    // Change Technology
    public User changeTechnology(Long userId, String newTechName) {

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        newTechName = newTechName.trim().toLowerCase();

        String finalNewTechName = newTechName;
        Technology technology = technologyRepository
                .findByName(newTechName)
                .orElseGet(() -> {
                    Technology newTech = new Technology();
                    newTech.setName(finalNewTechName);
                    newTech.setDescription("Community for " + finalNewTechName);
                    return technologyRepository.save(newTech);
                });

        user.setTechnology(technology);

        return userRepository.save(user);
    }

    public User login(String email, String password) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (!user.getPassword().equals(password)) {
            throw new RuntimeException("Invalid password");
        }

        return user;
    }

    // Get User By Id
    public User getUser(Long userId) {
        return userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));
    }
}
