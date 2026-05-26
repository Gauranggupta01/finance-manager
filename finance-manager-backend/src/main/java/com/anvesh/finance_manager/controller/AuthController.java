package com.anvesh.finance_manager.controller;

import com.anvesh.finance_manager.dto.AuthRequest;
import com.anvesh.finance_manager.dto.RegisterRequest;
import com.anvesh.finance_manager.entity.User;
import com.anvesh.finance_manager.repository.UserRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "*")
public class AuthController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private BCryptPasswordEncoder passwordEncoder;

    @PostMapping("/register")
    public ResponseEntity<?> register(

            @RequestBody RegisterRequest request
    ) {

        // CHECK IF USERNAME ALREADY EXISTS

        boolean exists = userRepository
                .existsByUsername(

                        request.getUsername()
                );

        if (exists) {

            return ResponseEntity
                    .badRequest()
                    .body(
                            "Username already exists"
                    );
        }

        // CREATE USER

        User user = new User();

        user.setUsername(
                request.getUsername()
        );

        user.setPassword(

                passwordEncoder.encode(

                        request.getPassword()
                )
        );

        user.setFullName(
                request.getFullName()
        );

        user.setPhoneNumber(
                request.getPhoneNumber()
        );

        // SAVE USER

        userRepository.save(user);

        return ResponseEntity.ok(
                "User Registered Successfully"
        );
    }

    @PostMapping("/login")
    public Map<String, Object> login(
            @RequestBody AuthRequest request
    ) {

        User user =
                userRepository.findByUsername(
                        request.getUsername()
                ).orElse(null);

        Map<String, Object> response =
                new HashMap<>();

        if (user == null) {

            response.put(
                    "message",
                    "User Not Found"
            );

            return response;
        }

        boolean matches =
                passwordEncoder.matches(
                        request.getPassword(),
                        user.getPassword()
                );

        if (!matches) {

            response.put(
                    "message",
                    "Invalid Password"
            );

            return response;
        }

        response.put(
                "message",
                "Login Successful"
        );

        response.put(
                "username",
                user.getUsername()
        );

        return response;
    }
}