console.log("here")
document.addEventListener('DOMContentLoaded',()=>{
  getItems()
  renderCard()
 // updateCartTotal()
  //post request
  // const wishItemsForm = document.querySelector('#makeup-form')
  // wishItemsForm.addEventListener('submit',onWishFormSubmit)
  // document.getElementById('makeup-imageUrl').addEventListener('change',getImage)
  })
//create the makeup cards
  function renderCard(cardData){
    const li = document.createElement('li')
    const pName = document.createElement('h5')
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
  img.src =cardData.image_link,
  pPrice.textContent = `$${cardData.price}`
  btn.textContent ='Buy',
  
  li.append(pName,img,pPrice,btn)
  document.querySelector('#makeup-list').append(li)

  //add event
  btn.addEventListener('click',addItemToCartClicked)

  }
//fetch request 
  function getItems(){
    fetch('http://localhost:3000/maybelline')
    .then(res=> res.json())
    .then(makeup=>makeup.forEach(renderCard)
   
    )
  }

  

  // add comments to the dream dusk
// document.getElementById('comment-form').addEventListener('submit',
// evt =>{
//   evt.preventDefault();
//   const newComment =document.getElementById('comment').value;
//   //li.className ='commentslist-li'
//   document.getElementById('comments-list').innerHTML +=
//   `<li onClick="removeComment(event)" >${newComment}</li>`;
//   evt.target.reset();
// // },
// // )
// //remove comment
//  function removeComment(evt){
//     return evt.target.remove()
//      }


//  //Add items to the cart
// let addToCartButtons = document.getElementsByClassName('shop-item-button')
// for (let i = 0; i < addToCartButtons.length; i++) {
//     let buttonBuy = addToCartButtons[i]
//     buttonBuy.addEventListener('click', addItemToCartClicked)
// }

//document.getElementsByClassName('btn-purchase')[0].addEventListener('click', purchaseClicked)


function addItemToCartClicked(event){
  let buttonBuy = event.target
  let shopItem = buttonBuy.parentElement
  let itemTitle = shopItem.getElementsByClassName('shop-item-title')[0].textContent
  let priceItem = shopItem.getElementsByClassName('shop-item-price')[0].textContent
  let imageSrc = shopItem.getElementsByClassName('shop-item-image')[0].src

  //class names 
  //console.log(itemTitle,priceItem,imageSrc)
  addItemToCart(itemTitle,priceItem,imageSrc)
  updateCartTotal()

}

function addItemToCart(itemTitle,priceItem,imageSrc){
    let cartRow = document.createElement('div')
    cartRow.classList.add('cart-row')
    let cartItems = document.getElementsByClassName('cart-items')[0]
    let cartItemNames =cartItems.getElementsByClassName('cart-item-title')
    for(let i = 0; i < cartItemNames.length; i++){
      if (cartItemNames[i].textContent == itemTitle){
        alert('This item is already added to the cart')
        return
      }
    }
    let cartRowContents = `
    <div class="cart-items">
              <div class="cart-row">
                  <div class="cart-item cart-column">
                      <img class="cart-item-image" src="${imageSrc}">
                      <span class="cart-item-title">${itemTitle}</span>
                  </div>
                  <span class="cart-price cart-column">${priceItem}</span>
                  <div class="cart-quantity cart-column">
                      <input class="cart-quantity-input" type="number" value="1">
                      <button class="btn btn-danger" type="button">REMOVE</button>
                  </div>
    `
    cartRow.innerHTML = cartRowContents
    cartItems.append(cartRow)
    //event listeners for the cart section
    cartRow.getElementsByClassName('btn-danger')[0].addEventListener('click',removeCartItem)
    cartRow.getElementsByClassName('cart-quantity-input')[0].addEventListener('change',quantityChanged)
   //updateCartTotal()
}

//remove items from the cart
let removeCartItemButtons =document.getElementsByClassName('btn-danger')
//console.log(removeCartItemButtons)
for(let i = 0;i < removeCartItemButtons.length;i++){
  let buttonRemove = removeCartItemButtons[i]
  buttonRemove.addEventListener('click',removeCartItem)
}
function removeCartItem(event){
  let buttonClicked = event.target
  buttonClicked.parentElement.parentElement.remove()
  updateCartTotal()
  //console.log(event)
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

//alert for the purchase and remove items from the cart to simulate a purchase
document.getElementsByClassName('btn-purchase')[0].addEventListener('click',puchaseClicked)

function puchaseClicked(){
  alert('Thank you for your purchase')
  let cartItems = document.getElementsByClassName('cart-items')[0]
  while(cartItems.hasChildNodes()){
    cartItems.removeChild(cartItems.firstChild)
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
   console.log(price * quantity)
    total = total +(price*quantity)
    //console.log(price,quantity)
    
      //console.log(priceElement,quantityElement)
  }
  //console.log(priceElement,quantityElement,price)
  total = Math.round(total * 100) / 100 //rounding the price
  document.getElementsByClassName('cart-total-price')[0].innerText = '$' + total
  console.log(total)
}

//  //Wish list items continue working on this

//  let wishImage;
//  const apiHost = 'http://localhost:3000/wishList';

//  function onWishFormSubmit(evt){
//   evt.preventDefault();

  
//   const makeupName = document.getElementById('makeup-name').value;
//    //image url wishList image
//   const commentsText = document.getElementById('commentsText').value;
 
//   const fetchParameter ={
//     method:'POST',
//     body:JSON.stringify({
//       makeupName ,
//       wishImage,
//       commentsText
//     }),
//     headers:{
//       "Content-Type":"application/json"
//     } 
//   }
//   //console.log(fetchParameter)

//   fetch('http://localhost:3000/wishList', fetchParameter).then((response)=>{
//    console.log(response)
//   });
  
//  }
//  function getImage(evt){
//   const file = evt.target.files[0];
//   const fileReader = new FileReader();
//   fileReader.onload = e => {
//     wishImage = e.target.result;
//   }
// fileReader.readAsDataURL(file); 
//  }
// function getAndLoadWish(){
//   //
//   document.getElementById
// }



