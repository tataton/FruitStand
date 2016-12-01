var prices = {
  apples: 5,
  bananas: 5,
  grapes: 5,
  oranges: 5
};

var initWallet = 100;

var userInventory = {
  money: initWallet,
  apples: 0,
  applesSpent: 0,
  bananas: 0,
  bananasSpent: 0,
  grapes: 0,
  grapesSpent: 0,
  oranges: 0,
  orangesSpent: 0,
  calcAvg: function(fruit){
    if (userInventory[fruit] === 0) {
      return 0;
    } else {
      return userInventory[fruit + "Spent"] / userInventory[fruit];
    }
  }
};

var timeInterval = 15000;

$(document).ready(function(){
  console.log('js/jq sourced');

  setInterval(changePrices, timeInterval);
  //fires every 15 seconds

  function changePrices() {
    //changes fruit prices every 15 seconds

  }

  $(document).on('click', '.buyButton', function(){
    // Event listener that fires when you push a buy button.
    var purchased = $(this).attr('name');
    console.log("You pressed:", purchased);
    recalcInventory(purchased);
    displayInventoryToDOM();


  });

function recalcInventory(purchased){
  console.log('in recalcInventory with', purchased);

  userInventory[purchased]++;
  console.log('You now have ' + userInventory[purchased] + ' of ' + purchased);
  userInventory[purchased + 'Spent'] += prices[purchased];
  console.log('item total spent| current price:', userInventory[purchased + 'Spent'], prices[purchased]);
  userInventory.money -= prices[purchased];
  console.log('You have this much left: $' + userInventory.money);
}

function displayInventoryToDOM(){
  console.log('in displayInventoryToDOM');
  var outputString = "";
  outputString += '<li>' + userInventory.apples + ' apples ($' + userInventory.calcAvg('apples') + ')</li>';
  outputString += '<li>' + userInventory.bananas + ' bananas ($' + userInventory.calcAvg('bananas') + ')</li>';
  outputString += '<li>' + userInventory.grapes + ' grapes ($' + userInventory.calcAvg('grapes') + ')</li>';
  outputString += '<li>' + userInventory.oranges + ' oranges ($' + userInventory.calcAvg('oranges') + ')</li>';
  $('#purchasedItems').html(outputString);
  console.log(userInventory.money, toString(userInventory.money));
  $('#moneyRemaining').html(userInventory.money);
  $('#moneySpent').html(initWallet - userInventory.money);
}

});
