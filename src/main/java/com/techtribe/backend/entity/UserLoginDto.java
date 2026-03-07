package com.techtribe.backend.entity;

import lombok.*;

@Getter
@Setter
public class UserLoginDto {
    private String email;
    private String password;
}
