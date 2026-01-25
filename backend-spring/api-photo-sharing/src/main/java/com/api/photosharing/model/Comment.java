package com.api.photosharing.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;
import org.springframework.data.mongodb.core.mapping.Field;

import java.util.Date;

@Data
public class Comment {

    private String comment;

    @Field("date_time")
    @JsonProperty("date_time")
    private Date dateTime = new Date();

    private User user;
}
