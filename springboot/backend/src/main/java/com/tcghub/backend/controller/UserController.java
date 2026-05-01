package com.tcghub.backend.controller;

import com.tcghub.backend.dto.PageResponse;
import com.tcghub.backend.dto.UserResponse;
import com.tcghub.backend.service.UserService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/users")
@Tag(
    name = "Usuários",
    description = "Endpoints para consulta de usuários cadastrados"
)
public class UserController {

    private final UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping
    @Operation(
        summary = "Listar usuários",
        description = "Retorna uma lista paginada de todos os usuários do sistema."
    )
    public PageResponse<UserResponse> findAll(
        @Parameter(
            description = "Número da página (começa em 0)"
        ) @RequestParam(defaultValue = "0") int page,
        @Parameter(
            description = "Quantidade de itens por página"
        ) @RequestParam(defaultValue = "5") int size
    ) {
        return userService.findAll(page, size);
    }
}
