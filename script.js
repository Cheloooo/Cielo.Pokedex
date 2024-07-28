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
// const pokedex = document.getElementById("pokedex");

// console.log(pokedex);
// const fetchPokemon = () => {
//     const promises =[];
//     for (let i = 1; i <= 150; i++){
//         const url = `https://pokeapi.co/api/v2/pokemon/${i}`;
//         promises.push(fetch(url).then((res) => res.json()));
//     }
//     Promise.all(promises).then((results) => {
//         const pokemon = results.map((data) => ({
//             name: data.name,
//             id: data.id,
//             image: data.sprites['front_default'],
//             type: data.types.map((type) => type.type.name).join(', ')
//         }));
//         displayPokemon(pokemon);
//     });
// };

// const displayPokemon = (pokemon) => {
//     console.log(pokemon);
//     const pokemonHTMLString = pokemon.map((pokeman) =>`
//         <li>
//          <img src="${pokeman.image} />
//          <h2>${pokeman.id}. ${pokeman.name}</h2>
//          <p>Type: ${pokeman.type}</p>
//         </li>
//         `).join('');
//     pokedex.innerHTML = pokemonHTMLString;
// };

// fetchPokemon();