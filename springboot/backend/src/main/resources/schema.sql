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

CREATE TABLE IF NOT EXISTS cards (
    id BIGINT PRIMARY KEY AUTO_INCREMENT NOT NULL,
    nome_produto VARCHAR(255) NOT NULL,
    colecao VARCHAR(50) NOT NULL,
    numero_carta VARCHAR(20) NOT NULL UNIQUE,
    raridade VARCHAR(10) NOT NULL,
    tratamento VARCHAR(50) NOT NULL,
    tipo_carta VARCHAR(50) NOT NULL,
    custo INT,
    poder INT,
    counter INT,
    atributo_combate VARCHAR(50),
    cores VARCHAR(255) NOT NULL, -- Infelizmente por enquanto vai ser uma string ("vermelho, azul") - teria que ser uma tabela a parte
    subtipos VARCHAR(255) -- Mesma questão acima
);
