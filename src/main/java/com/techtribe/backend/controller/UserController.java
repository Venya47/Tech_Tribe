package com.techtribe.backend.controller;

import com.techtribe.backend.entity.*;
import com.techtribe.backend.entity.UserRegisterDto;
import com.techtribe.backend.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/users")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    // 🔹 Register User
    @PostMapping("/register")
    public User register(
            @RequestBody UserRegisterDto u) {
        return userService.register(u.getUsername(), u.getEmail(), u.getPassword(), u.getTechnology());
    }
    @PostMapping("/login")
    public User login(@RequestBody UserLoginDto dto) {
        return userService.login(dto.getEmail(), dto.getPassword());
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

