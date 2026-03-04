package com.techtribe.backend.controller;

import com.techtribe.backend.entity.User;
import com.techtribe.backend.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    // 🔹 Register User
    @PostMapping("/register")
    public User register(
            @RequestParam String username,
            @RequestParam String email,
            @RequestParam String password,
            @RequestParam String technology
    ) {
        return userService.register(username, email, password, technology);
    }

    // 🔹 Change Technology
    @PutMapping("/{userId}/change-technology")
    public User changeTechnology(
            @PathVariable Long userId,
            @RequestParam String technology
    ) {
        return userService.changeTechnology(userId, technology);
    }

    // 🔹 Get User By ID
    @GetMapping("/{userId}")
    public User getUser(@PathVariable Long userId) {
        return userService.getUser(userId);
    }
}
