package com.techtribe.backend.entity;

import lombok.*;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class PostDTO {
    private Long id;
    private String title;
    private String content;
    private String username;   // from User
    private String technology; // from User.technology
    private List<CommentDTO> comments;

    public void setComments(List<CommentDTO> commentDTOs) {
        this.comments=commentDTOs;
    }
}
