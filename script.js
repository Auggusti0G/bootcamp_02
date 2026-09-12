// Estrutura inicial
console.log("Aplicação iniciada com sucesso!");

const campoBusca = document.getElementById("campo-busca");
const botaoBuscar = document.getElementById("botao-buscar");
const areaResultado = document.getElementById("resultado");

async function buscarPokemon(termo) {
  areaResultado.innerHTML = `<div class="loading-state"><p>Buscando na Pokédex...</p></div>`;

  // Verifica se o termo é um numero (ID)ou um nome de Pokemom e puxa as informações na API
  //Ultilizando o await fetch
  const resposta = await fetch(`https://pokeapi.co/api/v2/pokemon/${termo}`);
  const dados = await resposta.json();

  const nome = dados.name;
  const id = String(dados.id).padStart(3, '0');
  const imagem = dados.sprites.other['official-artwork'].front_default || dados.sprites.front_default;
  const tipos = dados.types.map(t => `<span class="type-badge">${t.type.name}</span>`).join('');
  const altura = (dados.height / 10).toFixed(1);
  const peso = (dados.weight / 10).toFixed(1);
  const habilidade = dados.abilities[0] ? dados.abilities[0].ability.name : 'N/A';

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
          <span class="stat-value">${habilidade}</span>
        </div>
      </div>
    </div>
  `;
}

botaoBuscar.addEventListener("click", () => {
  const termo = campoBusca.value.toLowerCase().trim();
  if (termo) buscarPokemon(termo);
});