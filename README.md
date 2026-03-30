# TCGHub

O **TCGHub** é uma plataforma de marketplace voltada ao universo de **Trading Card Games (TCG)**, desenvolvida com o objetivo de centralizar anúncios de cartas colecionáveis em um único ambiente digital.

A proposta do sistema é permitir que diferentes vendedores disponibilizem seus produtos em uma mesma plataforma, enquanto compradores podem comparar ofertas, verificar disponibilidade e escolher a melhor opção de compra sem precisar navegar por múltiplos sites.

Este projeto foi desenvolvido no contexto da disciplina de **Banco de Dados** da **CESAR School**, ministrada pela professora **Natacha Targino**.

---

## Sumário

- [Visão Geral](#visão-geral)
- [Banco de Dados](#banco-de-dados)
- [Instruções de Uso](#instruções-de-uso)
  - [Como rodar o backend e o banco de dados](#como-rodar-o-backend-e-o-banco-de-dados)
  - [Autenticação e proteção de rotas](#autenticação-e-proteção-de-rotas)
  - [Documentação da API](#documentação-da-api)
  - [Como preparar o front-end](#como-preparar-o-front-end)
- [Equipe](#equipe)

---

## Visão Geral

O sistema foi projetado para atender às principais necessidades de um marketplace de cartas colecionáveis, reunindo em uma única aplicação funcionalidades relacionadas a cadastro, autenticação, consulta e gerenciamento de ofertas.

### Objetivos da plataforma

- Centralizar anúncios de cartas de TCG em um único ambiente
- Facilitar a comparação de preços entre diferentes vendedores
- Organizar informações de produtos e ofertas de forma estruturada
- Disponibilizar uma base sólida para integração entre back-end, banco de dados e front-end

---

## Banco de Dados

### Modelagem Conceitual

<div align="center">
  <img src="images_readme/ModeloConceitual.png" width="700" alt="Modelo Conceitual do Banco de Dados">
</div>

### Modelagem Lógica

<div align="center">
  <img src="images_readme/ModeloLogico.png" width="700" alt="Modelo Lógico do Banco de Dados">
</div>

### Esquema Relacional

🔗 [Documento Esquema Relacional - TCGHub](https://docs.google.com/document/d/1me9ABYs-yamXbWwz0Uigysa_Rj87qARYEbEB8NiINfI/edit?usp=sharing)

---

## Instruções de Uso

## Como rodar o backend e o banco de dados

O projeto pode ser executado com **Docker**, permitindo subir o back-end em **Spring Boot** e o banco de dados **MySQL** de forma integrada.

### Pré-requisitos

Antes de iniciar, verifique se os seguintes itens estão instalados em sua máquina:

- Docker
- Docker Compose
- Git

### Execução do projeto

Na raiz do back-end, execute o comando abaixo:

```bash
docker compose up --build
```

Esse processo irá:

- construir as imagens necessárias
- subir o container do banco de dados MySQL
- subir o container da aplicação back-end
- expor o back-end na porta `8080`
- expor o banco MySQL na porta `3307`

### Endereços de acesso

Após a inicialização dos containers, os seguintes serviços estarão disponíveis:

- **Back-end:** `http://localhost:8080`
- **Documentação da API (Swagger):** `http://localhost:8080/swagger-ui.html`
- **MySQL:** `localhost:3307`

### Como parar a execução

Para interromper os containers sem removê-los:

```bash
docker compose stop
```

Para interromper e remover os containers:

```bash
docker compose down
```

Para interromper, remover os containers e excluir também o volume do banco de dados:

```bash
docker compose down -v
```

### Quando utilizar `docker compose down -v`

Esse comando é indicado quando for necessário recriar completamente o ambiente do banco, especialmente em situações como:

- alteração no arquivo `schema.sql`
- alteração no arquivo `data.sql`
- reinicialização completa da base de dados

Após a remoção dos volumes, utilize novamente:

```bash
docker compose up --build
```

### Estrutura dos arquivos SQL

A inicialização do banco segue a seguinte organização:

- `schema.sql`: responsável pela criação da estrutura do banco de dados
- `data.sql`: responsável pela inserção dos dados iniciais

Durante a execução da aplicação, o Spring Boot processa primeiro o `schema.sql` e, em seguida, o `data.sql`.

---

## Autenticação e proteção de rotas

A API utiliza autenticação baseada em **JWT (JSON Web Token)**.

Isso significa que parte dos endpoints está disponível publicamente, enquanto as demais rotas exigem um token JWT válido enviado no cabeçalho da requisição.

### Rotas públicas

As rotas abaixo podem ser acessadas sem autenticação:

- `/auth/register`
- `/auth/login`
- `/auth/refresh`
- `/auth/logout`
- `/h2-console/**`
- `/swagger-ui.html`
- `/swagger-ui/**`
- `/v3/api-docs`
- `/v3/api-docs/**`

### Rotas protegidas

Toda rota que não esteja listada na seção anterior é considerada **protegida** e exige autenticação.

Para consumi-la, é necessário enviar o token JWT no cabeçalho da requisição no seguinte formato:

```http
Authorization: Bearer SEU_TOKEN_JWT
```

### Exemplo de uso

```http
GET /alguma-rota-protegida
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

### Fluxo básico de autenticação

1. O usuário realiza login por meio da rota `/auth/login`
2. A API retorna um token JWT válido
3. Esse token deve ser incluído no cabeçalho `Authorization` das requisições subsequentes
4. Sem o token, o acesso às rotas protegidas será negado

---

## Documentação da API

A aplicação disponibiliza documentação interativa da API por meio do **Swagger**.

Para consultar os endpoints disponíveis, seus parâmetros, respostas e testar requisições diretamente pelo navegador, acesse:

```text
http://localhost:8080/swagger-ui.html
```

Essa interface é a principal referência para visualização e validação dos recursos expostos pela API durante o desenvolvimento.

---

## Como preparar o front-end

Para execução do front-end localmente, siga os passos abaixo.

### 1. Instalar o Node.js (versão LTS)

Download: https://nodejs.org/en/download

> Recomenda-se a utilização da versão LTS mais recente, como a 20.x.

### 2. Verificar a instalação

```bash
node -v
npm -v
```

### 3. Instalar o pnpm

```bash
npm install -g pnpm
```

### 4. Instalar as dependências do front-end

```bash
cd frontend
pnpm install
```

### 5. Executar o front-end

```bash
pnpm dev
```

---

## Equipe

### Desenvolvedores

- [Amanda Luz](https://github.com/amandaaluzc) — alc2@cesar.school
- [Lucas Menezes](https://github.com/Lucasmenezes08) — lms4@cesar.school
- [Ricardo Sérgio Freitas](https://github.com/whosricardo) — rspff@cesar.school
- [Thiago Fernandes](https://github.com/ThIagoMedeiros21) — tfm3@cesar.school

### Orientadora

- Natacha Targino
