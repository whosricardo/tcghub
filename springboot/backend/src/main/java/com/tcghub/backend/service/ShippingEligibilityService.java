package com.tcghub.backend.service;

import com.tcghub.backend.dto.functions.ShippingEligibilityResponse;
import com.tcghub.backend.repository.DatabaseFunctionRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class ShippingEligibilityService {

    private final DatabaseFunctionRepository databaseFunctionRepository;

    public ShippingEligibilityService(
        DatabaseFunctionRepository databaseFunctionRepository
    ) {
        this.databaseFunctionRepository = databaseFunctionRepository;
    }

    @Transactional(readOnly = true)
    public ShippingEligibilityResponse checkOrderShippingEligibility(
        Long orderId
    ) {
        String result = databaseFunctionRepository.canShipOrder(orderId);
        return new ShippingEligibilityResponse(orderId, result);
    }
}
