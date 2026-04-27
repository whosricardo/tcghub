package com.tcghub.backend.service;

import com.tcghub.backend.dto.OrderRequest;
import com.tcghub.backend.dto.OrderResponse;
import com.tcghub.backend.dto.OrderUpdateRequest;
import com.tcghub.backend.dto.PageResponse;
import com.tcghub.backend.exception.NotFoundException;
import com.tcghub.backend.model.Order;
import com.tcghub.backend.model.enums.OrderStatus;
import com.tcghub.backend.repository.BuyerRepository;
import com.tcghub.backend.repository.OrderRepository;
import java.time.LocalDateTime;
import java.util.List;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class OrderService {

    private final OrderRepository orderRepository;
    private final BuyerRepository buyerRepository;

    public OrderService(
        OrderRepository orderRepository,
        BuyerRepository buyerRepository
    ) {
        this.orderRepository = orderRepository;
        this.buyerRepository = buyerRepository;
    }

    @Transactional
    public OrderResponse create(OrderRequest request) {
        if (!buyerRepository.existsById(request.buyerId())) {
            throw new NotFoundException("Comprador não encontrado");
        }

        Order order = new Order(
            null,
            request.buyerId(),
            LocalDateTime.now(),
            request.totalAmount(),
            OrderStatus.PENDING
        );

        Order saved = orderRepository.save(order);
        return toResponse(saved);
    }

    @Transactional(readOnly = true)
    public OrderResponse findById(Long id) {
        Order order = orderRepository
            .findById(id)
            .orElseThrow(() -> new NotFoundException("Pedido não encontrado"));
        return toResponse(order);
    }

    @Transactional(readOnly = true)
    public PageResponse<OrderResponse> findAll(int page, int size) {
        int offset = page * size;

        List<OrderResponse> content = orderRepository
            .findAll(offset, size)
            .stream()
            .map(this::toResponse)
            .toList();

        int totalElements = orderRepository.count();
        int totalPages = (int) Math.ceil((double) totalElements / size);

        return new PageResponse<>(content, page, totalPages, totalElements);
    }

    @Transactional
    public OrderResponse updateStatus(Long id, OrderUpdateRequest request) {
        orderRepository
            .findById(id)
            .orElseThrow(() -> new NotFoundException("Pedido não encontrado"));

        orderRepository.updateStatus(id, request.status());

        Order updated = orderRepository
            .findById(id)
            .orElseThrow(() -> new NotFoundException("Pedido não encontrado"));

        return toResponse(updated);
    }

    @Transactional
    public void deleteById(Long id) {
        orderRepository
            .findById(id)
            .orElseThrow(() -> new NotFoundException("Pedido não encontrado"));

        orderRepository.deleteById(id);
    }

    private OrderResponse toResponse(Order order) {
        return new OrderResponse(
            order.getId(),
            order.getBuyerId(),
            order.getCreatedAt(),
            order.getTotalAmount(),
            order.getStatus()
        );
    }
}
