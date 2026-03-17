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

import com.tcghub.backend.dto.ApiResponse;
import com.tcghub.backend.dto.AuthResponse;
import com.tcghub.backend.dto.LoginRequest;
import com.tcghub.backend.dto.LoginResponse;
import com.tcghub.backend.dto.RefreshTokenRequest;
import com.tcghub.backend.dto.RegisterRequest;
import com.tcghub.backend.exception.InvalidTokenException;
import com.tcghub.backend.model.RefreshToken;
import com.tcghub.backend.model.User;
import com.tcghub.backend.security.JwtService;
import com.tcghub.backend.service.RefreshTokenService;
import com.tcghub.backend.service.UserService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/auth")
public class AuthController {
    private final UserService userService;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;
    private final RefreshTokenService refreshTokenService;

    @Autowired
    public AuthController(UserService userService, JwtService jwtService, AuthenticationManager authenticationManager,
            RefreshTokenService refreshTokenService) {
        this.userService = userService;
        this.jwtService = jwtService;
        this.authenticationManager = authenticationManager;
        this.refreshTokenService = refreshTokenService;
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
            throw new InvalidTokenException("Username ou senha inválida");
        }

        User user = userService.findUserByEmail(request.email());

        String accessToken = jwtService.generateToken(user.getEmail());
        RefreshToken refreshToken = refreshTokenService.createRefreshToken(request.email());

        return new LoginResponse(accessToken, refreshToken.getToken());
    }

    @PostMapping("/refresh")
    @ResponseStatus(HttpStatus.OK)
    public AuthResponse refreshToken(@Valid @RequestBody RefreshTokenRequest refreshTokenRequest) {
        RefreshToken refreshToken = refreshTokenService.validateRefreshToken(refreshTokenRequest.refreshToken());
        String newAcessToken = jwtService.generateToken(refreshToken.getEmail());
        return new AuthResponse(newAcessToken);
    }

    @PostMapping("/logout")
    public ApiResponse logoutUser(@Valid @RequestBody RefreshTokenRequest refreshTokenRequest) {
        RefreshToken refreshToken = refreshTokenService.validateRefreshToken(refreshTokenRequest.refreshToken());
        refreshTokenService.revokeByEmail(refreshToken.getEmail());
        return new ApiResponse("Token revogado");
    }
}
