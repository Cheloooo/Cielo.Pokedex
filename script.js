let arr = [];
const init = () => {
    fetchAllPokemon();
};

const searchBar = document.getElementById('searchBar');
console.log(searchBar);
searchBar.addEventListener('keyup', (e) => {
    const searchString = e.target.value.toLowerCase();
    console.log(searchString);
    const filterPokemon = arr.filter ((pokemon) => {
     return (
        pokemon.name.toLowerCase().includes(searchString) || 
        pokemon.types.includes(searchString)
     );
    });
    showPokemon(filterPokemon);
});

// let us query all pokemon names
const fetchAllPokemon = async() => {
    let res = await fetch('https://pokeapi.co/api/v2/pokemon?limit=151&offset=0')
  //response from this fetch to be retured
    let data = await res.json()
  console.log(data);
  fetchEachPokemon(data.results)
};

const fetchSinglePokemon = async (pokemon) =>{
    let res = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`)
  //response from this fetch to be retured
    let data = await res.json()
    return await data
};

const fetchEachPokemon = async (pokemon) => {
    for (let i =0; i < pokemon.length; i++) {
        arr.push(await fetchSinglePokemon(pokemon[i].name))
    }
    console.log(arr)
    showPokemon(arr)
};

const showPokemon = (pokemon) =>{
    const output = document.querySelector('.output')
    const map = pokemon.map(each =>{
        return `
        <div class="poke-card">
            <h1>${each.name}</h1>
            <img src=${each.sprites.front_default} alt=${each.name}/>
            <div class="poke-types">
                <span>${each.types[0].type.name}</span>
                <span>${each.types.length > 1 ? each.types[1].type.name : ''}</span>
            </div>
        </div>
        `
    }).join('');
    return output.innerHTML = map
};

init();
