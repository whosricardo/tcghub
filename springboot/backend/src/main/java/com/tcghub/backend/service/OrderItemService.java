package com.tcghub.backend.service;

import com.tcghub.backend.dto.OrderItemRequest;
import com.tcghub.backend.dto.OrderItemResponse;
import com.tcghub.backend.dto.OrderItemUpdateRequest;
import com.tcghub.backend.dto.PageResponse;
import com.tcghub.backend.exception.NotFoundException;
import com.tcghub.backend.model.OrderItem;
import com.tcghub.backend.repository.ListingRepository;
import com.tcghub.backend.repository.OrderItemRepository;
import com.tcghub.backend.repository.OrderRepository;
import java.util.List;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class OrderItemService {

    private final OrderItemRepository orderItemRepository;
    private final ListingRepository listingRepository;
    private final OrderRepository orderRepository;

    public OrderItemService(
        OrderItemRepository orderItemRepository,
        ListingRepository listingRepository,
        OrderRepository orderRepository
    ) {
        this.orderItemRepository = orderItemRepository;
        this.listingRepository = listingRepository;
        this.orderRepository = orderRepository;
    }

    @Transactional
    public OrderItemResponse create(OrderItemRequest request) {
        listingRepository
            .findById(request.listingId())
            .orElseThrow(() -> new NotFoundException("Anúncio não encontrado"));

        orderRepository
            .findById(request.orderId())
            .orElseThrow(() -> new NotFoundException("Pedido não encontrado"));

        OrderItem orderItem = new OrderItem(
            request.listingId(),
            request.orderId(),
            request.quantityBought(),
            request.unitPricePaid(),
            request.technicalReport(),
            request.inspectionDate()
        );

        OrderItem saved = orderItemRepository.save(orderItem);
        return toResponse(saved);
    }

    @Transactional(readOnly = true)
    public OrderItemResponse findById(Long listingId, Long orderId) {
        OrderItem orderItem = orderItemRepository
            .findById(listingId, orderId)
            .orElseThrow(() ->
                new NotFoundException("Item do pedido não encontrado")
            );

        return toResponse(orderItem);
    }

    @Transactional(readOnly = true)
    public PageResponse<OrderItemResponse> findAll(int page, int size) {
        int offset = page * size;

        List<OrderItemResponse> content = orderItemRepository
            .findAll(offset, size)
            .stream()
            .map(this::toResponse)
            .toList();

        int totalElements = orderItemRepository.count();
        int totalPages = (int) Math.ceil((double) totalElements / size);

        return new PageResponse<>(content, page, totalPages, totalElements);
    }

    @Transactional
    public OrderItemResponse updateTechnicalReport(
        Long listingId,
        Long orderId,
        OrderItemUpdateRequest request
    ) {
        orderItemRepository
            .findById(listingId, orderId)
            .orElseThrow(() ->
                new NotFoundException("Item do pedido não encontrado")
            );

        orderItemRepository.updateTechnicalReport(
            listingId,
            orderId,
            request.technicalReport()
        );

        OrderItem updated = orderItemRepository
            .findById(listingId, orderId)
            .orElseThrow(() ->
                new NotFoundException("Item do pedido não encontrado")
            );

        return toResponse(updated);
    }

    @Transactional
    public void deleteById(Long listingId, Long orderId) {
        orderItemRepository
            .findById(listingId, orderId)
            .orElseThrow(() ->
                new NotFoundException("Item do pedido não encontrado")
            );

        orderItemRepository.deleteById(listingId, orderId);
    }

    private OrderItemResponse toResponse(OrderItem orderItem) {
        return new OrderItemResponse(
            orderItem.getListingId(),
            orderItem.getOrderId(),
            orderItem.getQuantityBought(),
            orderItem.getUnitPricePaid(),
            orderItem.getTechnicalReport(),
            orderItem.getInspectionDate()
        );
    }
}
