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
-- Percorre todos os fornecedores com cursor e, para cada um,
-- calcula métricas de vendas no período informado, classifica
-- seu desempenho individualmente e registra um snapshot com
-- observação semântica.
--
-- Justificativa:
-- O uso de cursor é necessário porque cada fornecedor é
-- processado individualmente com regras condicionais próprias
-- de classificação e observação, além de inserção linha a linha
-- no snapshot. Isso torna a lógica mais do que um simples
-- INSERT...SELECT agregador.
-- =========================================================

DELIMITER $$

DROP PROCEDURE IF EXISTS sp_generate_supplier_sales_report$$

CREATE PROCEDURE sp_generate_supplier_sales_report(
    IN p_start_date DATE,
    IN p_end_date   DATE
)
BEGIN
    DECLARE v_supplier_id        BIGINT;
    DECLARE v_store_name         VARCHAR(255);
    DECLARE v_total_orders       INT DEFAULT 0;
    DECLARE v_total_items        INT DEFAULT 0;
    DECLARE v_total_rev          DECIMAL(10, 2) DEFAULT 0.00;
    DECLARE v_performance_level  VARCHAR(30);
    DECLARE v_observation        VARCHAR(255);
    DECLARE v_done               BOOLEAN DEFAULT FALSE;

    DECLARE cur CURSOR FOR
SELECT user_id, store_name
FROM suppliers
ORDER BY user_id;

DECLARE CONTINUE HANDLER FOR NOT FOUND SET v_done = TRUE;

OPEN cur;

supplier_loop: LOOP
        FETCH cur INTO v_supplier_id, v_store_name;

        IF v_done THEN
            LEAVE supplier_loop;
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

IF v_total_orders = 0 THEN
            SET v_performance_level = 'NO_SALES';
            SET v_observation = 'Fornecedor sem vendas no período informado.';
        ELSEIF v_total_rev >= 1000 THEN
            SET v_performance_level = 'TOP_SELLER';
            SET v_observation = 'Alto faturamento no período.';
        ELSEIF v_total_rev >= 300 THEN
            SET v_performance_level = 'REGULAR';
            SET v_observation = 'Desempenho comercial regular no período.';
ELSE
            SET v_performance_level = 'LOW_VOLUME';
            SET v_observation = 'Baixo volume de vendas no período.';
END IF;

INSERT INTO supplier_sales_snapshot (
    supplier_id,
    store_name,
    total_orders,
    total_items_sold,
    total_revenue,
    period_start,
    period_end,
    performance_level,
    observation
)
VALUES (
           v_supplier_id,
           v_store_name,
           v_total_orders,
           v_total_items,
           v_total_rev,
           p_start_date,
           p_end_date,
           v_performance_level,
           v_observation
       );

END LOOP;

CLOSE cur;
END$$

DELIMITER ;
