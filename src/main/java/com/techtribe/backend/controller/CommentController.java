package com.techtribe.backend.controller;
import com.techtribe.backend.entity.Comment;
import java.util.*;
import com.techtribe.backend.service.CommentService;

import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/comments")
public class CommentController {

    private final CommentService commentService;

    public CommentController(CommentService commentService) {
        this.commentService = commentService;
    }

    // Create Comment
    @PostMapping
    public Comment createComment(
            @RequestParam Long userId,
            @RequestParam Long postId,
            @RequestParam String message
    ) {
        return commentService.createComment(userId, postId, message);
    }

    // Get Comments By Post
    @GetMapping("/post/{postId}")
    public List<Comment> getCommentsByPost(@PathVariable Long postId) {
        return commentService.getCommentsByPost(postId);
    }
}