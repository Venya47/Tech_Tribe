package com.techtribe.backend.entity;
import lombok.*;
@Getter
@Setter
public class UserRegisterDto {
    private String username;
    private String email;
    private String password;
    private String technology; // just the name
}
