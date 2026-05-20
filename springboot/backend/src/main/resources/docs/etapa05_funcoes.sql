-- =========================================================
-- FUNÇÃO 01
-- Tipo: FUNÇÃO MATEMÁTICA
-- Nome: calcular_receita_supplier
-- Objetivo:
-- Calcula o valor líquido que o supplier recebe após o
-- desconto da taxa de comissão da plataforma.
-- Justificativa:
-- Evita recalcular essa lógica em múltiplas queries e
-- garante consistência nos relatórios financeiros.
-- =========================================================

DELIMITER $$

CREATE FUNCTION calcular_receita_supplier(preco DECIMAL(10,2), taxa_comissao DECIMAL(5,2))
    RETURNS DECIMAL(10,2)
    DETERMINISTIC
BEGIN
RETURN preco * (1 - taxa_comissao / 100);
END$$

DELIMITER ;

SELECT l.id, l.current_price, s.commission_rate,
       calcular_receita_supplier(l.current_price, s.commission_rate) AS receita_liquida
FROM listings l
         JOIN suppliers s ON s.user_id = l.supplier_id;