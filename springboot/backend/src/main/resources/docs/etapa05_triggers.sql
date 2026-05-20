-- =========================================================
-- TRIGGER 01
-- Tipo: CONTROLE DE ESTOQUE
-- Nome: trg_decrement_stock
-- Evento: AFTER INSERT ON order_items
-- Objetivo:
-- Ao inserir um item em um pedido, decrementa automaticamente
-- a quantidade disponível no listing correspondente.
-- Justificativa:
-- Mantém o estoque sempre consistente com os pedidos
-- realizados, sem depender de lógica manual na aplicação.
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