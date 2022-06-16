package com.example.gql.project.model;

public record UpdateProject(
    long id,
    String name,
    long authorId
) {
}
