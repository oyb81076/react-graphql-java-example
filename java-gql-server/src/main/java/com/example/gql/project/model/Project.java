package com.example.gql.project.model;

import com.example.gql.user.model.User;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

public record Project(
    long id,
    String name,
    long authorId
) {
}
