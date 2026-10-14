const campoBusca = document.getElementById("campo-busca");
const botaoBuscar = document.getElementById("botao-buscar");
const botaoAleatorio = document.getElementById("botao-aleatorio");
const areaResultado = document.getElementById("resultado");

// Função auxiliar para buscar a tradução da habilidade para PT-BR
async function obterHabilidadeTraduzida(urlHabilidade) {
  try {
    const res = await fetch(urlHabilidade);
    if (!res.ok) return null;
    const data = await res.json();
    
    // Procura a tradução em português nas 'names' da API
    const nomePt = data.names.find(n => n.language.name === "pt" || n.language.name === "es");
    return nomePt ? nomePt.name : data.name;
  } catch {
    return null;
  }
}

async function buscarPokemon(termo) {
  // Exibe o estado visual de carregamento (Spinner)
  areaResultado.innerHTML = `
    <div class="loading-state">
      <div class="spinner"></div>
      <p style="color: #94a3b8; font-size: 0.9rem;">Buscando na Pokédex...</p>
    </div>
  `;

  try {
    // Garante que o termo seja formatado como texto minúsculo sem espaços
    const termoTratado = String(termo).toLowerCase().trim();
    const resposta = await fetch(`https://pokeapi.co/api/v2/pokemon/${termoTratado}`);

    if (!resposta.ok) {
      throw new Error("Pokémon não encontrado");
    }

    const dados = await resposta.json();

    // Extração das informações básicas
    const nome = dados.name;
    const id = String(dados.id).padStart(3, '0');
    const imagem = dados.sprites.other['official-artwork'].front_default || dados.sprites.front_default;
    const tipos = dados.types.map(t => `<span class="type-badge">${t.type.name}</span>`).join('');
    const altura = (dados.height / 10).toFixed(1);
    const peso = (dados.weight / 10).toFixed(1);

    // Tradução da habilidade
    let habilidadeNome = 'N/A';
    if (dados.abilities.length > 0) {
      const habObj = dados.abilities[0];
      const traduzida = await obterHabilidadeTraduzida(habObj.ability.url);
      habilidadeNome = traduzida || habObj.ability.name;
    }

    // Renderização dos dados no DOM
    areaResultado.innerHTML = `
      <div class="pokemon-card">
        <span class="pokemon-id">#${id}</span>
        <img src="${imagem}" alt="${nome}" class="pokemon-img">
        <h2 class="pokemon-name">${nome}</h2>
        <div class="types-container">${tipos}</div>
        <div class="stats-grid">
          <div class="stat-item">
            <span class="stat-label">Altura</span>
            <span class="stat-value">${altura} m</span>
          </div>
          <div class="stat-item">
            <span class="stat-label">Peso</span>
            <span class="stat-value">${peso} kg</span>
          </div>
          <div class="stat-item">
            <span class="stat-label">Habilidade</span>
            <span class="stat-value">${habilidadeNome}</span>
          </div>
        </div>
      </div>
    `;

    // Atualiza o valor do campo de entrada com o nome/número consultado
    campoBusca.value = dados.name;

  } catch (erro) {
    areaResultado.innerHTML = `
      <div class="error-card">
        <div class="error-icon">👾</div>
        <h3>Pokémon não encontrado!</h3>
        <p>Não encontramos nenhum resultado para "<strong>${termo}</strong>". Verifique se o nome ou número digitado está correto.</p>
      </div>
    `;
  }
}

// Disparar busca manual ao clicar no ícone de busca
botaoBuscar.addEventListener("click", () => {
  const termo = campoBusca.value;
  if (termo) {
    buscarPokemon(termo);
  }
});

// Disparar busca aleatória (Sorteia um ID de 1 a 151 para garantia total de retorno válido na API)
botaoAleatorio.addEventListener("click", () => {
  const idAleatorio = Math.floor(Math.random() * 151) + 1;
  buscarPokemon(idAleatorio);
});

// Disparar busca ao pressionar "Enter" no teclado
campoBusca.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    botaoBuscar.click();
  }
});
