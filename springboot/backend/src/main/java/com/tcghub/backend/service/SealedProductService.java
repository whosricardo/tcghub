package com.tcghub.backend.service;

import com.tcghub.backend.dto.PageResponse;
import com.tcghub.backend.dto.SealedProductRequest;
import com.tcghub.backend.dto.SealedProductResponse;
import com.tcghub.backend.dto.SealedProductUpdateRequest;
import com.tcghub.backend.exception.NotFoundException;
import com.tcghub.backend.model.SealedProduct;
import com.tcghub.backend.repository.SealedProductRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class SealedProductService {

    private final SealedProductRepository sealedProductRepository;

    public SealedProductService(SealedProductRepository sealedProductRepository) {
        this.sealedProductRepository = sealedProductRepository;
    }

    @Transactional
    public SealedProductResponse createSealedProduct(SealedProductRequest request) {
        SealedProduct sealedProduct = new SealedProduct(
                null,
                request.name(),
                request.collection(),
                request.sealedType(),
                request.description()
        );

        SealedProduct saved = sealedProductRepository.save(sealedProduct);
        return toResponse(saved);
    }

    @Transactional(readOnly = true)
    public SealedProductResponse findById(Long id) {
        SealedProduct sealedProduct = sealedProductRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("Produto selado não encontrado"));
        return toResponse(sealedProduct);
    }

    @Transactional(readOnly = true)
    public PageResponse<SealedProductResponse> findAll(String name, String collection, String sealedType, int page, int size) {
        int offset = page * size;

        List<SealedProductResponse> content = sealedProductRepository
                .findAll(name, collection, sealedType, offset, size)
                .stream()
                .map(this::toResponse)
                .toList();

        int totalElements = sealedProductRepository.count(name, collection, sealedType);
        int totalPages = (int) Math.ceil((double) totalElements / size);

        return new PageResponse<>(content, page, totalPages, totalElements);
    }

    @Transactional
    public SealedProductResponse updateDescription(Long id, SealedProductUpdateRequest request) {
        sealedProductRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("Produto selado não encontrado"));

        sealedProductRepository.updateDescription(id, request.description());

        return toResponse(
                sealedProductRepository.findById(id)
                        .orElseThrow(() -> new NotFoundException("Produto selado não encontrado"))
        );
    }

    @Transactional
    public void deleteById(Long id) {
        sealedProductRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("Produto selado não encontrado"));

        sealedProductRepository.deleteById(id);
    }

    private SealedProductResponse toResponse(SealedProduct sealedProduct) {
        return new SealedProductResponse(
                sealedProduct.getId(),
                sealedProduct.getName(),
                sealedProduct.getCollection(),
                sealedProduct.getSealedType(),
                sealedProduct.getDescription()
        );
    }
}