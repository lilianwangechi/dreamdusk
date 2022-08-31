document.addEventListener('DOMContentLoaded',()=>{


  getRecipes()
  renderFoodCard()
  
  })
  
  //render the food recipes
  //create dom elements
  
  function renderFoodCard(cardData){
    const li = document.createElement('li')
    const pName = document.createElement('h3')
    const img = document.createElement('img')
    const pPrice = document.createElement('p')
    //const pDescription = document.createElement('p')
    // const h4 = document.createElement('h4')
    // const ingredients = document.createElement('p')
    // const method = document.createElement('p')
    // const btn = document.createElement('button')
  
  
  li.className ='makeuplist-li'
  pName.textContent = cardData.name
  img.src =cardData.image_link
  //pDescription.textContent = cardData.description
  pPrice.textContent = `$${cardData.price}`
  // p.textContent = cardData.Ingredients
  // p.textContent = cardData.Method//own rray
  // btn.textContent ='Delete'
  
  li.append(pName,img,pPrice)
  document.querySelector('#makeup-list').append(li)
  }
  
  function getRecipes(){
    fetch('http://localhost:3000/maybelline')
    .then(res=> res.json())
    .then(recipes=>recipes.forEach(renderFoodCard)
   
    )
  }
  