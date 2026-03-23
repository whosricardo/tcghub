package com.tcghub.backend.service;

import com.tcghub.backend.exception.DuplicateResourceException;
import com.tcghub.backend.exception.NotFoundException;
import com.tcghub.backend.dto.RegisterRequest;
import com.tcghub.backend.model.User;
import com.tcghub.backend.repository.UserRepository;
import com.tcghub.backend.dto.PageResponse;
import com.tcghub.backend.dto.UserResponse;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Autowired
    public UserService(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public User registerUser(RegisterRequest request) {
        if (userRepository.existsByEmail(request.email())) {
            throw new DuplicateResourceException("Email já existente");
        }

        User user = new User();
        user.setUsername(request.username());
        user.setEmail(request.email());
        user.setPassword(passwordEncoder.encode(request.password()));

        return userRepository.save(user);
    }

    public User findUserByEmail(String email) {
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new NotFoundException("User with this email not found"));
    }

    public PageResponse<UserResponse> findAll(int page, int size) {
        int offset = page * size;
        List<UserResponse> content = userRepository.findAll(offset, size)
                .stream()
                .map(user -> new UserResponse(user.getId(), user.getDisplayUsername(), user.getEmail()))
                .toList();
        int totalElements = userRepository.count();
        int totalPages = (int) Math.ceil((double) totalElements / size);
        return new PageResponse<>(content, page, totalPages, totalElements);
    }
}
