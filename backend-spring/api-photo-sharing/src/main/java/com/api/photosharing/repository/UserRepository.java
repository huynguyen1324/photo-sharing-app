package com.api.photosharing.repository;

import com.api.photosharing.model.User;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface UserRepository extends MongoRepository<User, ObjectId> {
    User findByUsername(String username);

    User findByUsernameAndPassword(String username, String password);
}
