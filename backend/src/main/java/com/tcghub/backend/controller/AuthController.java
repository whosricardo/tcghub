package com.tcghub.backend.controller;

import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import com.tcghub.backend.dto.ApiResponse;
import com.tcghub.backend.dto.LoginRequest;
import com.tcghub.backend.dto.LoginResponse;
import com.tcghub.backend.dto.RegisterRequest;
import com.tcghub.backend.model.User;
import com.tcghub.backend.security.JwtService;
import com.tcghub.backend.service.UserService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/auth")
public class AuthController {
    private final UserService userService;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;

    @Autowired
    public AuthController(UserService userService, JwtService jwtService, AuthenticationManager authenticationManager) {
        this.userService = userService;
        this.jwtService = jwtService;
        this.authenticationManager = authenticationManager;
    }

    @PostMapping("/register")
    @ResponseStatus(HttpStatus.CREATED)
    public ApiResponse registerUser(@Valid @RequestBody RegisterRequest request) {
        userService.registerUser(request);
        return new ApiResponse("Usuário registrado com sucesso");
    }

    @PostMapping("/login")
    @ResponseStatus(HttpStatus.OK)
    public LoginResponse loginUser(@Valid @RequestBody LoginRequest request) {
        UsernamePasswordAuthenticationToken uPasswordAuthenticationToken = new UsernamePasswordAuthenticationToken(
                request.email(), request.password());
        try {
            authenticationManager.authenticate(uPasswordAuthenticationToken);
        } catch (BadCredentialsException e) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Username ou senha inválida");
        }

        User user = userService.findUserByEmail(request.email());

        String accessToken = jwtService.generateToken(user.getEmail());

        return new LoginResponse(accessToken);
    }
}
