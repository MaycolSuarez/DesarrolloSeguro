package com.irojas.demojwt.User;

import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

public interface UserRepository extends MongoRepository<User, String> {
    // Optional<User> findByUsername(String username);
    @Query("{ 'username' : ?0 }")
    Optional<User> findByUsername(String username);

    @Query("{ 'email' : ?0 }")
    Optional<User> findUsuarioByEmail(String email);
}
