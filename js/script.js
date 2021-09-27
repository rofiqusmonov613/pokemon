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
const elDivWrapperInner = document.querySelector('.modal-wrapper-inner');
const elIcon = document.querySelector('.btn-icon');
const elFa = document.querySelector('.fa-regular');
const elSolid = document.querySelector('.fa-solid')

let modalArray = []


function renderMovies(pokemonsArr, element){
    element.innerHTML = null;
    
    pokemonsArr.forEach((pokemon) =>{
        const cloneTemplate = elTemplate.cloneNode(true);
        
        selectElem('.films__img', cloneTemplate).src = pokemon.img
        selectElem('.films__card-title', cloneTemplate).textContent = pokemon.name
        selectElem('.films__card-genre', cloneTemplate).textContent = pokemon.type
        selectElem('.films__kg', cloneTemplate).textContent = pokemon.weight;
        selectElem('.films__release-date', cloneTemplate).textContent = pokemon.avg_spawns;

        cloneTemplate.querySelector('.btn-icon').dataset.itemId = pokemon.id
        cloneTemplate.querySelector('.fa-regular').dataset.itemId = pokemon.id
        cloneTemplate.querySelector('.delete_btn').dataset.deleteId = pokemon.id
        cloneTemplate.querySelector('.fa-solid').dataset.deleteId = pokemon.id
        
        
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
// elVedro.addEventListener('click', function() {
//       elLi.style.display = 'none';
// })

function setModal(){

    elDivWrapperInner.innerHTML = "";
    modalArray.forEach((item) => {
        const cloneTemplate = elTemplate.cloneNode(true);
        
        selectElem('.films__img', cloneTemplate).src = item.img
        selectElem('.films__card-title', cloneTemplate).textContent = item.name
        selectElem('.films__card-genre', cloneTemplate).textContent = item.type
        selectElem('.films__kg', cloneTemplate).textContent = item.egg;
        selectElem('.films__release-date', cloneTemplate).textContent = item.avg_spawns;

        cloneTemplate.querySelector('.btn-icon').dataset.itemId = item.id
        cloneTemplate.querySelector('.fa-regular').dataset.itemId = item.id
        cloneTemplate.querySelector('.delete_btn').dataset.itemId = item.id
        cloneTemplate.querySelector('.fa-solid').dataset.itemId = item.id
        
        
        elDivWrapperInner.appendChild(cloneTemplate);
    })
}


elList.addEventListener('click', function(event) {
    pokemons.forEach((item) => {
        if(event.target.dataset.itemId == item.id){
            modalArray.push(item)
           
        }
    })
    
    console.log(modalArray)
    setModal()
    
});

function deletePokemon(index){
    modalArray.splice(index,1)
}


elDivWrapperInner.addEventListener('click', function(event) {
  if(event.target.matches('.delete_btn')){
    deletePokemon(Number(event.target.dataset.deleteId))
    setModal()
  }
})
elDivWrapperInner.addEventListener('click', function(event) {
    if(event.target.matches('.fa-solid')){
      deletePokemon(Number(event.target.dataset.deleteId))
      setModal()
    }
  })