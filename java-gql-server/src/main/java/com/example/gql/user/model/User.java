package com.example.gql.user.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

public record User(
    long id,
    String name,
    int age,
    boolean male
) {
}
