// Seleção dos elementos DOM
const pokemonImage = document.querySelector('.pokemon_image');
const pokemonName = document.querySelector('.pokemon_name');
const pokemonNumber = document.querySelector('.pokemon_number');

const form = document.querySelector('.form');
const input = document.querySelector('.input_search');
const buttonPrev = document.querySelector('.btn-prev');
const buttonNext = document.querySelector('.btn-next');

// Variável para controlar o Pokémon atual
let searchPokemon = 1;

// Função assíncrona para buscar dados do Pokémon na API
const fetchPokemon = async (pokemon) => {
    try {
        // Faz a requisição à API
        const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
        if (APIResponse.ok) {
            // Converte a resposta para JSON
            const data = await APIResponse.json();
            return data;
        } else {
            throw new Error('Not found :c');
        }
    } catch (error) {
        console.error(error);
        return null;
    }
}

// Função para renderizar o Pokémon na tela
const renderPokemon = async (pokemon) => {
    // Mostra mensagem de carregamento
    pokemonName.innerHTML = 'Loading...';
    pokemonNumber.innerHTML = '';
    
    // Busca dados do Pokémon
    const data = await fetchPokemon(pokemon);

    if (data) {
        // Atualiza a interface com os dados do Pokémon
        pokemonImage.style.display = 'block';
        pokemonName.innerHTML = data.name;
        pokemonNumber.innerHTML = data.id;
        pokemonImage.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default'];
        input.value = '';
        searchPokemon = data.id;
    } else {
        // Mostra mensagem de erro se o Pokémon não for encontrado
        pokemonImage.style.display = 'none';
        pokemonName.innerHTML = 'Not found :c';
        pokemonNumber.innerHTML = '';
    }
}

// Event listener para o formulário de busca
form.addEventListener('submit', (event) => {
    event.preventDefault();
    renderPokemon(input.value.toLowerCase());
});

// Event listener para o botão "Anterior"
buttonPrev.addEventListener('click', () => {
    if (searchPokemon > 1) {
        searchPokemon -= 1;
        renderPokemon(searchPokemon);
    }
});

// Event listener para o botão "Próximo"
buttonNext.addEventListener('click', () => {
    searchPokemon += 1;
    renderPokemon(searchPokemon);
});

// Renderiza o primeiro Pokémon ao carregar a página
renderPokemon(searchPokemon);