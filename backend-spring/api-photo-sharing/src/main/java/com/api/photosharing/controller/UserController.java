package com.api.photosharing.controller;

import com.api.photosharing.dto.LoginRequest;
import com.api.photosharing.model.Comment;
import com.api.photosharing.model.Photo;
import com.api.photosharing.model.User;
import com.api.photosharing.repository.PhotoRepository;
import com.api.photosharing.repository.UserRepository;
import jakarta.validation.Valid;
import org.bson.types.ObjectId;
import org.springframework.boot.webmvc.autoconfigure.WebMvcProperties;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/user")
public class UserController {

    private final UserRepository userRepository;
    private final PhotoRepository photoRepository;

    public UserController(UserRepository userRepository, PhotoRepository photoRepository) {
        this.userRepository = userRepository;
        this.photoRepository = photoRepository;
    }

    @GetMapping("/list")
    public ResponseEntity<List<User>> findAll() {
        return ResponseEntity.ok(userRepository.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<User> findById(@PathVariable ObjectId id) {
        return ResponseEntity.of(userRepository.findById(id));
    }

    @GetMapping("/{id}/photos")
    public ResponseEntity<List<Photo>> findPhotosByUserId(@PathVariable ObjectId id) {
        return ResponseEntity.ok(photoRepository.findByUserId(id));
    }

    @GetMapping("/stats")
    public ResponseEntity<?> statistic() {
        List<Photo> photos = photoRepository.findAll();

        Map<ObjectId, Integer> photoCountByUser = new HashMap<>();
        Map<ObjectId, Integer> commentCountByUser = new HashMap<>();

        for (Photo photo : photos) {
            ObjectId userId = photo.getUserId();
            photoCountByUser.put(userId, photoCountByUser.getOrDefault(userId, 0) + 1);

            for (Comment comment : photo.getComments()) {
                ObjectId commentUserId = comment.getUser().getId();
                commentCountByUser.put(commentUserId, commentCountByUser.getOrDefault(commentUserId, 0) + 1);
            }
        }

        return ResponseEntity.ok(Map.of("count_photos", photoCountByUser, "count_comments", commentCountByUser));
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@Valid @RequestBody LoginRequest req) {
        User user = userRepository.findByUsernameAndPassword(
                req.getUsername(),
                req.getPassword()
        );
        if (user != null) {
            return ResponseEntity.ok(user);
        } else {
            return ResponseEntity
                    .status(HttpStatus.UNAUTHORIZED)
                    .body(Map.of("message", "Wrong username or password"));
        }
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@Valid @RequestBody User user) {

        if (userRepository.findByUsername(user.getUsername()) != null) {
            return ResponseEntity
                    .status(HttpStatus.CONFLICT)
                    .body(Map.of("message", "Username already exists"));
        } else {
            userRepository.save(user);
            return ResponseEntity.ok(user);
        }
    }


}
