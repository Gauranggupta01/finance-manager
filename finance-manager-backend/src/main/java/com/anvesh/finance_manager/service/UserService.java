package com.anvesh.finance_manager.service;

import com.anvesh.finance_manager.dto.LoginRequestDTO;
import com.anvesh.finance_manager.dto.LoginResponseDTO;
import com.anvesh.finance_manager.dto.UserResponseDTO;

import com.anvesh.finance_manager.entity.User;

import com.anvesh.finance_manager.repository.UserRepository;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import org.springframework.stereotype.Service;

import java.util.List;

import java.util.stream.Collectors;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private BCryptPasswordEncoder passwordEncoder;

    // REGISTER USER

    public User registerUser(
            User user
    ) {

        // CHECK IF USERNAME EXISTS

        boolean exists = userRepository
                .existsByUsername(
                        user.getUsername()
                );

        if (exists) {

            throw new RuntimeException(
                    "Username already exists"
            );
        }

        // ENCODE PASSWORD

        user.setPassword(

                passwordEncoder.encode(
                        user.getPassword()
                )
        );

        // SAVE USER

        return userRepository.save(user);
    }

    // GET ALL USERS

    public List<UserResponseDTO> getAllUsers() {

        return userRepository.findAll()

                .stream()

                .map(this::convertToDTO)

                .collect(Collectors.toList());
    }

    // GET USER BY ID

    public UserResponseDTO getUserById(
            Long id
    ) {

        User user = userRepository

                .findById(id)

                .orElse(null);

        if (user == null) {

            return null;
        }

        return convertToDTO(user);
    }

    // LOGIN USER

    public LoginResponseDTO login(
            LoginRequestDTO request
    ) {

        User user = userRepository

                .findByUsername(
                        request.getUsername()
                )

                .orElse(null);

        // USER NOT FOUND

        if (user == null) {

            return new LoginResponseDTO(

                    "User not found",

                    null
            );
        }

        // PASSWORD CHECK

        boolean matches =
                passwordEncoder.matches(

                        request.getPassword(),

                        user.getPassword()
                );

        if (!matches) {

            return new LoginResponseDTO(

                    "Invalid password",

                    null
            );
        }

        // LOGIN SUCCESS

        return new LoginResponseDTO(

                "Login successful",

                "SUCCESS"
        );
    }

    // CONVERT ENTITY TO DTO

    private UserResponseDTO convertToDTO(
            User user
    ) {

        UserResponseDTO dto =
                new UserResponseDTO();

        dto.setId(
                user.getId()
        );

        dto.setName(
                user.getFullName()
        );

        dto.setEmail(
                user.getUsername()
        );

        return dto;
    }
}