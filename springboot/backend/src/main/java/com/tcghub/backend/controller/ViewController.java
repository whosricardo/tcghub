package com.tcghub.backend.controller;

import com.tcghub.backend.dto.views.AboveAvgCommissionSupplierViewResponse;
import com.tcghub.backend.dto.views.ActiveListingDetailViewResponse;
import com.tcghub.backend.service.ViewService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import java.util.List;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/views")
@Tag(name = "Views", description = "Endpoints para exposição das views SQL da Etapa 04")
public class ViewController {

    private final ViewService viewService;

    public ViewController(ViewService viewService) {
        this.viewService = viewService;
    }

    @GetMapping("/active-listings-detail")
    @Operation(
        summary = "Listar detalhes de anúncios ativos",
        description = "Consulta a view vw_active_listings_detail, retornando anúncios ativos com produto, fornecedor, preço, estoque, condição e idioma."
    )
    public List<ActiveListingDetailViewResponse> findActiveListingsDetail(
        @Parameter(description = "Filtro opcional por nome do produto")
        @RequestParam(required = false)
        String productName,
        @Parameter(description = "Filtro opcional por nome do fornecedor")
        @RequestParam(required = false)
        String supplierName,
        @Parameter(description = "Filtro opcional por coleção do produto")
        @RequestParam(required = false)
        String collection
    ) {
        return viewService.findActiveListingsDetail(
            productName,
            supplierName,
            collection
        );
    }

    @GetMapping("/above-average-commission-suppliers")
    @Operation(
        summary = "Listar fornecedores com comissão acima da média",
        description = "Consulta a view vw_above_avg_commission_suppliers, retornando fornecedores com comissão acima da média geral e total de produtos anunciados."
    )
    public List<AboveAvgCommissionSupplierViewResponse> findAboveAvgCommissionSuppliers(
        @Parameter(description = "Filtro opcional por nome da loja")
        @RequestParam(required = false)
        String storeName
    ) {
        return viewService.findAboveAvgCommissionSuppliers(storeName);
    }
}
