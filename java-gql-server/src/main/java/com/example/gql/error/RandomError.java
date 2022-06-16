package com.example.gql.error;

import graphql.ErrorClassification;
import graphql.ErrorType;
import graphql.GraphQLError;
import graphql.GraphQLException;
import graphql.language.SourceLocation;

import java.util.List;
import java.util.Map;

public class RandomError extends GraphQLException implements GraphQLError {
    public RandomError(String message) {
        super(message);
    }

    @Override
    public Map<String, Object> getExtensions() {
        return Map.of("randomKey", "随机错误");
    }

    @Override
    public List<SourceLocation> getLocations() {
        return null;
    }

    @Override
    public ErrorClassification getErrorType() {
        return ErrorType.DataFetchingException;
    }

    //    get
//     getExtensions(): MutableMap<String, Any> {
//        return mutableMapOf("parameters" to (parameters ?: mutableMapOf()))
//    }
//
//    override fun getErrorType(): ErrorClassification {
//        return ErrorType.DataFetchingException
//    }
}
