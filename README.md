Pokédex Explorer & Team Builder — Etapa 02

Autor

Rafael Augusto Santana Gil

Matrícula / RA: 22508717

🛠️ APIs Utilizadas

PokeAPI: https://pokeapi.co/docs/v2

Endpoint: https://pokeapi.co/api/v2/pokemon/{termo}

Supabase (PostgreSQL): https://supabase.com/
---
bootcamp_02/
├── .dockerignore       # Arquivos ignorados no contexto do build Docker
├── Dockerfile          # Instruções da imagem Nginx Alpine
├── docker-compose.yml  # Configuração do Docker Compose para dev local
├── index.html          # Interface HTML principal da Pokédex
├── style.css           # Estilização completa responsiva em Dark Mode
├── script.js           # Lógica do frontend, PokeAPI, favoritos (⭐) e Supabase
├── config.js           # Credenciais públicas (URL e Anon Key) do Supabase
└── README.md           # Documentação completa para entrega do projeto


📝 Descrição Geral do Projeto

O Pokédex Explorer & Team Builder é uma aplicação web interativa desenvolvida com HTML, CSS e JavaScript Vanilla que permite pesquisar Pokémon em tempo real via PokeAPI, exibindo suas artes oficiais, números de ID, tipos elementares, altura, peso e habilidade principal traduzida.

Nesta Etapa 02, a aplicação evoluiu significativamente ao ganhar persistência de dados em tempo real através do Supabase (PostgreSQL na nuvem). O usuário agora pode salvar seus Pokémon favoritos clicando na estrela de favoritar (⭐) presente em cada cartão, montando uma equipe personalizada que permanece salva mesmo após fechar ou recarregar o navegador.

Além disso, a aplicação foi totalmente conteinerizada com Docker, servida por um servidor web otimizado Nginx (Alpine Linux) e publicada no Docker Hub, permitindo que qualquer pessoa execute o projeto em ambiente local com um único comando.

🔗 Links Oficiais da Entrega (Requisitos do Moodle)

Repositório no GitHub:

👉 https://github.com/Auggusti0G/bootcamp_02

Aplicação no Ar (GitHub Pages):

👉 https://auggusti0g.github.io/bootcamp_02/

Repositório de Imagens no Docker Hub:

👉 https://hub.docker.com/r/rafaelaugusto01/bootcamp_02

🐳 Execução via Docker (Comando Próprio para Avaliação)

(4) Comando docker run pronto para o avaliador executar

Para testar a aplicação em uma máquina limpa diretamente a partir da imagem pública hospedada no Docker Hub, basta executar o seguinte comando no terminal:

docker run -d -p 8080:80 --name pokedex-app rafaelaugusto01/bootcamp_02:1.0

Após a execução, abra o navegador e acesse:

👉 http://localhost:8080/

💾 Persistência de Dados (Supabase / PostgreSQL)

(5) Descrição da Persistência de Dados

Para resolver o problema da perda de dados ao recarregar a página, a aplicação foi integrada ao serviço Supabase (BaaS - Backend as a Service).

Banco de Dados Escolhido: Supabase (PostgreSQL gerenciado na nuvem).

Mecanismo de Interação (Estrela de Favoritar ⭐): Ao consultar qualquer Pokémon, a interface exibe o botão com a estrela de favoritar (⭐). Ao clicar, o sistema dispara uma requisição de inserção (INSERT) para o banco do Supabase, salvando o Pokémon na seção de favoritos.

O que é Salvo: Os dados básicos do Pokémon selecionado pelo usuário.

Estrutura Detalhada da Tabela favoritos

id (int8 / bigint): Chave primária gerada por auto incremento (primary key).

criado_em (timestamptz): Data e hora em que o favorito foi salvo no banco (valor padrão now()).

numero (int4 / integer): Número de identificação do Pokémon na Pokédex oficial, configurado com restrição UNIQUE para evitar favoritamentos duplicados.

nome (text): Nome oficial do Pokémon para rápida renderização da lista sem necessidade de reconsultar a PokeAPI.

imagem (text): URL direta da ilustração/artwork oficial do Pokémon.

Políticas de Acesso (RLS - Row Level Security)

Permitir Leitura Pública: SELECT liberado para a role anon.

Permitir Inserção Pública: INSERT liberado para a role anon.

Permitir Exclusão Pública: DELETE liberado para a role anon.

Tratamento de Erros

Caso o usuário tente favoritar pela estrela (⭐) um Pokémon que já existe na tabela, o PostgreSQL retorna o código de erro 23505 (violação de chave única), que é tratado no frontend para exibir a mensagem:

"Este Pokémon já está nos seus favoritos!"

🎯 Evidências das Sidequests Obrigatórias (SQ1 - SQ4)

[x] SQ1 · .dockerignore

Criado o arquivo .dockerignore na raiz do repositório para ignorar diretórios e arquivos pesados/desnecessários no momento do build (ex.: .git, .gitignore, README.md, rascunhos).

Por que é importante: Impede o envio de arquivos desnecessários ao contexto da imagem Docker, contribuindo para um build mais rápido e uma imagem final mais enxuta.

[x] SQ2 · Versionamento de Imagem

Publicamos no Docker Hub as versões etiquetadas do projeto:

Tag 1.0: Primeira versão estável e funcional da aplicação.

Tag 1.1: Versão atualizada com melhorias e correções de layout.

Tag latest: Tag apontando para a build mais recente do repositório.

[x] SQ3 · Descrição no Docker Hub

O Overview do repositório no Docker Hub foi preenchido com a descrição detalhada da aplicação, instruções de uso, o comando docker run pronto para copiar e o link direto para este repositório do GitHub.

[x] SQ4 · Explorando a Orquestração e Kubernetes

Para testar a execução de múltiplos ambientes em paralelo, rodamos dois contêineres simultâneos da aplicação em portas distintas na mesma máquina:

Container 1: Mapeado na porta 8080 (http://localhost:8080/)

Container 2: Mapeado na porta 8081 (http://localhost:8081/)

📸 Print das evidências no repositório

O print demonstrando a execução dos dois contêineres rodando simultaneamente através do comando docker ps foi commitado e enviado na raiz deste repositório no GitHub.

💬 Parágrafo sobre Kubernetes: "Se eu tivesse 100 containers, como gerenciaria?"

Se tivéssemos que gerenciar 100 contêineres simultâneos da Pokédex em um ambiente de produção de grande escala, a gestão manual via linha de comando individual do Docker seria inviável. Nesse cenário, utiliza-se um orquestrador de contêineres como o Kubernetes (K8s).

No Kubernetes, a infraestrutura física ou virtual é unificada em um Cluster. A aplicação é executada dentro de Pods, a menor unidade implantável da plataforma. Através da configuração declarativa de réplicas, controladas por um Deployment ou ReplicaSet, o orquestrador assegura que as instâncias permaneçam ativas de acordo com o estado desejado.

Caso algum contêiner falhe ou um servidor apresente problemas, o Kubernetes pode recriar os Pods automaticamente. Além disso, permite distribuir o tráfego entre as instâncias por meio de Services e recursos de balanceamento de carga.


🚀 Como Executar Localmente

Opção A: Com Docker Compose

Na raiz do repositório clonado, execute:

docker compose up -d

Acesse no navegador:

👉 http://localhost:8080/

Opção B: Executando 2 Containers Simultâneos (SQ4)

# Executa o primeiro container na porta 8080
docker run -d -p 8080:80 --name pokedex-app-1 rafaelaugusto01/bootcamp_02:1.0

# Executa o segundo container na porta 8081
docker run -d -p 8081:80 --name pokedex-app-2 rafaelaugusto01/bootcamp_02:1.0

Container 1: http://localhost:8080/

Container 2: http://localhost:8081/

Opção C: Execução Direta no Navegador (Sem Docker)

Clone este repositório:

git clone https://github.com/Auggusti0G/bootcamp_02.git

Acesse a pasta do projeto:

cd bootcamp_02

Abra o arquivo index.html em um navegador web.

📌 Considerações Finais

O Pokédex Explorer & Team Builder — Etapa 02 demonstra a integração entre desenvolvimento frontend, consumo de APIs externas, persistência de dados em PostgreSQL, conteinerização com Docker e publicação de imagens no Docker Hub.

A aplicação permite pesquisar Pokémon, visualizar suas características e manter uma lista de favoritos persistente. Além disso, as atividades de versionamento, documentação e execução simultânea de contêineres demonstram conceitos importantes para a implantação e manutenção de aplicações web.
