package com.techtribe.backend.entity;

import java.util.*;
import java.util.stream.Collectors;

public class DTOMapper {

    public static PostDTO toPostDTO(Post post) {
        PostDTO dto = new PostDTO();
        dto.setId(post.getId());
        dto.setTitle(post.getTitle());
        dto.setContent(post.getContent());
        dto.setUsername(post.getUser().getUsername());
        dto.setTechnology(post.getUser().getTechnology().getName());

        List<CommentDTO> commentDTOs = post.getComments().stream()
                .map(DTOMapper::toCommentDTO)
                .collect(Collectors.toList());
        dto.setComments(commentDTOs);

        return dto;
    }

    public static CommentDTO toCommentDTO(Comment comment) {
        CommentDTO dto = new CommentDTO();
        dto.setId(comment.getId());
        dto.setText(comment.getText());
        dto.setUsername(comment.getUser().getUsername());

        List<CommentDTO> replyDTOs = comment.getReplies().stream()
                .map(DTOMapper::toCommentDTO)
                .collect(Collectors.toList());
        dto.setReplies(replyDTOs);

        return dto;
    }
}
