package com.example.config;

import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoClients;
import com.mongodb.client.MongoDatabase;

import java.util.logging.Level;
import java.util.logging.Logger;

public class MongoConfig {
    static {
        Logger.getLogger("org.mongodb.driver").setLevel(Level.SEVERE);
    }

    private static final MongoClient client = MongoClients.create("mongodb+srv://huy0132004:huy153684@apps-cluster.coomzeq.mongodb.net");
    public static MongoDatabase getDatabase() {
        return client.getDatabase("test_huy");
    }

    public static void main(String[] args) {
        try {
            MongoDatabase db = MongoConfig.getDatabase();
            db.listCollectionNames().first(); // gọi DB thật
            System.out.println("MongoDB kết nối OK");
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
