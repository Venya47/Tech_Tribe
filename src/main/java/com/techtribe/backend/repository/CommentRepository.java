package com.techtribe.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.techtribe.backend.entity.*;
import java.util.*;

public interface CommentRepository extends JpaRepository<Comment, Long> {

    List<Comment> findByPost(Post post);

}