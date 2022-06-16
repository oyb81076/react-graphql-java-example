package com.example.gql.project;

import com.example.gql.project.model.Project;
import com.example.gql.project.model.UpdateProject;
import com.example.gql.user.model.User;
import org.dataloader.DataLoader;
import org.springframework.graphql.data.method.annotation.Argument;
import org.springframework.graphql.data.method.annotation.MutationMapping;
import org.springframework.graphql.data.method.annotation.QueryMapping;
import org.springframework.graphql.data.method.annotation.SchemaMapping;
import org.springframework.stereotype.Controller;
import reactor.core.publisher.Mono;

import java.util.Arrays;
import java.util.List;
import java.util.concurrent.CompletableFuture;

@Controller
public class ProjectController {

    @QueryMapping
    public Mono<List<Project>> projects() {
        return Mono.just(Arrays.asList(
            new Project(1, "Example", 100L),
            new Project(2, "Demo", 100L),
            new Project(3, "Custom", 300L),
            new Project(4, "Public", 100L)
        ));
    }

    @QueryMapping
    public Mono<Project> project(@Argument long id) {
        return Mono.just(new Project(id, "project", 100L));
    }

    @SchemaMapping(typeName = "Project", field = "author")
    public CompletableFuture<User> author(Project project, DataLoader<Long, User> loader) {
        return loader.load(project.authorId());
    }

    @MutationMapping
    public Project updateProject(@Argument UpdateProject input) {
        return new Project(input.id(), input.name(), input.authorId());
    }
}
