package com.techtribe.backend.service;
import com.techtribe.backend.entity.*;
import com.techtribe.backend.repository.*;
import java.util.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
public class CommentService {

    private final CommentRepository commentRepo;
    private final UserRepository userRepo;
    private final PostRepository postRepo;

    public CommentService(CommentRepository commentRepo,
                          UserRepository userRepo,
                          PostRepository postRepo) {
        this.commentRepo = commentRepo;
        this.userRepo = userRepo;
        this.postRepo = postRepo;
    }

    // Create Comment
    public Comment createComment(Long userId, Long postId, String message) {

        User user = userRepo.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Post post = postRepo.findById(postId)
                .orElseThrow(() -> new RuntimeException("Post not found"));

        Comment comment = new Comment();
        comment.setMessage(message);
        comment.setUser(user);
        comment.setPost(post);

        return commentRepo.save(comment);
    }

    // Get Comments By Post
    public List<Comment> getCommentsByPost(Long postId) {

        Post post = postRepo.findById(postId)
                .orElseThrow(() -> new RuntimeException("Post not found"));

        return commentRepo.findByPost(post);
    }
}
