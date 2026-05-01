package com.tcghub.backend.service;

import com.tcghub.backend.dto.ListingRequest;
import com.tcghub.backend.dto.ListingResponse;
import com.tcghub.backend.dto.ListingUpdateRequest;
import com.tcghub.backend.dto.PageResponse;
import com.tcghub.backend.exception.NotFoundException;
import com.tcghub.backend.model.Listing;
import com.tcghub.backend.repository.ListingRepository;
import com.tcghub.backend.repository.ProductRepository;
import com.tcghub.backend.repository.SupplierRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class ListingService {

    private final ListingRepository listingRepository;
    private final ProductRepository productRepository;
    private final SupplierRepository supplierRepository;

    public ListingService(
            ListingRepository listingRepository,
            ProductRepository productRepository,
            SupplierRepository supplierRepository) {
        this.listingRepository = listingRepository;
        this.productRepository = productRepository;
        this.supplierRepository = supplierRepository;
    }

    @Transactional
    public ListingResponse create(ListingRequest request) {
        if (!productRepository.existsById(request.productId())) {
            throw new NotFoundException("Produto não encontrado");
        }

        if (!supplierRepository.existsById(request.supplierId())) {
            throw new NotFoundException("Fornecedor não encontrado");
        }

        Listing listing = new Listing(
                null,
                request.availableQuantity(),
                request.currentPrice(),
                request.itemCondition(),
                request.productLanguage(),
                request.productId(),
                request.supplierId());

        return toResponse(listingRepository.save(listing));
    }

    @Transactional(readOnly = true)
    public ListingResponse findById(Long id) {
        Listing listing = listingRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("Anúncio não encontrado"));
        return toResponse(listing);
    }

    @Transactional(readOnly = true)
    public PageResponse<ListingResponse> findAll(int page, int size) {
        int offset = page * size;

        List<ListingResponse> content = listingRepository.findAll(offset, size)
                .stream()
                .map(this::toResponse)
                .toList();

        int totalElements = listingRepository.count();
        int totalPages = (int) Math.ceil((double) totalElements / size);

        return new PageResponse<>(content, page, totalPages, totalElements);
    }

    @Transactional
    public ListingResponse update(Long id, ListingUpdateRequest request) {
        Listing existing = listingRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("Anúncio não encontrado"));

        Listing updated = new Listing(
                existing.getId(),
                request.availableQuantity() != null ? request.availableQuantity() : existing.getAvailableQuantity(),
                request.currentPrice() != null ? request.currentPrice() : existing.getCurrentPrice(),
                request.itemCondition() != null ? request.itemCondition() : existing.getItemCondition(),
                request.productLanguage() != null ? request.productLanguage() : existing.getProductLanguage(),
                existing.getProductId(),
                existing.getSupplierId());

        listingRepository.update(id, updated);

        return toResponse(
                listingRepository.findById(id)
                        .orElseThrow(() -> new NotFoundException("Anúncio não encontrado")));
    }

    @Transactional
    public void deleteById(Long id) {
        listingRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("Anúncio não encontrado"));
        listingRepository.deleteById(id);
    }

    private ListingResponse toResponse(Listing listing) {
        return new ListingResponse(
                listing.getId(),
                listing.getAvailableQuantity(),
                listing.getCurrentPrice(),
                listing.getItemCondition(),
                listing.getProductLanguage(),
                listing.getProductId(),
                listing.getSupplierId());
    }
}
