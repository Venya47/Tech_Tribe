package com.techtribe.backend.controller;
import com.techtribe.backend.entity.Post;
import java.util.*;
import com.techtribe.backend.service.PostService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/posts")
public class PostController {

    private final PostService postService;

    public PostController(PostService postService) {
        this.postService = postService;
    }

    // Create Post
    @PostMapping
    public Post createPost(
            @RequestParam Long userId,
            @RequestParam String title,
            @RequestParam String content
    ) {
        return postService.createPost(userId, title, content);
    }

    // Get All Posts
    @GetMapping
    public List<Post> getAllPosts() {
        return postService.getAllPosts();
    }

    // Get Post By Id
    @GetMapping("/{id}")
    public Post getPostById(@PathVariable Long id) {
        return postService.getPostById(id);
    }

    // Get Posts By User
    @GetMapping("/user/{userId}")
    public List<Post> getPostsByUser(@PathVariable Long userId) {
        return postService.getPostsByUser(userId);
    }
}