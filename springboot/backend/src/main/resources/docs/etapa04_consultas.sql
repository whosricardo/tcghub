-- =========================================================
-- CONSULTA 01
-- Tipo exigido: JOIN + GROUP BY + HAVING
-- Objetivo:
-- Listar fornecedores com volume relevante de vendas,
-- mostrando quantidade de pedidos atendidos, itens vendidos
-- e faturamento total.
-- Justificativa:
-- É útil para análise de desempenho dos fornecedores no marketplace.
-- =========================================================
SELECT
    s.user_id AS supplier_id,
    u.username AS supplier_name,
    COUNT(DISTINCT oi.order_id) AS total_orders,
    SUM(oi.quantity_bought) AS total_items_sold,
    SUM(oi.quantity_bought * oi.unit_price_paid) AS total_revenue
FROM suppliers s
         JOIN users u
              ON u.id = s.user_id
         JOIN listings l
              ON l.supplier_id = s.user_id
         JOIN order_items oi
              ON oi.listing_id = l.id
GROUP BY s.user_id, u.username
HAVING SUM(oi.quantity_bought) >= 3
ORDER BY total_revenue DESC, total_items_sold DESC;


-- =========================================================
-- CONSULTA 02
-- Tipo exigido: 2 JOINS + WHERE
-- Objetivo:
-- Listar pedidos pendentes com o nome do comprador,
-- data do pedido e valor total.
-- Justificativa:
-- Ajuda a acompanhar pedidos que ainda precisam de atenção
-- no fluxo operacional do sistema.
-- =========================================================
SELECT
    o.id AS order_id,
    u.username AS buyer_name,
    o.created_at,
    o.total_amount,
    o.status
FROM orders o
         JOIN buyers b
              ON b.user_id = o.buyer_id
         JOIN users u
              ON u.id = b.user_id
WHERE o.status = 'PENDING'
ORDER BY o.created_at DESC;


-- =========================================================
-- CONSULTA 03
-- Tipo exigido: ANTI JOIN
-- Objetivo:
-- Listar produtos cadastrados que ainda não possuem anúncio.
-- Justificativa:
-- Permite identificar produtos do catálogo que ainda não
-- estão disponíveis no marketplace.
-- =========================================================
SELECT
    p.id,
    p.name,
    p.collection
FROM products p
         LEFT JOIN listings l
                   ON l.product_id = p.id
WHERE l.id IS NULL
ORDER BY p.id;


-- =========================================================
-- CONSULTA 04
-- Tipo exigido: SUBCONSULTA
-- Objetivo:
-- Listar pedidos cujo valor total está acima da média geral
-- de todos os pedidos cadastrados.
-- Justificativa:
-- Permite destacar pedidos acima da média e apoiar análises
-- de comportamento de compra.
-- =========================================================
SELECT
    o.id AS order_id,
    u.username AS buyer_name,
    o.created_at,
    o.total_amount,
    o.status
FROM orders o
         JOIN users u
              ON u.id = o.buyer_id
WHERE o.total_amount > (
    SELECT AVG(total_amount)
    FROM orders
)
ORDER BY o.total_amount DESC;