package com.api.photosharing.controller;

import com.api.photosharing.model.Photo;
import com.api.photosharing.repository.PhotoRepository;
import org.bson.types.ObjectId;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping("/api/photo")
public class PhotoController {

    private final PhotoRepository photoRepository;

    private final String IMAGE_DIR = "public/images/";

    public PhotoController(PhotoRepository photoRepository) {
        this.photoRepository = photoRepository;
    }


    @GetMapping("/list")
    public ResponseEntity<List<Photo>> list() {
        return ResponseEntity.ok(photoRepository.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Photo> get(@PathVariable ObjectId id) {
        return ResponseEntity.of((photoRepository.findById(id)));
    }

}