# 🎮 Pokédex Explorer & Team Builder — Etapa 02

## 👨‍💻 Autor

**Rafael Augusto Santana Gil**

**Matrícula / RA:** 22508717

---

## 🛠️ APIs e Tecnologias Utilizadas

- **[PokeAPI](https://pokeapi.co/docs/v2)** — API utilizada para consultar informações dos Pokémon.
  - **Endpoint:** `https://pokeapi.co/api/v2/pokemon/{termo}`
- **[Supabase](https://supabase.com/)** — Banco de dados PostgreSQL na nuvem para persistência dos Pokémon favoritos.

---

## 📂 Estrutura de Arquivos do Repositório

```text
bootcamp_02/
├── .dockerignore       # Arquivos ignorados durante o build Docker
├── Dockerfile          # Instruções para construir a imagem Nginx Alpine
├── docker-compose.yml  # Configuração do Docker Compose
├── index.html          # Interface principal da Pokédex
├── style.css           # Estilização responsiva em Dark Mode
├── script.js           # PokeAPI, favoritos e integração com Supabase
├── config.js           # Configuração da conexão com o Supabase
└── README.md           # Documentação do projeto
```
---

## 🔗 Links Oficiais da Entrega

### 1. Repositório no GitHub

👉 [Acessar o repositório do projeto](https://github.com/Auggusti0G/bootcamp_02)

### 2. Aplicação publicada no GitHub Pages

👉 [Acessar a Pokédex online](https://auggusti0g.github.io/bootcamp_02/)

### 3. Imagem publicada no Docker Hub

👉 [Acessar o repositório Docker Hub](https://hub.docker.com/r/rafaelaugusto01/bootcamp_02)

---

## 📝 Descrição Geral do Projeto

O **Pokédex Explorer & Team Builder** é uma aplicação web interativa desenvolvida com HTML, CSS e JavaScript Vanilla, que permite pesquisar Pokémon em tempo real por meio da **PokeAPI**.

A aplicação apresenta informações como:

- Nome e número de identificação do Pokémon.
- Artes oficiais e imagens dos Pokémon.
- Tipos elementares.
- Altura e peso.
- Habilidade principal traduzida.
- Sistema de favoritos para montar uma equipe personalizada.

### 🚀 Novidades da Etapa 02

Nesta etapa, a aplicação evoluiu com a implementação de persistência de dados por meio do **Supabase**, utilizando PostgreSQL como banco de dados gerenciado na nuvem.

Agora, o usuário pode favoritar Pokémon clicando na estrela (⭐) presente nos cartões. Os Pokémon selecionados são armazenados no banco de dados e permanecem disponíveis mesmo após o fechamento ou a atualização do navegador.

Além disso, a aplicação foi conteinerizada com Docker e utiliza o Nginx baseado em Alpine Linux como servidor web. A imagem foi publicada no Docker Hub, permitindo que a aplicação seja executada localmente com um único comando.

## 🐳 Execução via Docker

### 4. Comando `docker run` para avaliação

Para executar a aplicação em uma máquina que possua Docker instalado, utilize o seguinte comando no terminal:

```bash
docker run -d -p 8080:80 --name pokedex-app rafaelaugusto01/bootcamp_02:1.0
```

Após a inicialização do contêiner, acesse a aplicação pelo navegador:

👉 [http://localhost:8080/](http://localhost:8080/)

**O que esse comando faz?**

- `-d`: executa o contêiner em segundo plano.
- `-p 8080:80`: mapeia a porta 80 do contêiner para a porta 8080 da máquina.
- `--name pokedex-app`: define o nome do contêiner.
- `rafaelaugusto01/bootcamp_02:1.0`: identifica a imagem e a versão utilizadas.

> **Observação:** se já existir um contêiner chamado `pokedex-app`, será necessário removê-lo ou utilizar outro nome.

---

## 💾 Persistência de Dados — Supabase / PostgreSQL

### 5. Descrição da persistência de dados

Para solucionar o problema da perda dos dados após recarregar a página, a aplicação foi integrada ao **Supabase**, uma plataforma Backend as a Service (BaaS) que disponibiliza um banco de dados PostgreSQL gerenciado na nuvem.

### ⭐ Funcionamento do sistema de favoritos

Ao pesquisar um Pokémon, o usuário pode clicar na estrela (⭐) para adicioná-lo aos favoritos.

Essa ação dispara uma requisição de inserção (`INSERT`) para o banco de dados do Supabase. Os Pokémon salvos podem ser recuperados posteriormente, permitindo a persistência da equipe personalizada.

### Estrutura da tabela `favoritos`

| Coluna      | Tipo               | Descrição                                                     |
| ----------- | ------------------ | ------------------------------------------------------------- |
| `id`        | `int8` / `bigint`  | Chave primária gerada automaticamente por auto incremento.    |
| `criado_em` | `timestamptz`      | Data e hora do registro, com valor padrão `now()`.            |
| `numero`    | `int4` / `integer` | Número oficial do Pokémon na Pokédex, com restrição `UNIQUE`. |
| `nome`      | `text`             | Nome oficial do Pokémon.                                      |
| `imagem`    | `text`             | URL da arte oficial do Pokémon.                               |

A restrição `UNIQUE` na coluna `numero` impede que o mesmo Pokémon seja cadastrado mais de uma vez.

### 🔐 Políticas de acesso — RLS

A tabela utiliza políticas de Row Level Security (RLS) para controlar o acesso aos dados.

As políticas implementadas permitem:

- **SELECT:** leitura pública dos favoritos pela role `anon`.
- **INSERT:** inserção pública de novos favoritos pela role `anon`.
- **DELETE:** exclusão pública de favoritos pela role `anon`.

Essas políticas correspondem à configuração descrita nesta entrega. Como não há autenticação individual dos usuários, o acesso público permite que os visitantes compartilhem a mesma lista de favoritos.

> **Nota de segurança:** em uma aplicação pública, as permissões de inserção e exclusão devem ser avaliadas cuidadosamente. Para listas privadas por usuário, recomenda-se implementar autenticação e políticas RLS que restrinjam as operações ao proprietário dos registros.

### ⚠️ Tratamento de erros

Quando o usuário tenta favoritar um Pokémon que já está cadastrado, o PostgreSQL retorna o código `23505`, correspondente à violação de uma restrição de unicidade.

O frontend trata esse erro e apresenta a mensagem:

> "Este Pokémon já está nos seus favoritos!"

---

## 🎯 Evidências das Sidequests Obrigatórias — SQ1 a SQ4

### ✅ SQ1 — Arquivo `.dockerignore`

Foi criado o arquivo `.dockerignore` na raiz do repositório para excluir arquivos e diretórios desnecessários durante a construção da imagem Docker.

Entre os exemplos estão:

- `.git`
- `.gitignore`
- `README.md`
- Arquivos de rascunho.

**Importância:** a utilização do `.dockerignore` reduz o contexto enviado ao Docker durante o build, evita a inclusão de arquivos desnecessários e pode tornar a construção da imagem mais rápida e eficiente.

### ✅ SQ2 — Versionamento de imagem Docker

Foram publicadas versões identificadas da aplicação no Docker Hub:

- **Tag `1.0`:** primeira versão estável e funcional.
- **Tag `1.1`:** versão com melhorias e correções de layout.
- **Tag `latest`:** referência à versão mais recente publicada, conforme a configuração do repositório.

O versionamento permite identificar e executar versões específicas da aplicação.

### ✅ SQ3 — Descrição no Docker Hub

O campo Overview do repositório Docker Hub foi preenchido com informações sobre a aplicação, incluindo:

- Descrição do projeto.
- Instruções de execução.
- Comando `docker run` pronto para utilização.
- Link para o repositório do GitHub.

Essa documentação facilita a utilização e a avaliação do projeto por outras pessoas.

### ✅ SQ4 — Explorando a orquestração e o Kubernetes

Para demonstrar a execução simultânea de múltiplos contêineres, foram utilizados dois contêineres da aplicação, mapeados para portas diferentes da máquina local.

#### Container 1 — Porta 8080

```bash
docker run -d -p 8080:80 --name pokedex-app-1 rafaelaugusto01/bootcamp_02:1.0
```

Acesso: [http://localhost:8080/](http://localhost:8080/)

#### Container 2 — Porta 8081

```bash
docker run -d -p 8081:80 --name pokedex-app-2 rafaelaugusto01/bootcamp_02:1.0
```

Acesso: [http://localhost:8081/](http://localhost:8081/)

#### Verificação dos contêineres

Para verificar os contêineres em execução, utilize:

```bash
docker ps
```

A evidência da execução simultânea dos dois contêineres foi registrada por meio de uma captura de tela e enviada à raiz do repositório no GitHub.

### 💬 Reflexão: como gerenciaríamos 100 contêineres?

Se fosse necessário gerenciar 100 contêineres simultaneamente em um ambiente de produção, a administração manual de cada instância por meio de comandos individuais do Docker seria pouco eficiente.

Nesse cenário, poderíamos utilizar uma ferramenta de orquestração, como o **Kubernetes (K8s)**.

O Kubernetes permite organizar os recursos de infraestrutura em um cluster e executar aplicações em Pods, que representam a menor unidade implantável da plataforma.

Por meio de objetos como `Deployment` e `ReplicaSet`, é possível declarar a quantidade desejada de réplicas e manter o estado da aplicação de acordo com essa configuração.

Caso uma instância apresente falhas, o Kubernetes pode recriar os Pods necessários para restabelecer o estado desejado. Também é possível distribuir o tráfego entre as instâncias utilizando Services e, quando necessário, recursos de balanceamento de carga.

Dessa forma, o Kubernetes facilita a escalabilidade, a recuperação automática de falhas e a administração de múltiplas instâncias da aplicação.

## 🚀 Como Executar Localmente

### Opção A — Docker Compose

Na raiz do repositório clonado, execute:

```bash
docker compose up -d
```

Depois, acesse:

👉 [http://localhost:8080/](http://localhost:8080/)

Para interromper os serviços, execute:

```bash
docker compose down
```

### Opção B — Executar dois contêineres simultaneamente

Para reproduzir a demonstração da SQ4, execute:

```bash
# Primeiro contêiner — porta 8080
docker run -d -p 8080:80 --name pokedex-app-1 rafaelaugusto01/bootcamp_02:1.0

# Segundo contêiner — porta 8081
docker run -d -p 8081:80 --name pokedex-app-2 rafaelaugusto01/bootcamp_02:1.0
```

Acesse as instâncias:

- [Container 1 — localhost:8080](http://localhost:8080/)
- [Container 2 — localhost:8081](http://localhost:8081/)

Para conferir se ambos estão em execução:

```bash
docker ps
```

### Opção C — Execução direta no navegador, sem Docker

1. Clone o repositório:

   ```bash
   git clone https://github.com/Auggusti0G/bootcamp_02.git
   ```

2. Entre na pasta do projeto:

   ```bash
   cd bootcamp_02
   ```

3. Abra o arquivo `index.html` no navegador.

> **Observação:** para que a integração com o Supabase funcione corretamente, o arquivo `config.js` precisa estar configurado com os dados públicos de conexão do projeto. Dependendo da configuração do navegador e dos módulos utilizados, pode ser necessário executar a aplicação por meio de um servidor HTTP local.

---

## 📌 Considerações Finais

O **Pokédex Explorer & Team Builder — Etapa 02** demonstra a integração entre desenvolvimento frontend, consumo de APIs externas, persistência de dados em PostgreSQL, conteinerização com Docker e publicação de imagens no Docker Hub.

A implementação permite pesquisar Pokémon, visualizar suas características e manter uma lista de favoritos persistente. Além disso, as atividades de versionamento, documentação e execução simultânea de contêineres demonstram conceitos importantes para a implantação e a manutenção de aplicações web.

O projeto também estabelece uma base para evoluções futuras, como autenticação de usuários, equipes privadas, filtros avançados e implantação orquestrada com Kubernetes.

TA VENDO ESSA FORMATAÇÃO ABAIXO EM # \* COM ESSE TIPO DE SIMBOLO ???? PRECISO QUE VC ME MANDE O REDME QUE ESCREVI PRIMEIRO NESSA CONFIGURAÇÃO OUVIU FAÇA CERTO ESSA MERDA 

