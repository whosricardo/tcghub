-- =========================================================
-- VIEW 01
-- Tipo exigido: 3 JOINs + WHERE
-- Objetivo:
-- Listar anúncios ativos agrupando produto e fornecedor,
-- explorando os índices idx_product_name e idx_suppliers_name.
-- Justificativa:
-- Usada na busca do marketplace: o WHERE em p.name e
-- s.store_name se beneficia diretamente dos índices,
-- tornando a consulta eficiente mesmo com grande volume.
-- =========================================================
CREATE VIEW vw_active_listings_detail AS
SELECT
    l.id              AS listing_id,
    p.name            AS product_name,
    p.collection,
    s.store_name      AS supplier_name,
    s.commission_rate,
    l.current_price,
    l.available_quantity,
    l.item_condition,
    l.product_language
FROM listings l
         JOIN products p
              ON p.id = l.product_id
         JOIN suppliers s
              ON s.user_id = l.supplier_id
         JOIN users u
              ON u.id = s.user_id
WHERE l.available_quantity > 0
ORDER BY p.name ASC, s.store_name ASC;

-- =========================================================
-- VIEW 02
-- Tipo exigido: 1 JOIN + SUBCONSULTA
-- Objetivo:
-- Listar fornecedores com comissão acima da média,
-- junto com a quantidade de produtos que anunciam.
-- Justificativa:
-- Útil para gestão financeira da plataforma: identifica
-- fornecedores mais rentáveis. A subconsulta calcula a
-- média dinamicamente e o índice idx_suppliers_name
-- otimiza ordenações e buscas por loja.
-- =========================================================
CREATE VIEW vw_above_avg_commission_suppliers AS
SELECT
    s.user_id         AS supplier_id,
    s.store_name,
    s.contact_email,
    s.commission_rate,
    COUNT(DISTINCT l.product_id) AS total_products_listed
FROM suppliers s
         JOIN listings l
              ON l.supplier_id = s.user_id
WHERE s.commission_rate > (
    SELECT AVG(commission_rate)
    FROM suppliers
)
GROUP BY s.user_id, s.store_name, s.contact_email, s.commission_rate
ORDER BY s.store_name ASC;