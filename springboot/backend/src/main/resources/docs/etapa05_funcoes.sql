-- =========================================================
-- FUNÇÃO 01
-- Tipo: FUNÇÃO MATEMÁTICA
-- Nome: fn_calculate_order_total
-- Objetivo:
-- Calcula o valor total real de um pedido somando
-- quantity_bought * unit_price_paid de todos os seus itens
-- em order_items.
-- Justificativa:
-- Garante consistência no cálculo do total do pedido,
-- podendo ser usada em consultas, views e no backend
-- via endpoint GET /functions/orders/{id}/total.
-- =========================================================

DELIMITER $$

CREATE FUNCTION fn_calculate_order_total(p_order_id BIGINT)
    RETURNS DECIMAL(10, 2)
    READS SQL DATA
BEGIN
    DECLARE v_total DECIMAL(10, 2);

SELECT SUM(quantity_bought * unit_price_paid)
INTO v_total
FROM order_items
WHERE order_id = p_order_id;

RETURN IFNULL(v_total, 0.00);
END$$

DELIMITER ;

-- =========================================================
-- FUNÇÃO 02
-- Tipo: FUNÇÃO COM ESTRUTURA CONDICIONAL
-- Nome: fn_can_ship_order
-- Objetivo:
-- Verifica se um pedido está apto para envio, checando:
-- se o pedido existe, se não está cancelado, se tem
-- pagamento aprovado e se ainda não possui remessa criada.
-- Justificativa:
-- Centraliza a regra de elegibilidade de envio, podendo
-- ser usada diretamente no ShipmentService e exposta via
-- GET /functions/orders/{id}/shipping-eligibility.
-- =========================================================

DELIMITER $$

CREATE FUNCTION fn_can_ship_order(p_order_id BIGINT)
    RETURNS VARCHAR(30)
    READS SQL DATA
BEGIN
    DECLARE v_status       VARCHAR(50);
    DECLARE v_pay_approved INT DEFAULT 0;
    DECLARE v_has_shipment INT DEFAULT 0;

SELECT status INTO v_status
FROM orders
WHERE id = p_order_id;

IF v_status IS NULL THEN
        RETURN 'ORDER_NOT_FOUND';
END IF;

    IF v_status = 'CANCELLED' THEN
        RETURN 'ORDER_CANCELLED';
END IF;

SELECT COUNT(*) INTO v_pay_approved
FROM payments
WHERE order_id = p_order_id
  AND status = 'APPROVED';

IF v_pay_approved = 0 THEN
        RETURN 'PAYMENT_PENDING';
END IF;

SELECT COUNT(*) INTO v_has_shipment
FROM shipments
WHERE order_id = p_order_id;

IF v_has_shipment > 0 THEN
        RETURN 'SHIPMENT_ALREADY_EXISTS';
END IF;

RETURN 'CAN_SHIP';
END$$

DELIMITER ;