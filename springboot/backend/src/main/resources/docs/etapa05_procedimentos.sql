-- =========================================================
-- PROCEDIMENTO 01
-- Tipo: ATUALIZAÇÃO DE DADOS
-- Nome: sp_cancel_order_and_restore_stock
-- Objetivo:
-- Cancela um pedido e devolve a quantidade de cada item
-- ao estoque do listing correspondente. Valida se o pedido
-- existe e se ainda pode ser cancelado.
-- Justificativa:
-- Encapsula uma operação crítica de negócio que envolve
-- múltiplas tabelas (orders, order_items, listings),
-- garantindo atomicidade e consistência dos dados.
-- Integrável via POST /orders/{id}/cancel no backend.
-- =========================================================

DELIMITER $$

CREATE PROCEDURE sp_cancel_order_and_restore_stock(
    IN p_order_id BIGINT
)
BEGIN
    DECLARE v_status VARCHAR(50);

SELECT status INTO v_status
FROM orders
WHERE id = p_order_id;

IF v_status IS NULL THEN
        SIGNAL SQLSTATE '45000'
            SET MESSAGE_TEXT = 'Pedido não encontrado.';
END IF;

    IF v_status IN ('CANCELLED', 'DELIVERED') THEN
        SIGNAL SQLSTATE '45000'
            SET MESSAGE_TEXT = 'Pedido não pode ser cancelado neste status.';
END IF;

UPDATE listings l
    INNER JOIN order_items oi ON oi.listing_id = l.id
    SET l.available_quantity = l.available_quantity + oi.quantity_bought
WHERE oi.order_id = p_order_id;

UPDATE orders
SET status = 'CANCELLED'
WHERE id = p_order_id;

UPDATE payments
SET status = 'REJECTED'
WHERE order_id = p_order_id
  AND status = 'PENDING';

UPDATE shipments
SET delivery_status = 'CANCELLED'
WHERE order_id = p_order_id
  AND delivery_status NOT IN ('DELIVERED');
END$$

DELIMITER ;




-- =========================================================
-- PROCEDIMENTO 02
-- Tipo: CURSOR
-- Nome: sp_generate_supplier_sales_report
-- Objetivo:
-- Percorre todos os fornecedores com cursor e calcula,
-- para cada um dentro do intervalo de datas informado,
-- o total de pedidos atendidos, itens vendidos e
-- faturamento. Grava os resultados em supplier_sales_snapshot.
-- Justificativa:
-- O uso de cursor é necessário pois para cada fornecedor
-- são aplicadas regras individuais de agregação e inserção
-- condicional na tabela de snapshot, o que não pode ser
-- feito com um único INSERT...SELECT sem perder a
-- capacidade de processar e registrar cada fornecedor
-- individualmente.
-- =========================================================

DELIMITER $$

CREATE PROCEDURE sp_generate_supplier_sales_report(
    IN p_start_date DATE,
    IN p_end_date   DATE
)
BEGIN
    DECLARE v_supplier_id  BIGINT;
    DECLARE v_store_name   VARCHAR(255);
    DECLARE v_total_orders INT;
    DECLARE v_total_items  INT;
    DECLARE v_total_rev    DECIMAL(10, 2);
    DECLARE v_done         INT DEFAULT FALSE;

    DECLARE cur CURSOR FOR
SELECT user_id, store_name
FROM suppliers;

DECLARE CONTINUE HANDLER FOR NOT FOUND SET v_done = TRUE;

OPEN cur;

loop_suppliers: LOOP
        FETCH cur INTO v_supplier_id, v_store_name;
        IF v_done THEN
            LEAVE loop_suppliers;
END IF;

SELECT COUNT(DISTINCT o.id)
INTO v_total_orders
FROM orders o
         INNER JOIN order_items oi ON oi.order_id = o.id
         INNER JOIN listings l ON l.id = oi.listing_id
WHERE l.supplier_id = v_supplier_id
  AND DATE(o.created_at) BETWEEN p_start_date AND p_end_date;

SELECT IFNULL(SUM(oi.quantity_bought), 0)
INTO v_total_items
FROM order_items oi
         INNER JOIN listings l ON l.id = oi.listing_id
         INNER JOIN orders o ON o.id = oi.order_id
WHERE l.supplier_id = v_supplier_id
  AND DATE(o.created_at) BETWEEN p_start_date AND p_end_date;

SELECT IFNULL(SUM(oi.quantity_bought * oi.unit_price_paid), 0.00)
INTO v_total_rev
FROM order_items oi
         INNER JOIN listings l ON l.id = oi.listing_id
         INNER JOIN orders o ON o.id = oi.order_id
WHERE l.supplier_id = v_supplier_id
  AND DATE(o.created_at) BETWEEN p_start_date AND p_end_date;

INSERT INTO supplier_sales_snapshot
(supplier_id, store_name, total_orders, total_items_sold, total_revenue, period_start, period_end)
VALUES
    (v_supplier_id, v_store_name, v_total_orders, v_total_items, v_total_rev, p_start_date, p_end_date);

END LOOP;

CLOSE cur;
END$$

DELIMITER ;
