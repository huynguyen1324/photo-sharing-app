package com.api.photosharing.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;
import org.springframework.data.mongodb.core.mapping.Field;

@Data
public class Like {

    @Field("user_id")
    @JsonProperty("user_id")
    private String userId;
}
