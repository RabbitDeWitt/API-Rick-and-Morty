const container = document.querySelector('.container')
const btnDown = document.querySelector('#btnDown')
const btnUp = document.querySelector('#btnUp')
const page = document.querySelector('#txtPage')

async function getCharacter(page){
  const url = `https://rickandmortyapi.com/api/character/?page=${page}`
  const data = await fetch(url)
  const res = await data.json()
  const characters = res.results
    container.innerHTML = ``
  for(let character of characters){
    const {name, species, status, gender, image} = character
    let statusClass = 'unknown'
    if(status == "Alive"){
      statusClass = 'alive'
    }else if (status == 'Dead'){
      statusClass = 'dead'
    }
    container.innerHTML += `
    <div class="card">
      <figure class="card-banner">
        <img src="`+image+`" alt="">
      </figure>
      <div class="info">
        <h3 class="name">`+name+`</h3>
        <div class="bottom">
          <p class="gender">`+gender+`</p>
          <p class="specie">`+species+`</p>
          <p class="status `+statusClass+`">`+status+`</p>
        </div>
      </div>
    </div>
    `
  }
}

getCharacter(page.value)

btnUp.addEventListener('click', () => {
  if(page.value < 42){
    page.value++
    getCharacter(page.value)
  }
})

btnDown.addEventListener('click', () => {
  if(page.value > 1){
    page.value--
    getCharacter(page.value)
  }
})

page.addEventListener('change', () => {
  if(page.value >= 1 && page.value <= 42){
    getCharacter(page.value)
  }
})