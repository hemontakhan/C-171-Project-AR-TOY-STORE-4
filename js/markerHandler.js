var shopId = null;

AFRAME.registerComponent('marker-handler',{
 init: async function(){
  if(shopId === null){
     this.askShopId()
  }

  var toys = await this.getToy()

  this.el.addEventListener('markerFound',() => {
   if(shopId !== null){
      var markerId = this.el.id
      this.handleMarkerFound(toys,markerId);
   }
  })

  this.el.addEventListener('markerLost',() => {
    this.handleMarkerLost();
  })
 },
 askShopId: function(){
   var iconUrl = 'https://cdn2.iconfinder.com/data/icons/retail-business/50/ToyStore-512.png';
   swal({
     title: 'Welcome To Toy Store',
     icon: iconUrl,
     content:{
        element: 'input',
        attributes:{
         placeholder: 'Type a id, For example: u01',
         type: 'string',
        }
     },
     closeOnClickOutside: false,
   }).then(inputValue =>{
      shopId = inputValue;
   })

 },
 handleMarkerFound: function(toys,markerId){

   var toy = toys.filter(toy => toy.id === markerId)[0]

   var model = document.querySelector(`#model-${toy.id}`);
   model.setAttribute("position", toy.model_geometry.position);
   model.setAttribute("rotation", toy.model_geometry.rotation);
   model.setAttribute("scale", toy.model_geometry.scale);

   model.setAttribute('visible',true);

   var infoPlane = document.querySelector(`#main-plane-${toy.id}`)
   infoPlane.setAttribute('visible',true)

   var priceTag = document.querySelector(`#price-plane-${toy.id}`)
   priceTag.setAttribute('visible',true)

   var orderButton = document.getElementById('order-button');
   var summaryButton = document.getElementById('summary-button')

   orderButton.addEventListener('click',() => {
     this.handleOrder();

     swal({
        icon: 'success',
        title: 'Thanks For your order',
        text: 'Your order will be delivered soon',
        timer: 2000,
        buttons: false
     })
   })

   summaryButton.addEventListener('click',() => {
     this.handleOrderSummary();


   })
 },
 getToy: async function(){
   return await firebase
    .firestore()
    .collections('toys')
    .get()
    .then(snap => {
      return snap.docs.map(doc => doc.data)
    })
 },
 handleMarkerLost: function(){
  var buttonDiv = document.getElementById('button-div');
  buttonDiv.style.display = none;
 }
})