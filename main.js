document.addEventListener('DOMContentLoaded', function () {
    const searchButton = document.getElementById('searchButton');
    searchButton.addEventListener('click', function () {
        const query = document.getElementById('searchInput').value.toLowerCase();
        const pokemonCards = document.querySelectorAll('.pokemon-info');
        pokemonCards.forEach(card => {
            const name = card.dataset.name.toLowerCase();
            const type = card.dataset.type.toLowerCase();
            if (name.includes(query) || type.includes(query)) {
                card.style.display = '';
            } else {
                card.style.display = 'none';
            }
        });
    });
});

// Función para consumir la PokeAPI y mostrar datos de un rango de Pokémon
function fetchPokemonRange(start, end) {
    for (let i = start; i <= end; i++) {
        fetch(`https://pokeapi.co/api/v2/pokemon/${i}`)
            .then(response => response.json())
            .then(data => {
                displayPokemonData(data);
            })
            .catch(error => console.error("Error al obtener datos del Pokémon:", error));
    }
}

// Función para mostrar los datos de cada Pokémon en el HTML
function displayPokemonData(pokemonData) {
    const pokemonContainer = document.querySelector('.pokemon-container');
    const pokemonCard = document.createElement('div');
    pokemonCard.classList.add('pokemon-info');
    pokemonCard.setAttribute('data-name', pokemonData.name);
    pokemonCard.setAttribute('data-type', pokemonData.types.map(type => type.type.name).join(', ')); // Suponiendo que un Pokémon puede tener varios tipos

    // Agregando más información como altura, peso y estadísticas
    const pokemonContent = `
<img src="${pokemonData.sprites.front_default}" alt="${pokemonData.name}">
<h2>${pokemonData.name}</h2>
<p>Tipo: ${pokemonData.types.map(type => type.type.name).join(', ')}</p>
<p>Altura: ${pokemonData.height / 10} m</p> <!-- Altura en metros -->
<p>Peso: ${pokemonData.weight / 10} kg</p> <!-- Peso en kilogramos -->
<div class="pokemon-stats">
    <h3>Estadísticas:</h3>
    ${pokemonData.stats.map(stat => `<p>${stat.stat.name}: ${stat.base_stat}</p>`).join('')}
</div>
`;
    pokemonCard.innerHTML = pokemonContent;
    pokemonContainer.appendChild(pokemonCard);
    
}

// Ejemplo de llamada a la función para cargar Pokémon
fetchPokemonRange(1, 807); // Carga los primeros 150 Pokémon
document.querySelector('.pokemon-card').addEventListener('click', function() {
    this.querySelector('.pokemon-card-inner').classList.toggle('is-flipped');
});