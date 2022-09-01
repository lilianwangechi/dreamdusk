console.log("here")
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

  pName.textContent = `${cardData.name}`
  img.src =cardData.image_link,
  pPrice.textContent = `$${cardData.price}`
  btn.textContent ='Buy',
  
  li.append(pName,img,pPrice,btn)
  document.querySelector('#makeup-list').append(li)

  //add event
  //btn.addEventListener('click',addItemToCart)

  }
//fetch request 
  function getItems(){
    fetch('http://localhost:3000/maybelline')
    .then(res=> res.json())
    .then(makeup=>makeup.forEach(renderCard)
   
    )
  }

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

 //Wish list items
 const form = document.getElementById('form-wrapper')
 form.addEventListener('submit',createWishItem)
 function createWishItem(e){
   e.preventDefault()
   let newWishItemObj = {
     name:e.target.makeup.value,
     image:e.target.imageUrl.value,
     price:e.target = 'Not for Purchase',
     //button:e.target.value = 'wish'
     //btn:e.target.button ='Wish'
   }
   renderCard(newWishItemObj)
  // postRamen(newRamenObj)
   form.reset()
 } 

 //Add items to the cart
 

//remove items from the cart
let removeCartItemButtons =document.getElementsByClassName('btn-danger')
//console.log(removeCartItemButtons)
for(let i = 0;i < removeCartItemButtons.length;i++){
  let button = removeCartItemButtons[i]
  button.addEventListener('click',function(event){
    let buttonClicked = event.target
    buttonClicked.parentElement.parentElement.remove()
    updateCartTotal()
  })
}
//quantity
let quantityInputs = document.getElementsByClassName('cart-quantity-input')
for(let i = 0; i < quantityInputs.length; i++){
  let input = quantityInputs[i]
  input.addEventListener('change',quantityChanged)
}
function quantityChanged(event){
  let input = event.target
  if(isNaN(input.value) || input.value <= 0){
    input.value = 1
  }
updateCartTotal()
}

//update element prices when removed
function updateCartTotal() {
  let cartItemContainer = document.getElementsByClassName('cart-items')[0]
  let cartRows = cartItemContainer.getElementsByClassName('cart-row')
  let total = 0
  for (let i = 0; i < cartRows.length; i++) {
    let cartRow = cartRows[i]
    let priceElement = cartRow.getElementsByClassName('cart-price')[0]
    let quantityElement = cartRow.getElementsByClassName('cart-quantity-input')[0]
    let price = parseFloat(priceElement.innerText.replace('$', ''))
    let quantity = quantityElement.value
    total = total + (price * quantity)
      console.log(priceElement,quantityElement)
  }
  total = Math.round(total * 100) / 100 //rounding the price
  document.getElementsByClassName('cart-total-price')[0].innerText = '$' + total
}
