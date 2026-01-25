package com.api.photosharing.repository;

import com.api.photosharing.model.Photo;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface PhotoRepository extends MongoRepository<Photo, ObjectId> {
    List<Photo> findByUserId(ObjectId userId);
}
