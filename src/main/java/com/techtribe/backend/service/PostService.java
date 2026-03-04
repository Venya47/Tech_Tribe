package com.techtribe.backend.service;
import com.techtribe.backend.entity.*;
import com.techtribe.backend.repository.*;
import java.util.*;
import org.springframework.stereotype.Service;

@Service
public class PostService {

    private final PostRepository postRepo;
    private final UserRepository userRepo;

    public PostService(PostRepository postRepo, UserRepository userRepo) {
        this.postRepo = postRepo;
        this.userRepo = userRepo;
    }

    // Create Post
    public Post createPost(Long userId, String title, String content) {

        User user = userRepo.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Post post = new Post();
        post.setTitle(title);
        post.setContent(content);
        post.setUser(user);

        return postRepo.save(post);
    }

    // Get All Posts
    public List<Post> getAllPosts() {
        return postRepo.findAll();
    }

    // Get Post By Id
    public Post getPostById(Long id) {
        return postRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Post not found"));
    }

    // Get Posts By User
    public List<Post> getPostsByUser(Long userId) {

        User user = userRepo.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        return postRepo.findByUser(user);
    }
}