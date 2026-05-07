package com.tcghub.backend.service;

import com.tcghub.backend.dto.PageResponse;
import com.tcghub.backend.dto.ShipmentRequest;
import com.tcghub.backend.dto.ShipmentResponse;
import com.tcghub.backend.dto.ShipmentUpdateRequest;
import com.tcghub.backend.exception.NotFoundException;
import com.tcghub.backend.model.Shipment;
import com.tcghub.backend.model.enums.DeliveryStatus;
import com.tcghub.backend.repository.AddressRepository;
import com.tcghub.backend.repository.OrderRepository;
import com.tcghub.backend.repository.ShipmentRepository;
import java.time.LocalDateTime;
import java.util.List;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class ShipmentService {

    private final ShipmentRepository shipmentRepository;
    private final OrderRepository orderRepository;
    private final AddressRepository addressRepository;

    public ShipmentService(
        ShipmentRepository shipmentRepository,
        OrderRepository orderRepository,
        AddressRepository addressRepository
    ) {
        this.shipmentRepository = shipmentRepository;
        this.orderRepository = orderRepository;
        this.addressRepository = addressRepository;
    }

    @Transactional
    public ShipmentResponse create(ShipmentRequest request) {
        orderRepository
            .findById(request.orderId())
            .orElseThrow(() -> new NotFoundException("Pedido não encontrado"));

        if (
            request.addressId() != null &&
            !addressRepository.existsById(request.addressId())
        ) {
            throw new NotFoundException("Endereço não encontrado");
        }

        Shipment shipment = new Shipment(
            null,
            request.trackingCode(),
            LocalDateTime.now(),
            request.freightCost(),
            request.carrier(),
            DeliveryStatus.PENDING,
            request.estimatedDeliveryDate(),
            request.orderId(),
            request.addressId()
        );

        Shipment saved = shipmentRepository.save(shipment);
        return toResponse(saved);
    }

    @Transactional(readOnly = true)
    public ShipmentResponse findById(Long id) {
        Shipment shipment = shipmentRepository
            .findById(id)
            .orElseThrow(() -> new NotFoundException("Remessa não encontrada"));

        return toResponse(shipment);
    }

    @Transactional(readOnly = true)
    public PageResponse<ShipmentResponse> findAll(int page, int size) {
        int offset = page * size;

        List<ShipmentResponse> content = shipmentRepository
            .findAll(offset, size)
            .stream()
            .map(this::toResponse)
            .toList();

        int totalElements = shipmentRepository.count();
        int totalPages = (int) Math.ceil((double) totalElements / size);

        return new PageResponse<>(content, page, totalPages, totalElements);
    }

    @Transactional
    public ShipmentResponse updateStatus(
        Long id,
        ShipmentUpdateRequest request
    ) {
        shipmentRepository
            .findById(id)
            .orElseThrow(() -> new NotFoundException("Remessa não encontrada"));

        shipmentRepository.updateStatus(id, request.deliveryStatus());

        Shipment updated = shipmentRepository
            .findById(id)
            .orElseThrow(() -> new NotFoundException("Remessa não encontrada"));

        return toResponse(updated);
    }

    @Transactional
    public void deleteById(Long id) {
        shipmentRepository
            .findById(id)
            .orElseThrow(() -> new NotFoundException("Remessa não encontrada"));

        shipmentRepository.deleteById(id);
    }

    private ShipmentResponse toResponse(Shipment shipment) {
        return new ShipmentResponse(
            shipment.getId(),
            shipment.getTrackingCode(),
            shipment.getShippingDate(),
            shipment.getFreightCost(),
            shipment.getCarrier(),
            shipment.getDeliveryStatus(),
            shipment.getEstimatedDeliveryDate(),
            shipment.getOrderId(),
            shipment.getAddressId()
        );
    }
}
