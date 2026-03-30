CREATE TABLE IF NOT EXISTS users (
    id BIGINT PRIMARY KEY AUTO_INCREMENT NOT NULL,
    username VARCHAR(255) NOT NULL UNIQUE,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    referred_by_user_id BIGINT NULL,

    CONSTRAINT fk_users_referred_by
        FOREIGN KEY (referred_by_user_id)
        REFERENCES users(id)
        ON UPDATE CASCADE
        ON DELETE SET NULL
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

CREATE TABLE IF NOT EXISTS single_card_subtypes (
    product_id BIGINT NOT NULL,
    subtype_id BIGINT NOT NULL,
    PRIMARY KEY (product_id, subtype_id),
    CONSTRAINT fk_single_card_subtypes_card
        FOREIGN KEY (product_id)
        REFERENCES single_cards(product_id)
        ON UPDATE CASCADE
        ON DELETE CASCADE,
    CONSTRAINT fk_single_card_subtypes_subtype
        FOREIGN KEY (subtype_id)
        REFERENCES subtypes(id)
        ON UPDATE CASCADE
        ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS buyers (
    user_id BIGINT PRIMARY KEY,
    wallet_balance DECIMAL(10, 2) NOT NULL DEFAULT 0.00,
    CONSTRAINT fk_buyers_user
    FOREIGN KEY (user_id)
    REFERENCES users(id)
    ON UPDATE CASCADE
    ON DELETE CASCADE,
    CONSTRAINT chk_buyers_wallet_balance
    CHECK (wallet_balance >= 0)
);

CREATE TABLE IF NOT EXISTS suppliers (
    user_id BIGINT PRIMARY KEY,
    cnpj VARCHAR(18) NOT NULL UNIQUE,
    store_name VARCHAR(255) NOT NULL,
    contact_email VARCHAR(255) NOT NULL UNIQUE,
    commission_rate DECIMAL(5, 2) NOT NULL DEFAULT 0.00,
    CONSTRAINT fk_suppliers_user
    FOREIGN KEY (user_id)
    REFERENCES users(id)
    ON UPDATE CASCADE
    ON DELETE CASCADE,
    CONSTRAINT chk_suppliers_commission_rate
    CHECK (commission_rate >= 0 AND commission_rate <= 100)
);

CREATE TABLE IF NOT EXISTS addresses (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    zip_code VARCHAR(20) NOT NULL,
    street VARCHAR(255) NOT NULL,
    number VARCHAR(20) NOT NULL,
    complement VARCHAR(255),
    neighborhood VARCHAR(100) NOT NULL,
    city VARCHAR(100) NOT NULL,
    state VARCHAR(50) NOT NULL,
    user_id BIGINT NOT NULL,
    CONSTRAINT fk_addresses_user
    FOREIGN KEY (user_id)
    REFERENCES users(id)
    ON UPDATE CASCADE
    ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS phones (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    phone_number VARCHAR(20) NOT NULL,
    user_id BIGINT NOT NULL,
    CONSTRAINT fk_phones_user
    FOREIGN KEY (user_id)
    REFERENCES users(id)
    ON UPDATE CASCADE
    ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS constructed_decks (
    product_id BIGINT PRIMARY KEY,
    includes_don BOOLEAN NOT NULL DEFAULT FALSE,
    card_quantity INT NOT NULL,
    leader_card VARCHAR(255),
    description VARCHAR(255),
    CONSTRAINT fk_constructed_decks_product
    FOREIGN KEY (product_id)
    REFERENCES products(id)
    ON UPDATE CASCADE
    ON DELETE CASCADE,
    CONSTRAINT chk_constructed_decks_quantity
    CHECK (card_quantity >= 0)
);

CREATE TABLE IF NOT EXISTS constructed_deck_colors (
    product_id BIGINT NOT NULL,
    color_id BIGINT NOT NULL,
    PRIMARY KEY (product_id, color_id),
    CONSTRAINT fk_constructed_deck_colors_deck
    FOREIGN KEY (product_id)
    REFERENCES constructed_decks(product_id)
    ON UPDATE CASCADE
    ON DELETE CASCADE,
    CONSTRAINT fk_constructed_deck_colors_color
    FOREIGN KEY (color_id)
    REFERENCES colors(id)
    ON UPDATE CASCADE
    ON DELETE CASCADE
    );

CREATE TABLE IF NOT EXISTS listings (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    available_quantity INT NOT NULL,
    current_price DECIMAL(10, 2) NOT NULL,
    item_condition VARCHAR(50) NOT NULL,
    product_language VARCHAR(50) NOT NULL,
    product_id BIGINT NOT NULL,
    supplier_id BIGINT NOT NULL,
    CONSTRAINT fk_listings_product
    FOREIGN KEY (product_id)
    REFERENCES products(id)
    ON UPDATE CASCADE
    ON DELETE CASCADE,
    CONSTRAINT fk_listings_supplier
    FOREIGN KEY (supplier_id)
    REFERENCES suppliers(user_id)
    ON UPDATE CASCADE
    ON DELETE CASCADE,
    CONSTRAINT chk_listings_available_quantity
    CHECK (available_quantity >= 0),
    CONSTRAINT chk_listings_current_price
    CHECK (current_price >= 0)
);

CREATE TABLE IF NOT EXISTS orders (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    buyer_id BIGINT NOT NULL,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    total_amount DECIMAL(10, 2) NOT NULL,
    status VARCHAR(50) NOT NULL,
    CONSTRAINT fk_orders_buyer
    FOREIGN KEY (buyer_id)
    REFERENCES buyers(user_id)
    ON UPDATE CASCADE
    ON DELETE CASCADE,
    CONSTRAINT chk_orders_total_amount
    CHECK (total_amount >= 0)
    );

CREATE TABLE IF NOT EXISTS shipments (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    tracking_code VARCHAR(100),
    shipping_date DATETIME,
    freight_cost DECIMAL(10, 2) NOT NULL,
    carrier VARCHAR(100) NOT NULL,
    delivery_status VARCHAR(50) NOT NULL,
    estimated_delivery_date DATETIME,
    order_id BIGINT NOT NULL,
    address_id BIGINT,
    CONSTRAINT fk_shipments_order
    FOREIGN KEY (order_id)
    REFERENCES orders(id)
    ON UPDATE CASCADE
    ON DELETE CASCADE,
    CONSTRAINT fk_shipments_address
    FOREIGN KEY (address_id)
    REFERENCES addresses(id)
    ON UPDATE CASCADE
    ON DELETE SET NULL,
    CONSTRAINT chk_shipments_freight_cost
    CHECK (freight_cost >= 0)
);

CREATE TABLE IF NOT EXISTS payments (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    payment_date_time DATETIME NOT NULL,
    payment_method VARCHAR(50) NOT NULL,
    status VARCHAR(50) NOT NULL,
    amount_paid DECIMAL(10, 2) NOT NULL,
    order_id BIGINT NOT NULL,
    CONSTRAINT fk_payments_order
    FOREIGN KEY (order_id)
    REFERENCES orders(id)
    ON UPDATE CASCADE
    ON DELETE CASCADE,
    CONSTRAINT chk_payments_amount_paid
    CHECK (amount_paid >= 0)
    );

CREATE TABLE IF NOT EXISTS payment_installments (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    installment_number INT NOT NULL,
    due_date DATE NOT NULL,
    installment_amount DECIMAL(10, 2) NOT NULL,
    installment_status VARCHAR(50) NOT NULL,
    payment_id BIGINT NOT NULL,
    CONSTRAINT fk_installments_payment
    FOREIGN KEY (payment_id)
    REFERENCES payments(id)
    ON UPDATE CASCADE
    ON DELETE CASCADE,
    CONSTRAINT chk_installments_number
    CHECK (installment_number > 0),
    CONSTRAINT chk_installments_amount
    CHECK (installment_amount >= 0)
);

CREATE TABLE IF NOT EXISTS order_items (
    listing_id BIGINT NOT NULL,
    order_id BIGINT NOT NULL,
    quantity_bought INT NOT NULL,
    unit_price_paid DECIMAL(10, 2) NOT NULL,
    technical_report TEXT,
    inspection_date DATETIME,
    PRIMARY KEY (listing_id, order_id),
    CONSTRAINT fk_order_items_listing
    FOREIGN KEY (listing_id)
    REFERENCES listings(id)
    ON UPDATE CASCADE
    ON DELETE CASCADE,
    CONSTRAINT fk_order_items_order
    FOREIGN KEY (order_id)
    REFERENCES orders(id)
    ON UPDATE CASCADE
    ON DELETE CASCADE,
    CONSTRAINT chk_order_items_quantity
    CHECK (quantity_bought > 0),
    CONSTRAINT chk_order_items_unit_price
    CHECK (unit_price_paid >= 0)
);

