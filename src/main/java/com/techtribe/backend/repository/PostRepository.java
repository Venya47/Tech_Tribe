package com.techtribe.backend.repository;
import org.springframework.data.jpa.repository.JpaRepository;
import com.techtribe.backend.entity.*;
import java.util.*;

public interface PostRepository extends JpaRepository<Post, Long> {

    List<Post> findByUser(User user);

}