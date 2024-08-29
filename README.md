# CRUD Estudantes

## Sobre

Esse é um projeto simples feito para treinar as operações CRUD e aprimorar habilidades com Vue.js, Docker e Node.js. O sistema permite realizar as quatro operações básicas em uma lista de estudantes, incluindo adicionar, listar, editar e deletar informações de estudantes.

## Tecnologias Utilizadas

- **Vue.js**: Framework para construção da interface do usuário.
- **Node.js**: Ambiente de execução para o backend.
- **Express**: Framework para o servidor Node.js.
- **Axios**: Biblioteca para fazer requisições HTTP.
- **PostgreSQL**: Banco de dados relacional.
- **Docker**: Containerização e gerenciamento dos serviços.
- **Bootstrap**: Framework CSS para estilização e design responsivo.

## Rodando o Projeto

### Pré-requisitos

Certifique-se de ter as seguintes ferramentas instaladas:
- [Node.js](https://nodejs.org/) (recomendado versão LTS)
- [Docker](https://www.docker.com/products/docker-desktop)

### Configuração do Projeto

1. **Clone o repositório:**

    ```bash
    git clone https://github.com/rickreisme/CrudEstudantes
    cd CrudEstudantes
    ```

2. **Crie um arquivo `.env` na raiz do diretório `backend` e defina a variável `DB_PASSWORD`:**

    ```env
    DB_PASSWORD=sua_senha_do_banco_de_dados
    ```

3. **Inicie todos os serviços com Docker:**

    ```bash
    docker-compose up
    ```

   Isso iniciará tanto o backend quanto o frontend, além do banco de dados, usando o Docker.

### Desenvolvimento Frontend

Se você precisar rodar o frontend separadamente em um ambiente de desenvolvimento, siga estes passos:

1. **Instale as dependências do frontend:**

    ```bash
    cd frontend
    npm install
    ```

2. **Inicie o servidor de desenvolvimento do frontend:**

    ```bash
    npm run dev
    ```

   **Nota:** Se você estiver usando Docker para rodar todos os serviços, não é necessário rodar o frontend separadamente.

### Testando o Projeto

Após iniciar os serviços com Docker, você pode acessar o frontend no navegador através do endereço [http://localhost:8080](http://localhost:8080). O backend estará disponível em [http://localhost:3000](http://localhost:3000).

### Scripts

- **Frontend:**
  - `npm run dev` - Inicia o servidor de desenvolvimento do Vue.js.

- **Backend:**
  - `npm start` - Inicia o servidor Express.


---

Para mais informações, consulte a documentação do Vue.js, Node.js, e Docker, conforme necessário.
