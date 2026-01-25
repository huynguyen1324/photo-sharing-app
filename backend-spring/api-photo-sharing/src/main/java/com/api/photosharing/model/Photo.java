package com.api.photosharing.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonValue;
import lombok.Data;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;
import tools.jackson.databind.annotation.JsonSerialize;
import tools.jackson.databind.ser.std.ToStringSerializer;

import java.util.Date;
import java.util.List;

@Data
@Document(collection = "photos")
public class Photo {

    @Id
    @JsonProperty("_id")
    @JsonSerialize(using = ToStringSerializer.class)
    private ObjectId id;

    @Field("file_name")
    @JsonProperty("file_name")
    private String fileName;

    @Field("date_time")
    @JsonProperty("date_time")
    private Date dateTime = new Date();

    @Field("user_id")
    @JsonProperty("user_id")
    @JsonSerialize(using = ToStringSerializer.class)
    private ObjectId userId;

    private List<Comment> comments;
    private List<Like> likes;
}
