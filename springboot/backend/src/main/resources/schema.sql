CREATE TABLE IF NOT EXISTS users (
    id BIGINT PRIMARY KEY AUTO_INCREMENT NOT NULL,
    username VARCHAR(255) NOT NULL UNIQUE,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS refresh_tokens (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    token VARCHAR(255) NOT NULL UNIQUE,
    email VARCHAR(255) NOT NULL,
    expiry DATETIME NOT NULL,
    revoked BOOLEAN DEFAULT FALSE
);

CREATE TABLE IF NOT EXISTS products (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    collection VARCHAR(50) NOT NULL
);

CREATE TABLE IF NOT EXISTS single_cards (
     product_id BIGINT PRIMARY KEY,
     card_number VARCHAR(20) NOT NULL UNIQUE,
     rarity VARCHAR(10) NOT NULL,
     treatment VARCHAR(50) NOT NULL,
     card_type VARCHAR(50) NOT NULL,
     cost INT,
     power INT,
     counter INT,
     combat_attribute VARCHAR(50),
     description VARCHAR(255),
     CONSTRAINT fk_single_cards_product
         FOREIGN KEY (product_id)
         REFERENCES products(id)
         ON UPDATE CASCADE
         ON DELETE CASCADE,
     CONSTRAINT chk_single_cards_cost
         CHECK (cost IS NULL OR cost >= 0),
     CONSTRAINT chk_single_cards_power
         CHECK (power IS NULL OR power >= 0),
     CONSTRAINT chk_single_cards_counter
         CHECK (counter IS NULL OR counter >= 0)
);

CREATE TABLE IF NOT EXISTS sealed_products (
    product_id BIGINT PRIMARY KEY,
    sealed_type VARCHAR(50) NOT NULL,
    description VARCHAR(255),
    CONSTRAINT fk_sealed_products_product
    FOREIGN KEY (product_id)
    REFERENCES products(id)
    ON UPDATE CASCADE
    ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS colors (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(50) NOT NULL UNIQUE
);

CREATE TABLE IF NOT EXISTS subtypes (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL UNIQUE
);

CREATE TABLE IF NOT EXISTS single_card_colors (
    product_id BIGINT NOT NULL,
    color_id BIGINT NOT NULL,
    PRIMARY KEY (product_id, color_id),
    CONSTRAINT fk_single_card_colors_card
        FOREIGN KEY (product_id)
        REFERENCES single_cards(product_id)
        ON UPDATE CASCADE
        ON DELETE CASCADE,
    CONSTRAINT fk_single_card_colors_color
        FOREIGN KEY (color_id)
        REFERENCES colors(id)
        ON UPDATE CASCADE
        ON DELETE CASCADE
);