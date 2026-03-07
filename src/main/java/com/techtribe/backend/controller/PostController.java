package com.techtribe.backend.controller;
import com.techtribe.backend.entity.DTOMapper;
import com.techtribe.backend.entity.Post;
import java.util.*;
import java.util.stream.Collectors;

import com.techtribe.backend.entity.PostDTO;
import com.techtribe.backend.service.PostService;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
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

    // Get All Posts from same tech
    @GetMapping("/{techId}")
    public List<PostDTO> getAllPosts(@PathVariable Long techId) {
        List<Post> posts = postService.getAllPosts(techId);
        return posts.stream()
                .map(DTOMapper::toPostDTO)
                .collect(Collectors.toList());
    }


    // Get Post By Id
    @GetMapping("/post/{pid}")
    public Post getPostById(@PathVariable Long pid) {
        return postService.getPostById(pid);
    }
    @GetMapping("/search")
    public List<Post> searchPosts(@RequestParam String keyword) {
        return postService.searchPosts(keyword);
    }

    // Get Posts By User
    @GetMapping("/user/{userId}")
    public List<Post> getPostsByUser(@PathVariable Long userId) {
        return postService.getPostsByUser(userId);
    }
}