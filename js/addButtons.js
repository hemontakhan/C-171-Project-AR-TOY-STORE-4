AFRAME.registerComponent('store-buttons',{
init: function(){ 
    var orderButton = document.createElement('button');
    orderButton.innerHTML = 'ORDER BUTTON';
    orderButton.setAttribute('id','order-button');
    orderButton.setAttribute('class','btn btn-warning');

    var summaryButton = document.createElement('button');
    summaryButton.innerHTML = 'SUMMARY BUTTON';
    summaryButton.setAttribute('id','summary-button');
    summaryButton.setAttribute('class','btn btn-warning');

    var buttonDiv = document.getElementById('button-div');
    buttonDiv.appendChild(orderButton);
    buttonDiv.appendChild(summaryButton);
}
})