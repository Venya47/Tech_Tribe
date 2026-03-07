package com.techtribe.backend.entity;
import lombok.*;
import java.util.List;
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class CommentDTO {
    private Long id;
    private String text;
    private String username;   // from User
    private List<CommentDTO> replies; // nested replies
}
