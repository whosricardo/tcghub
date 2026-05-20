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