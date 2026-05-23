-- =========================================================
-- TRIGGER 01
-- Tipo: ATUALIZAÇÃO DE LOG
-- Nome: trg_log_payment_status_update
-- Evento: AFTER UPDATE ON payments
-- Objetivo:
-- Registra automaticamente em payment_logs toda alteração
-- de status de um pagamento, guardando o status anterior,
-- o novo status, o pedido relacionado e o momento da mudança.
-- Justificativa:
-- Garante rastreabilidade completa do ciclo de vida dos
-- pagamentos sem depender de chamadas explícitas no backend,
-- sendo facilmente demonstrável via PATCH /payments/{id}.
-- =========================================================

DELIMITER $$

CREATE TRIGGER trg_log_payment_status_update
    AFTER UPDATE ON payments
    FOR EACH ROW
BEGIN
    IF OLD.status <> NEW.status THEN
        INSERT INTO payment_logs (payment_id, order_id, old_status, new_status, changed_at)
        VALUES (OLD.id, OLD.order_id, OLD.status, NEW.status, NOW());
END IF;
END$$

DELIMITER ;


-- =========================================================
-- TRIGGER 02
-- Tipo: CONTROLE DE ESTOQUE
-- Nome: trg_decrement_stock
-- Evento: AFTER INSERT ON order_items
-- Objetivo:
-- Ao inserir um item em um pedido, decrementa automaticamente
-- a quantidade disponível no listing correspondente.
-- Justificativa:
-- Mantém o estoque sempre consistente com os pedidos
-- realizados, sem depender de lógica manual na aplicação,
-- evitando overselling no marketplace.
-- =========================================================

DELIMITER $$

CREATE TRIGGER trg_decrement_stock
    AFTER INSERT ON order_items
    FOR EACH ROW
BEGIN
    UPDATE listings
    SET available_quantity = available_quantity - NEW.quantity_bought
    WHERE id = NEW.listing_id;
    END$$

    DELIMITER ;