const elList = document.querySelector('.films__card-wrapper');
const elCheck = document.querySelector('.button');
const elForm = document.querySelector('.form');
const elInputSearch = selectElem('.films__input-serach', elForm);
const elSelect = selectElem('.films__select', elForm);
const elDiv = document.querySelector('.modal')
const elBtn = document.querySelector('.btn')
const elFilter = selectElem('.films__filter', elForm);
const elTemplate = document.querySelector('#template').content;
const elDivWrapper = document.querySelector('.modal-wrapper');
const elIcon = document.querySelector('.btn-icon');
const elNewLi = document.querySelector('.films__card');
const elLi = document.querySelector('.pokemons__card');
const elImg = document.querySelector('.pokemons__img');
const elName = document.querySelector('.pokemons__card-title');
const elType = document.querySelector('.pokemons__card-genre');
const elKg = document.querySelector('.pokemons__kg');
const elAge = document.querySelector('.pokemons__release-date');
const elNewImg = document.querySelector('.films__img');
const elNewTitle = document.querySelector('.films__card-title');

function renderMovies(pokemonsArr, element){
    element.innerHTML = null;
    
    pokemonsArr.forEach((pokemon) =>{
        const cloneTemplate = elTemplate.cloneNode(true);
        
        selectElem('.films__img', cloneTemplate).src = pokemon.img
        selectElem('.films__card-title', cloneTemplate).textContent = pokemon.name
        selectElem('.films__card-genre', cloneTemplate).textContent = pokemon.type
        selectElem('.films__kg', cloneTemplate).textContent = pokemon.egg;
        selectElem('.films__release-date', cloneTemplate).textContent = pokemon.avg_spawns;
        
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
            if(a.avg_spawns > b.avg_spawns){
                return 1
            }else if(a.avg_spawns < b.avg_spawns){
                return -1
            }else{
                return 0
            }
        })
}else if(filterValue === 'new__old'){
    foundFilms.sort((b, a) =>{
        if(a.avg_spawns > b.avg_spawns){
            return 1
        }else if(a.avg_spawns < b.avg_spawns){
            return -1
        }else{
            return 0
        }
    })
}

    elInputSearch.value = null;

    renderMovies(foundFilms, elList);
});
elCheck.addEventListener('click', function() {

    if(elCheck) {
        elDiv.style.display = 'flex';
        elDivWrapper.style.display = 'block';
        
    }
})
elBtn.addEventListener('click', function() {

    if(elBtn) {
        elDiv.style.display = 'none';
        elDivWrapper.style.display = 'none';
    }
})
elDiv.addEventListener('click', function() {

    if(elDiv) {
        elDiv.style.display = 'none';
        elDivWrapper.style.display = 'none';
    }
})
elIcon.addEventListener('click',function() {
    
})