package com.tcghub.backend.repository;

import com.tcghub.backend.dto.views.AboveAvgCommissionSupplierViewResponse;
import com.tcghub.backend.dto.views.ActiveListingDetailViewResponse;
import java.util.List;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

@Repository
public class ViewRepository {

    private final JdbcTemplate jdbcTemplate;

    public ViewRepository(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    private final RowMapper<ActiveListingDetailViewResponse> activeListingDetailRowMapper = (rs, rowNum) ->
        new ActiveListingDetailViewResponse(
            rs.getLong("listing_id"),
            rs.getString("product_name"),
            rs.getString("collection"),
            rs.getString("supplier_name"),
            rs.getBigDecimal("commission_rate"),
            rs.getBigDecimal("current_price"),
            rs.getInt("available_quantity"),
            rs.getString("item_condition"),
            rs.getString("product_language")
        );

    private final RowMapper<AboveAvgCommissionSupplierViewResponse> aboveAvgCommissionSupplierRowMapper = (rs, rowNum) ->
        new AboveAvgCommissionSupplierViewResponse(
            rs.getLong("supplier_id"),
            rs.getString("store_name"),
            rs.getString("contact_email"),
            rs.getBigDecimal("commission_rate"),
            rs.getInt("total_products_listed")
        );

    public List<ActiveListingDetailViewResponse> findActiveListingsDetail(
        String productName,
        String supplierName,
        String collection
    ) {
        String sql = """
            SELECT
                listing_id,
                product_name,
                collection,
                supplier_name,
                commission_rate,
                current_price,
                available_quantity,
                item_condition,
                product_language
            FROM vw_active_listings_detail
            WHERE (? IS NULL OR product_name LIKE CONCAT('%', ?, '%'))
              AND (? IS NULL OR supplier_name LIKE CONCAT('%', ?, '%'))
              AND (? IS NULL OR collection = ?)
            ORDER BY product_name ASC, supplier_name ASC
            """;

        return jdbcTemplate.query(
            sql,
            activeListingDetailRowMapper,
            productName,
            productName,
            supplierName,
            supplierName,
            collection,
            collection
        );
    }

    public List<AboveAvgCommissionSupplierViewResponse> findAboveAvgCommissionSuppliers(
        String storeName
    ) {
        String sql = """
            SELECT
                supplier_id,
                store_name,
                contact_email,
                commission_rate,
                total_products_listed
            FROM vw_above_avg_commission_suppliers
            WHERE (? IS NULL OR store_name LIKE CONCAT('%', ?, '%'))
            ORDER BY store_name ASC
            """;

        return jdbcTemplate.query(
            sql,
            aboveAvgCommissionSupplierRowMapper,
            storeName,
            storeName
        );
    }
}
