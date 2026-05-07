package com.tcghub.backend.repository;

import com.tcghub.backend.model.Shipment;
import com.tcghub.backend.model.enums.DeliveryStatus;
import java.sql.PreparedStatement;
import java.sql.Statement;
import java.sql.Timestamp;
import java.sql.Types;
import java.util.List;
import java.util.Optional;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.jdbc.support.KeyHolder;
import org.springframework.stereotype.Repository;

@Repository
public class ShipmentRepository {

    private final JdbcTemplate jdbcTemplate;

    public ShipmentRepository(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    private final RowMapper<Shipment> shipmentRowMapper = (rs, rowNum) -> {
        Timestamp shippingTimestamp = rs.getTimestamp("shipping_date");
        Timestamp estimatedTimestamp = rs.getTimestamp(
            "estimated_delivery_date"
        );

        return new Shipment(
            rs.getLong("id"),
            rs.getString("tracking_code"),
            shippingTimestamp != null
                ? shippingTimestamp.toLocalDateTime()
                : null,
            rs.getBigDecimal("freight_cost"),
            rs.getString("carrier"),
            DeliveryStatus.valueOf(rs.getString("delivery_status")),
            estimatedTimestamp != null
                ? estimatedTimestamp.toLocalDateTime()
                : null,
            rs.getLong("order_id"),
            rs.getObject("address_id", Long.class)
        );
    };

    public Shipment save(Shipment shipment) {
        String sql = """
            INSERT INTO shipments (
                tracking_code,
                shipping_date,
                freight_cost,
                carrier,
                delivery_status,
                estimated_delivery_date,
                order_id,
                address_id
            )
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)
            """;

        KeyHolder keyHolder = new GeneratedKeyHolder();

        jdbcTemplate.update(
            connection -> {
                PreparedStatement ps = connection.prepareStatement(
                    sql,
                    Statement.RETURN_GENERATED_KEYS
                );

                ps.setString(1, shipment.getTrackingCode());
                ps.setTimestamp(
                    2,
                    shipment.getShippingDate() != null
                        ? Timestamp.valueOf(shipment.getShippingDate())
                        : null
                );
                ps.setBigDecimal(3, shipment.getFreightCost());
                ps.setString(4, shipment.getCarrier());
                ps.setString(5, shipment.getDeliveryStatus().name());
                ps.setTimestamp(
                    6,
                    shipment.getEstimatedDeliveryDate() != null
                        ? Timestamp.valueOf(shipment.getEstimatedDeliveryDate())
                        : null
                );
                ps.setLong(7, shipment.getOrderId());

                if (shipment.getAddressId() != null) {
                    ps.setLong(8, shipment.getAddressId());
                } else {
                    ps.setNull(8, Types.BIGINT);
                }

                return ps;
            },
            keyHolder
        );

        Number key = keyHolder.getKey();
        if (key == null) {
            throw new IllegalStateException(
                "Failed to obtain generated shipment ID"
            );
        }

        shipment.setId(key.longValue());
        return shipment;
    }

    public Optional<Shipment> findById(Long id) {
        String sql = "SELECT * FROM shipments WHERE id = ?";
        return jdbcTemplate
            .query(sql, shipmentRowMapper, id)
            .stream()
            .findFirst();
    }

    public List<Shipment> findAll(int offset, int size) {
        String sql = """
            SELECT * FROM shipments
            ORDER BY shipping_date DESC, id DESC
            LIMIT ? OFFSET ?
            """;
        return jdbcTemplate.query(sql, shipmentRowMapper, size, offset);
    }

    public int count() {
        String sql = "SELECT COUNT(*) FROM shipments";
        Integer count = jdbcTemplate.queryForObject(sql, Integer.class);
        return count != null ? count : 0;
    }

    public boolean updateStatus(Long id, DeliveryStatus deliveryStatus) {
        String sql = """
            UPDATE shipments
            SET delivery_status = ?
            WHERE id = ?
            """;

        int rowsAffected = jdbcTemplate.update(sql, deliveryStatus.name(), id);
        return rowsAffected > 0;
    }

    public boolean deleteById(Long id) {
        String sql = "DELETE FROM shipments WHERE id = ?";
        int rowsAffected = jdbcTemplate.update(sql, id);
        return rowsAffected > 0;
    }
}
