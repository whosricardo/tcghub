package com.tcghub.backend.service;

import com.tcghub.backend.dto.ListingRequest;
import com.tcghub.backend.dto.ListingResponse;
import com.tcghub.backend.dto.ListingUpdateRequest;
import com.tcghub.backend.exception.NotFoundException;
import com.tcghub.backend.model.Listing;
import com.tcghub.backend.repository.ListingRepository;
import com.tcghub.backend.repository.ProductRepository;
import com.tcghub.backend.repository.SupplierRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.math.BigDecimal;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class ListingServiceTest {

    @Mock
    private ListingRepository listingRepository;

    @Mock
    private ProductRepository productRepository;

    @Mock
    private SupplierRepository supplierRepository;

    @InjectMocks
    private ListingService listingService;

    @Test
    void shouldCreateListingWhenProductAndSupplierExist() {
        ListingRequest request = new ListingRequest(
                10,
                new BigDecimal("149.90"),
                "Near Mint",
                "EN",
                1L,
                2L);

        Listing savedListing = new Listing(
                100L,
                10,
                new BigDecimal("149.90"),
                "Near Mint",
                "EN",
                1L,
                2L);

        when(productRepository.existsById(1L)).thenReturn(true);
        when(supplierRepository.existsById(2L)).thenReturn(true);
        when(listingRepository.save(any(Listing.class))).thenReturn(savedListing);

        ListingResponse response = listingService.create(request);

        assertNotNull(response);
        assertEquals(100L, response.id());
        assertEquals(10, response.availableQuantity());
        assertEquals(new BigDecimal("149.90"), response.currentPrice());
        assertEquals("Near Mint", response.itemCondition());
        assertEquals("EN", response.productLanguage());
        assertEquals(1L, response.productId());
        assertEquals(2L, response.supplierId());

        verify(productRepository).existsById(1L);
        verify(supplierRepository).existsById(2L);
        verify(listingRepository).save(any(Listing.class));
    }

    @Test
    void shouldThrowExceptionWhenProductDoesNotExist() {
        ListingRequest request = new ListingRequest(
                10,
                new BigDecimal("149.90"),
                "Near Mint",
                "EN",
                1L,
                2L);

        when(productRepository.existsById(1L)).thenReturn(false);

        NotFoundException exception = assertThrows(
                NotFoundException.class,
                () -> listingService.create(request));

        assertEquals("Produto não encontrado", exception.getMessage());

        verify(productRepository).existsById(1L);
        verify(supplierRepository, never()).existsById(anyLong());
        verify(listingRepository, never()).save(any(Listing.class));
    }

    @Test
    void shouldThrowExceptionWhenSupplierDoesNotExist() {
        ListingRequest request = new ListingRequest(
                10,
                new BigDecimal("149.90"),
                "Near Mint",
                "EN",
                1L,
                2L);

        when(productRepository.existsById(1L)).thenReturn(true);
        when(supplierRepository.existsById(2L)).thenReturn(false);

        NotFoundException exception = assertThrows(
                NotFoundException.class,
                () -> listingService.create(request));

        assertEquals("Fornecedor não encontrado", exception.getMessage());

        verify(productRepository).existsById(1L);
        verify(supplierRepository).existsById(2L);
        verify(listingRepository, never()).save(any(Listing.class));
    }

    @Test
    void shouldFindListingById() {
        Listing listing = new Listing(
                100L,
                10,
                new BigDecimal("149.90"),
                "Near Mint",
                "EN",
                1L,
                2L);

        when(listingRepository.findById(100L)).thenReturn(Optional.of(listing));

        ListingResponse response = listingService.findById(100L);

        assertNotNull(response);
        assertEquals(100L, response.id());
        assertEquals(10, response.availableQuantity());
        assertEquals(new BigDecimal("149.90"), response.currentPrice());
        assertEquals("Near Mint", response.itemCondition());
        assertEquals("EN", response.productLanguage());
        assertEquals(1L, response.productId());
        assertEquals(2L, response.supplierId());

        verify(listingRepository).findById(100L);
    }

    @Test
    void shouldThrowExceptionWhenListingDoesNotExistOnFindById() {
        when(listingRepository.findById(999L)).thenReturn(Optional.empty());

        NotFoundException exception = assertThrows(
                NotFoundException.class,
                () -> listingService.findById(999L));

        assertEquals("Anúncio não encontrado", exception.getMessage());
        verify(listingRepository).findById(999L);
    }

    @Test
    void shouldUpdateListing() {
        Listing existing = new Listing(
                100L,
                10,
                new BigDecimal("149.90"),
                "Near Mint",
                "EN",
                1L,
                2L);

        Listing updated = new Listing(
                100L,
                5,
                new BigDecimal("129.90"),
                "Mint",
                "PT",
                1L,
                2L);

        ListingUpdateRequest request = new ListingUpdateRequest(
                5,
                new BigDecimal("129.90"),
                "Mint",
                "PT");

        when(listingRepository.findById(100L))
                .thenReturn(Optional.of(existing))
                .thenReturn(Optional.of(updated));

        when(listingRepository.update(eq(100L), any(Listing.class))).thenReturn(true);

        ListingResponse response = listingService.update(100L, request);

        assertNotNull(response);
        assertEquals(100L, response.id());
        assertEquals(5, response.availableQuantity());
        assertEquals(new BigDecimal("129.90"), response.currentPrice());
        assertEquals("Mint", response.itemCondition());
        assertEquals("PT", response.productLanguage());
        assertEquals(1L, response.productId());
        assertEquals(2L, response.supplierId());

        verify(listingRepository, times(2)).findById(100L);
        verify(listingRepository).update(eq(100L), any(Listing.class));
    }

    @Test
    void shouldThrowExceptionWhenListingDoesNotExistOnUpdate() {
        ListingUpdateRequest request = new ListingUpdateRequest(
                5,
                new BigDecimal("129.90"),
                "Mint",
                "PT");

        when(listingRepository.findById(999L)).thenReturn(Optional.empty());

        NotFoundException exception = assertThrows(
                NotFoundException.class,
                () -> listingService.update(999L, request));

        assertEquals("Anúncio não encontrado", exception.getMessage());
        verify(listingRepository).findById(999L);
        verify(listingRepository, never()).update(anyLong(), any(Listing.class));
    }

    @Test
    void shouldDeleteListingWhenItExists() {
        Listing existing = new Listing(
                100L,
                10,
                new BigDecimal("149.90"),
                "Near Mint",
                "EN",
                1L,
                2L);

        when(listingRepository.findById(100L)).thenReturn(Optional.of(existing));
        when(listingRepository.deleteById(100L)).thenReturn(true);

        assertDoesNotThrow(() -> listingService.deleteById(100L));

        verify(listingRepository).findById(100L);
        verify(listingRepository).deleteById(100L);
    }

    @Test
    void shouldThrowExceptionWhenListingDoesNotExistOnDelete() {
        when(listingRepository.findById(999L)).thenReturn(Optional.empty());

        NotFoundException exception = assertThrows(
                NotFoundException.class,
                () -> listingService.deleteById(999L));

        assertEquals("Anúncio não encontrado", exception.getMessage());
        verify(listingRepository).findById(999L);
        verify(listingRepository, never()).deleteById(anyLong());
    }
}
