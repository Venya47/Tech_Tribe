package com.techtribe.backend.controller;
import com.techtribe.backend.entity.Comment;
import java.util.*;
import com.techtribe.backend.service.CommentService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/comments")
@CrossOrigin(origins = "http://localhost:3000")
public class CommentController {
    @Autowired
    private CommentService commentService;

    @PostMapping
    public Comment addComment(@RequestParam Long postId,
                              @RequestParam Long userId,
                              @RequestParam String text) {
        return commentService.addComment(postId, userId, text);
    }

    @PostMapping("/reply")
    public Comment addReply(@RequestParam Long postId,
                            @RequestParam Long userId,
                            @RequestParam Long parentId,
                            @RequestParam String text) {
        return commentService.addReply(postId, userId, parentId, text);
    }

    @GetMapping("/{postId}")
    public List<Comment> getComments(@PathVariable Long postId) {
        return commentService.getCommentsByPost(postId);
    }
}
