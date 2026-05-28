package com.tcghub.backend.controller;

import com.tcghub.backend.dto.functions.ShippingEligibilityResponse;
import com.tcghub.backend.service.ShippingEligibilityService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/functions")
@Tag(name = "Funções", description = "Endpoints para integração com funções SQL da Etapa 05")
public class FunctionController {

    private final ShippingEligibilityService shippingEligibilityService;

    public FunctionController(
        ShippingEligibilityService shippingEligibilityService
    ) {
        this.shippingEligibilityService = shippingEligibilityService;
    }

    @GetMapping("/orders/{id}/shipping-eligibility")
    @Operation(
        summary = "Verificar elegibilidade de envio do pedido",
        description = "Chama a função fn_can_ship_order para verificar se um pedido está apto para envio."
    )
    public ShippingEligibilityResponse checkOrderShippingEligibility(
        @Parameter(description = "ID único do pedido") @PathVariable Long id
    ) {
        return shippingEligibilityService.checkOrderShippingEligibility(id);
    }
}
