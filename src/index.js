document.addEventListener('DOMContentLoaded',()=>{
  getItems()
  renderCard()
  
  })
  
  //render the food recipes
  //create dom elements
  
  function renderCard(cardData){
    const li = document.createElement('li')
    const pName = document.createElement('h3')
    const img = document.createElement('img')
    const pPrice = document.createElement('p')
    const btn = document.createElement('button')

//class names 
li.className ='makeuplist-li';
pName.className = 'shop-item-title'
img.className = 'shop-item-image'
pPrice.className = 'shop-item-price'
btn.className = 'shop-item-button'

  pName.textContent = cardData.name
  img.src =cardData.image_link
  pPrice.textContent = `$${cardData.price}`
  btn.textContent ='Buy'
  
  li.append(pName,img,pPrice,btn)
  document.querySelector('#makeup-list').append(li)

  }
//fetch request 
  function getItems(){
    fetch('http://localhost:3000/maybelline')
    .then(res=> res.json())
    .then(recipes=>recipes.forEach(renderCard)
   
    )
  }
  // function getItems(){
  //   fetch('http://localhost:3000/toys')
  //   .then(res=> res.json())
  //   .then(recipes=>recipes.forEach(renderCard)
   
  //   )
  // }

  // add comments to the dream dusk
document.getElementById('comment-form').addEventListener('submit',
evt =>{
  evt.preventDefault();
  const newComment =document.getElementById('comment').value;
  //li.className ='commentslist-li'
  document.getElementById('comments-list').innerHTML +=
  `<li onClick="removeComment(event)" >${newComment}</li>`;
  evt.target.reset();
},
)
//remove comment
 function removeComment(evt){
    return evt.target.remove()
     }

//cart section

//add items to the cart