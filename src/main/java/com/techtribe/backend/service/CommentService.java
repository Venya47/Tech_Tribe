package com.techtribe.backend.service;
import com.techtribe.backend.entity.*;
import com.techtribe.backend.repository.*;
import java.util.*;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CommentService {
    @Autowired
    private CommentRepository commentRepository;

    public Comment addComment(Long postId, Long userId, String text) {
        Comment comment = new Comment();
        comment.setText(text);

        User user = new User();
        user.setId(userId);
        comment.setUser(user);

        Post post = new Post();
        post.setId(postId);
        comment.setPost(post);

        return commentRepository.save(comment);
    }

    public Comment addReply(Long postId, Long userId, Long parentId, String text) {
        Comment reply = new Comment();
        reply.setText(text);

        User user = new User();
        user.setId(userId);
        reply.setUser(user);

        Post post = new Post();
        post.setId(postId);
        reply.setPost(post);

        Comment parent = new Comment();
        parent.setId(parentId);
        reply.setParent(parent);

        return commentRepository.save(reply);
    }

    public List<Comment> getCommentsByPost(Long postId) {
        return commentRepository.findByPostId(postId);
    }
}
