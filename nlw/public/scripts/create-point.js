function populateUFs(){
    const ufSelect = document.querySelector("select[name= uf]")

    fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
    .then(res => res.json())
    .then( states =>{
        for(const state of states){
        ufSelect.innerHTML +=`<option value="${state.id}">${state.nome}</option>`
        }
    })
}

populateUFs()

function getCities(event){
    const citySelect = document.querySelector("select[name= city]")
    const stateInput = document.querySelector("[name=state]")

    const ufValue = event.target.value

    const indexOfSelectedState = event.target.selectedIndex
    stateInput.value = event.target.options[indexOfSelectedState].text


    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`

    citySelect.innerHTML = "<option value>Selecione a Cidade</option>"
    citySelect.disabled = true


    fetch(url)
    .then(res => res.json())
    .then( cities =>{
        for(const city of cities){
        citySelect.innerHTML +=`<option value="${city.nome}">${city.nome}</option>`
        }
    citySelect.disabled = false
    })
}

document
.querySelector("select[name= uf]")
.addEventListener("change",getCities)

//ITES DE COLETA
//Pegar todos os LI's
const itemsToCollect = document.querySelectorAll(".items-grid li")

for(let item of itemsToCollect){
    item.addEventListener("click",handleSelectedItem)
}

const collectedItems = document.querySelector("input[name=items]")

let selectedItems = []

function handleSelectedItem(event){
    const itemLi = event.target
    //add or remove class with JS (.toggle())
    itemLi.classList.toggle("selected")

    const itemId = event.target.dataset.id

    //1º Verificar se existem items selecionados, se sim 
    //pegar os items selecionados
    const alreadySelected = selectedItems.findIndex(item => {
        const itemFound = item == itemId
        return itemFound
    })
    //se ja estiveir selecionado, tirar da seleçao
    if(alreadySelected >= 0){
        const filteredItems = selectedItems.filter(item =>{
            const itemIsDifferent = item != itemId
            return itemIsDifferent
        })
        selectedItems = filteredItems
    }else{
         //se nao tiver selecionado, adiocionar a seleçao 
         selectedItems.push(itemId)
    }
   // console.log('selectedItems: ',selectedItems)
    //atualizar o campo escondido com os itens selecionados 
    collectedItems.value = selectedItems
}