const campoBusca = document.getElementById("campo-busca");
const botaoBuscar = document.getElementById("botao-buscar");
const botaoAleatorio = document.getElementById("botao-aleatorio");
const areaResultado = document.getElementById("resultado");

async function buscarPokemon(termo) {
  // Estado de Carregamento
  areaResultado.innerHTML = `
    <div class="loading-state">
      <div class="spinner"></div>
      <p style="color: #64748b; font-size: 0.85rem;">Buscando dados na PokeAPI...</p>
    </div>
  `;

  try {
    const resposta = await fetch(`https://pokeapi.co/api/v2/pokemon/${termo}`);

    // Validação de erro se o Pokémon não existir
    if (!resposta.ok) {
      throw new Error("Pokémon não encontrado");
    }

    const dados = await resposta.json();

    // Extração dos dados do JSON
    const nome = dados.name;
    const id = String(dados.id).padStart(3, '0');
    const imagem = dados.sprites.other['official-artwork'].front_default || dados.sprites.front_default;
    const tipos = dados.types.map(t => `<span class="type-badge">${t.type.name}</span>`).join('');
    const altura = (dados.height / 10).toFixed(1); // Metros
    const peso = (dados.weight / 10).toFixed(1); // Kg
    const habilidade = dados.abilities[0] ? dados.abilities[0].ability.name : 'N/A';

    // Atualização da interface
    areaResultado.innerHTML = `
      <div class="pokemon-card">
        <img src="${imagem}" alt="${nome}" class="pokemon-img">
        <h2 class="pokemon-title">#${id} — ${nome}</h2>
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
            <span class="stat-value">${habilidade}</span>
          </div>
        </div>
      </div>
    `;

    // Atualiza o valor do campo de texto com o ID retornado
    campoBusca.value = dados.id;

  } catch (erro) {
    areaResultado.innerHTML = `
      <div class="error-card">
        <h3>Ops! Nada encontrado.</h3>
        <p>Não encontramos nenhum registro para "<strong>${termo}</strong>". Tente outro nome ou número.</p>
      </div>
    `;
  }
}

// Disparar busca manual
botaoBuscar.addEventListener("click", () => {
  const termo = campoBusca.value.toLowerCase().trim();
  if (termo) buscarPokemon(termo);
});

// Disparar busca aleatória (sorteia ID de 1 a 1025)
botaoAleatorio.addEventListener("click", () => {
  const idAleatorio = Math.floor(Math.random() * 1025) + 1;
  buscarPokemon(idAleatorio);
});

// Disparar busca ao apertar a tecla "Enter"
campoBusca.addEventListener("keypress", (e) => {
  if (e.key === "Enter") botaoBuscar.click();
});
