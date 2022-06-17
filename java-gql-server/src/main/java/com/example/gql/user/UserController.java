package com.example.gql.user;

import com.example.gql.error.RandomError;
import com.example.gql.user.model.User;
import lombok.extern.slf4j.Slf4j;
import org.springframework.graphql.data.method.annotation.Argument;
import org.springframework.graphql.data.method.annotation.MutationMapping;
import org.springframework.graphql.data.method.annotation.QueryMapping;
import org.springframework.graphql.execution.BatchLoaderRegistry;
import org.springframework.stereotype.Controller;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

import java.time.Duration;
import java.util.Arrays;
import java.util.Date;
import java.util.List;


@Controller
@Slf4j
public class UserController {
    String name = "Default Name";
    int call = 0;

    public UserController(BatchLoaderRegistry registry) {
        registry.forTypePair(Long.class, User.class).registerMappedBatchLoader((authorIds, env) ->
                Flux.fromIterable(authorIds)
                        .flatMap(this::user)
                        .collectMap(User::id));
    }

    @QueryMapping
    public Mono<User> user(@Argument long id) {
        log.info("get user {}", id);
        var user = new User(id, name + id, 0, id % 2 == 0);
        return Mono.just(user);
    }

    @QueryMapping
    public Mono<List<User>> users() {
        if (++call % 3 != 0) {
            return Mono
                    .error(new RandomError("服务器随机失败 " + new Date()));
        }
        return Mono.just(Arrays.asList(
                        new User(100, "n100", 1, false),
                        new User(200, "n200", 1, false),
                        new User(300, "n300", 1, false),
                        new User(400, "n400", 1, false)
                ))
                .delayElement(Duration.ofSeconds(1));
    }

    @MutationMapping
    public Mono<User> updateUserName(@Argument long id, @Argument String name) {
        log.info("updateUserName id={}, name={}", id, name);
        this.name = name;
        return user(id);
    }
}
