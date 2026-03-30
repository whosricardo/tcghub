O **TCGHub** é uma plataforma de marketplace voltada para o universo do Trading Card Game (TCG) permite que usuários comprem e vendam cartas colecionáveis. 
O objetivo da plataforma é centralizar ofertas de diferentes vendedores, permitindo que compradores encontrem diversas opções do mesmo produto e escolham o melhor preço sem sair do site.

O projeto foi desenvolvido para disciplina de Banco de Dados da CESAR School, ministrada pela professora Natacha Targino

---
## Banco de Dados
<details>
<summary><strong>Modelo Conceitual</strong></summary>
<br>

<div align="center">
  
  <img src="images_readme/ModeloConceitual.png" width="700" alt="Modelo Conceitual">
  <br>
  
  <br> 
  </div>
</details>

<details>
<summary><strong>Modelo Lógico</strong></summary> 
<br>
  
<div align="center">
  
  <img src="images_readme/ModeloLogico.png" width="700" alt="Modelo Lógico">
  <br>
  
  <br> 
  </div>
  </details>

#### Esquema Relacional

🔗   - [Documento Esquema Relacional - TCGHub](https://docs.google.com/document/d/1me9ABYs-yamXbWwz0Uigysa_Rj87qARYEbEB8NiINfI/edit?usp=sharing)

## Instruções de Uso
<details> 
<summary><strong>Como rodar o backend e banco de dados</strong></summary>
<br>
O projeto pode ser executado com Docker, subindo o backend Spring Boot e o MySQL juntos.

#### Pré-requisitos

- Docker instalado
- Docker Compose disponível
- Git

#### Subindo o projeto

Na raiz do backend, execute:

```bash
docker compose up --build
```

Esse comando irá:

- subir o container do MySQL
- subir o container do backend
- expor o backend na porta `8080`
- expor o MySQL na porta `3307`

#### Acessos

Depois de subir os containers:

- Backend: `http://localhost:8080`
- Swagger: `http://localhost:8080/swagger-ui/index.html`
- MySQL: `localhost:3307`

#### Parando o projeto

Para parar os containers sem removê-los:

```bash
docker compose stop
```

Para parar e remover os containers:

```bash
docker compose down
```

Para parar, remover os containers e apagar o volume do banco:

```bash
docker compose down -v
```

#### Quando usar `down -v`

Use `docker compose down -v` quando houver mudanças no banco, por exemplo:

- alteração no `schema.sql`
- alteração no `data.sql`
- necessidade de recriar o banco do zero

Depois disso, suba novamente com:

```bash
docker compose up --build
```

#### Estrutura dos arquivos SQL

- `schema.sql`: responsável pela criação da estrutura do banco
- `data.sql`: responsável pela inserção dos dados iniciais

Na inicialização do projeto, o Spring executa primeiro o `schema.sql` e depois o `data.sql`.

</details>

<details> 
<summary><strong>Como preparar para o front</strong></summary>
<br>

#### 1. Instalar Node.js (LTS)
Baixe em: https://nodejs.org/en/download

> Recomendado usar a versão LTS mais recente (ex: 20.x)

#### 2. Verificar instalação
```bash
node -v
npm -v
```

#### 3. Instalar pnpm
```bash
npm install -g pnpm
```

#### 4. Instalar dependências
```bash
cd frontend
pnpm install
```

#### 5. Rodar Projeto
```bash
pnpm dev
```
</details>

## 👥 Equipe
#### Desenvolvedores
* [Amanda Luz](https://github.com/amandaaluzc) - alc2@cesar.school
* [Lucas Menezes](https://github.com/Lucasmenezes08) - lms4@cesar.school
* [Ricardo Sérgio Freitas](https://github.com/whosricardo) - rspff@cesar.school
* [Thiago Fernandes](https://github.com/ThIagoMedeiros21) - tfm3@cesar.school

#### Orientadora
* Natcha Targino

---
