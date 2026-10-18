# Pokédex Explorer & Team Builder — Etapa 02

## Autor
**Rafael Augusto Santana Gil**  
**Matrícula / RA:** 22508717

---
## API utilizada
- **PokeAPI:** https://pokeapi.co/docs/v2
- **Endpoint:** `https://pokeapi.co/api/v2/pokemon/{termo}`

## 📝 Descrição Geral do Projeto
O **Pokédex Explorer & Team Builder** é uma aplicação web interativa desenvolvida com HTML, CSS e JavaScript Vanilla que permite pesquisar Pokémon em tempo real via **PokeAPI**, exibindo suas artes oficiais, números de ID, tipos elementares, altura, peso e habilidade principal traduzida.

Nesta **Etapa 02**, a aplicação evoluiu significativamente ao ganhar **persistência de dados em tempo real** através do **Supabase** (PostgreSQL na nuvem). O usuário agora pode salvar seus Pokémon favoritos clicando na **estrela de favoritar (⭐)** presente em cada cartão, montando uma equipe personalizada que permanece salva mesmo após fechar ou recarregar o navegador. 

Além disso, a aplicação foi totalmente conteinerizada com **Docker** servida por um servidor web otimizado **Nginx (Alpine Linux)** e publicada no **Docker Hub**, permitindo que qualquer pessoa no mundo execute o projeto em ambiente local com um único comando.

## 🎯 Evidências das Sidequests Obrigatórias (SQ1 - SQ4)

### [x] SQ1 · `.dockerignore`
Criado o arquivo `.dockerignore` na raiz do repositório para ignorar diretórios e arquivos pesados/desnecessários no momento do build (ex.: `.git`, `README.md`, rascunhos). 
- **Por que é importante:** Impede o envio de arquivos desnecessários ao contexto da imagem Docker, resultando em um build significativamente mais rápido e uma imagem final leve e enxuta.

### [x] SQ2 · Versionamento de Imagem
Publicamos no Docker Hub as versões etiquetadas do projeto:
- Tag `1.0`: Primeira versão estável e funcional da aplicação.
- Tag `1.1`: Versão atualizada com melhorias e correções de layout.
- Tag `latest`: Tag apontando para a build mais recente do repositório.

### [x] SQ3 · Descrição no Docker Hub
O Overview do repositório no Docker Hub foi preenchido com a descrição detalhada da aplicação, instruções de uso, o comando `docker run` pronto para copiar e o link direto para este repositório do GitHub.

### [x] SQ4 · Explorando a Orquestração e Kubernetes
Para testar a orquestração e execução de múltiplos ambientes em paralelo, rodamos dois containers simultâneos da aplicação em portas distintas na mesma máquina:
- **Container 1:** Mapeado na porta `8080` (`http://localhost:8080/`)
- **Container 2:** Mapeado na porta `8081` (`http://localhost:8081/`)
---

## 🔗 Links Oficiais da Entrega.

1. **Repositório no GitHub:**  
   👉 [https://github.com/Auggusti0G/bootcamp_02](https://github.com/Auggusti0G/bootcamp_02)

2. **Aplicação no Ar (GitHub Pages):**  
   👉 [https://auggusti0g.github.io/bootcamp_02/](https://auggusti0g.github.io/bootcamp_02/)

3. **Repositório de Imagens no Docker Hub:**  
   👉 [https://hub.docker.com/r/Auggusti0G/bootcamp_02](https://hub.docker.com/r/Auggusti0G/bootcamp_02)


bootcamp_02/
├── .dockerignore       # Arquivos ignorados no contexto do build Docker
├── Dockerfile          # Instruções da imagem Nginx Alpine
├── docker-compose.yml  # Configuração do Docker Compose para dev local
├── index.html          # Interface HTML principal da Pokédex
├── style.css           # Estilização completa responsiva em Dark Mode
├── script.js           # Lógica do frontend, PokeAPI, favoritos (⭐) e Supabase
├── config.js           # Credenciais públicas (URL e Anon Key) do Supabase
└── README.md           # Documentação completa para entrega do projeto

---

## 🐳 Execução via Docker (Comando Próprio para Avaliação)

Para testar a aplicação em uma máquina limpa diretamente a partir da imagem pública hospedada no Docker Hub, basta executar o seguinte comando no terminal:

```bash
docker run -d -p 8080:80 --name pokedex-app Auggusti0G/bootcamp_02:1.0