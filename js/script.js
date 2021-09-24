const elList = document.querySelector('.films__card-wrapper');
const elForm = document.querySelector('.form');
const elInputSearch = selectElem('.films__input-serach', elForm);
const elSelect = selectElem('.films__select', elForm);
const elFilter = selectElem('.films__filter', elForm);
const elTemplate = document.querySelector('#template').content

function renderMovies(pokemonsArr, element){
    element.innerHTML = null;
    
    pokemonsArr.forEach((pokemon) =>{
        const cloneTemplate = elTemplate.cloneNode(true);
        
        selectElem('.films__img', cloneTemplate).src = pokemon.img
        selectElem('.films__card-title', cloneTemplate).textContent = pokemon.name
        selectElem('.films__card-genre', cloneTemplate).textContent = pokemon.type
        selectElem('.films__release-date', cloneTemplate).textContent = normalizeDate(pokemon.num)
        
        element.appendChild(cloneTemplate);
    })
}

renderMovies(pokemons, elList);

function renderGenres(pokemonsArr, element){
    
    let result = [];
    
    pokemonsArr.forEach((pokemon) => {
        pokemon.type.forEach(types =>{
            if(!result.includes(types)){
                result.push(types)
            }
        })
    })
    
    result.forEach(types =>{
        let newOption = createDOM('option');
        newOption.textContent = types;
        newOption.value = types;
        
        element.appendChild(newOption)
    })
}

renderGenres(pokemons, elSelect)

elForm.addEventListener('submit', (e) =>{
    e.preventDefault();
    
    const inputValue = elInputSearch.value.trim();
    const selectValue = elSelect.value.trim();
    const filterValue = elFilter.value.trim();
    
    const regex = new RegExp(inputValue, 'gi');
    
    const filteredFilms = pokemons.filter((pokemon) => pokemon.name.match(regex));
    
    let foundFilms = [];
    
    if(selectValue === 'All'){
        foundFilms = filteredFilms
    }else{
        foundFilms = filteredFilms.filter(pokemon => pokemon.type.includes(selectValue))
    }
    
    if(filterValue === 'a_z'){
        foundFilms.sort((a, b) =>{
            if(a.name > b.name){
                return 1
            }else if(a.name < b.name){
                return -1
            }else{
                return 0
            }
        })
    }else if(filterValue === 'z_a'){
            foundFilms.sort((a, b) =>{
                if(a.name > b.name){
                    return -1
                }else if(a.name < b.name){
                    return 1
                }else{
                    return 0
                }
            })
    }else if(filterValue === 'old__new'){
        foundFilms.sort((a, b) =>{
            if(a.num > b.num){
                return 1
            }else if(a.num < b.num){
                return -1
            }else{
                return 0
            }
        })
}else if(filterValue === 'new__old'){
    foundFilms.sort((b, a) =>{
        if(a.num > b.num){
            return 1
        }else if(a.num < b.num){
            return -1
        }else{
            return 0
        }
    })
}

    elInputSearch.value = null;

    renderMovies(foundFilms, elList);
});