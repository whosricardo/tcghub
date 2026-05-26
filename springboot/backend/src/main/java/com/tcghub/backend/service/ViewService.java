package com.tcghub.backend.service;

import com.tcghub.backend.dto.views.AboveAvgCommissionSupplierViewResponse;
import com.tcghub.backend.dto.views.ActiveListingDetailViewResponse;
import com.tcghub.backend.repository.ViewRepository;
import java.util.List;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class ViewService {

    private final ViewRepository viewRepository;

    public ViewService(ViewRepository viewRepository) {
        this.viewRepository = viewRepository;
    }

    @Transactional(readOnly = true)
    public List<ActiveListingDetailViewResponse> findActiveListingsDetail(
        String productName,
        String supplierName,
        String collection
    ) {
        return viewRepository.findActiveListingsDetail(
            productName,
            supplierName,
            collection
        );
    }

    @Transactional(readOnly = true)
    public List<AboveAvgCommissionSupplierViewResponse> findAboveAvgCommissionSuppliers(
        String storeName
    ) {
        return viewRepository.findAboveAvgCommissionSuppliers(storeName);
    }
}
