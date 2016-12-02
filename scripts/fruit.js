var prices = {
  apples: 3.5,
  bananas: 2.4,
  grapes: 4.9,
  oranges: 4.3
};
//toLocaleString('en-US', { style: 'currency', currency: 'USD' })
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
      return "$0";
    } else {
      var output = userInventory[fruit + "Spent"] / userInventory[fruit];
      return output.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
    }
  }
};

var timeInterval = 15000;
var totalTime = [5,1];

$(document).ready(function(){
  console.log('js/jq sourced');
  displayInventoryToDOM();
  displayMarketPricesToDOM();


  $(document).on('click', '.buyButton', function(){
    // Event listener that fires when you push a buy button.
    var purchased = $(this).attr('name');
    console.log("You pressed:", purchased);

    if ( 0 < (userInventory.money - prices[purchased]) ) {
    recalcInventory(purchased);
    displayInventoryToDOM();
    }

  });

  $(document).on('click', '.sellButton', function(){
    // Event listener that fires when you push a buy button.
    var sold = $(this).attr('name');
    console.log("You sold:", sold);

    if ( 0 !== userInventory[sold] ) {
    sellInventory(sold);
    displayInventoryToDOM();
    }

  });

function limitPrices(price){
  // console.log('in limitPrices');
  if (price < .5){
    return .5;
  } else if (price > 9.99){
    return 9.99;
  } else {
    return price;
  }
}

function sellInventory(sold){
  console.log('in sellInventory with', sold);
  userInventory[sold]--;
  userInventory[sold + 'Spent'] -= prices[sold];
  userInventory.money += prices[sold];


}

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
  $('#applesNo').html(userInventory.apples);
  $('#applesAve').html(userInventory.calcAvg('apples') );

  $('#grapesNo').html(userInventory.grapes);
  $('#grapesAve').html(userInventory.calcAvg('grapes') );

  $('#bananasNo').html(userInventory.bananas);
  $('#bananasAve').html(userInventory.calcAvg('bananas') );

  $('#orangesNo').html(userInventory.oranges);
  $('#orangesAve').html(userInventory.calcAvg('oranges') );

  $('#moneyRemaining').html(userInventory.money.toLocaleString('en-US', { style: 'currency', currency: 'USD' }) );
  var spent = initWallet - userInventory.money;
  $('#spendOrMade').html("Spent");
  if(spent < 0){
    spent *= -1;
    $('#spendOrMade').html("Made");
  }
  $('#moneySpent').html(spent.toLocaleString('en-US', { style: 'currency', currency: 'USD' }) );

}

function displayMarketPricesToDOM(){
  console.log('in displayMarketPricesToDOM');

  $('#GrapePrice').html(prices.grapes.toLocaleString('en-US', { style: 'currency', currency: 'USD' }) );
  $('#BananaPrice').html(prices.bananas.toLocaleString('en-US', { style: 'currency', currency: 'USD' }) );
  $('#ApplePrice').html(prices.apples.toLocaleString('en-US', { style: 'currency', currency: 'USD' }) );
  $('#OrangePrice').html(prices.oranges.toLocaleString('en-US', { style: 'currency', currency: 'USD' }) );
}

setInterval(function(){
  console.log('interval triggered');

    prices.bananas = limitPrices( prices.bananas + (Math.floor((Math.random() * 2) + 1) -1.5) );
    prices.apples = limitPrices( prices.apples + (Math.floor((Math.random() * 2) + 1) -1.5) );
    prices.grapes = limitPrices( prices.grapes + (Math.floor((Math.random() * 2) + 1) -1.5) );
    prices.oranges = limitPrices( prices.oranges + (Math.floor((Math.random() * 2) + 1) -1.5) );

  displayMarketPricesToDOM();
} , timeInterval);

setInterval(function(){
  totalTime[1]--;
  if (totalTime[1] < 0){
    totalTime[0]--;
    totalTime[1]=59;
  }
  var htmlString = totalTime[0] + 'm:' + totalTime[1] + 's'
  if (totalTime[0]<0){
    htmlString = 'TIME IS UP!!';
  }
  $('#time').html(htmlString);
}, 1000);

});
