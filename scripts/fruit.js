var prices = {
  apples: 3.5,
  bananas: 2.4,
  grapes: 4.9,
  oranges: 4.3
};
//toLocaleString('en-US', { style: 'currency', currency: 'USD' })
var initWallet = 100;

var userInventory = {
  /* User data on fruit. Inventory values include current amount of money, current number of each fruit owned, total number of buy & sell transactions for each fruit (applesTrans, etc.), and total amount of money involved in transactions for each fruit (applesSpent, etc.). Also includes a function for calculating average transaction price. */
  money: initWallet,
  apples: 0,
  applesSpent: 0,
  applesTrans: 0,
  bananas: 0,
  bananasSpent: 0,
  bananasTrans: 0,
  grapes: 0,
  grapesSpent: 0,
  grapesTrans: 0,
  oranges: 0,
  orangesSpent: 0,
  orangesTrans: 0,
  calcAvg: function(fruit){
    // Calculates the average transaction price for fruit purchases and sales.
    if (userInventory[fruit] === 0) {
      return "$0";
    } else {
      var output = userInventory[fruit + "Spent"] / userInventory[fruit + 'Trans'];
      return output.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
    }
  }
};

var fruitArray = ["apples", "bananas", "grapes", "oranges"];

var timeInterval = 15000;
// Time interval for prices to change, in milliseconds.

var totalTime = [5,1];
/* Variable totalTime includes total game time in minutes, and timer-second
time in seconds. */

$(document).ready(function(){
//  console.log('js/jq sourced');
  displayInventoryToDOM();
  displayMarketPricesToDOM();
  $('#finalMessage').hide();

  $(document).on('click', '.buyButton', function(){
    // Event listener that fires when you push a buy button.
    var purchased = $(this).attr('name');
//    console.log("You pressed:", purchased);

    if ( 0 < (userInventory.money - prices[purchased]) ) {
    recalcInventory(purchased);
    displayInventoryToDOM();
    }

  });

  $(document).on('click', '.sellButton', function(){
    // Event listener that fires when you push a sell button.
    var sold = $(this).attr('name');
//    console.log("You sold:", sold);

    if ( 0 !== userInventory[sold] ) {
    sellInventory(sold);
    displayInventoryToDOM();
    }

  });

  $(document).on('click', '#endGameButton', function(){
    /* Event listener that fires when you push the "End Game" button.
    This button also is converted into a "Reset Game" button at the end,
    and triggers page reload if pressed after the game is over.*/
    $('#time').html('GAME OVER!');

    if ($(this).attr("name") == "reset"  ){
  //    console.log("reset this joker!!!");
      location.reload();
    } else {
    endGame();
    }
  });

  function limitPrices(price){
    // Prevents sale prices from increasing above $9.99 or below $0.50.
    // console.log('in limitPrices');
    if (price < 0.5){
      return 0.5;
    } else if (price > 9.99){
      return 9.99;
    } else {
      return price;
    }
  }

  function sellInventory(sold){
    // Called by sell button event handler.
  //  console.log('in sellInventory with', sold);
    userInventory[sold]--;
    userInventory[sold + 'Trans']++;
    userInventory[sold + 'Spent'] += prices[sold];
    userInventory.money += prices[sold];


  }

  function recalcInventory(purchased){
    // Called by buy button event handler.
//    console.log('in recalcInventory with', purchased);

    userInventory[purchased]++;
    userInventory[purchased + 'Trans']++;
//    console.log('You now have ' + userInventory[purchased] + ' of ' + purchased);
    userInventory[purchased + 'Spent'] += prices[purchased];
//    console.log('item total spent| current price:', userInventory[purchased + 'Spent'], prices[purchased]);
    userInventory.money -= prices[purchased];
//    console.log('You have this much left: $' + userInventory.money);
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
//    console.log('in displayMarketPricesToDOM');

    $('#GrapePrice').html(prices.grapes.toLocaleString('en-US', { style: 'currency', currency: 'USD' }) );
    $('#BananaPrice').html(prices.bananas.toLocaleString('en-US', { style: 'currency', currency: 'USD' }) );
    $('#ApplePrice').html(prices.apples.toLocaleString('en-US', { style: 'currency', currency: 'USD' }) );
    $('#OrangePrice').html(prices.oranges.toLocaleString('en-US', { style: 'currency', currency: 'USD' }) );
  }

  var timerIDOne = setInterval(function(){
    // Updates prices every 15 seconds.
    //  console.log('interval triggered');

      console.log((Math.random() - .5));

      // Modifies each price by a random value between +0.5 and -0.5.

      prices.bananas = limitPrices( prices.bananas + Math.random() - 0.5 );
      prices.apples = limitPrices( prices.apples + Math.random() - 0.5 );
      prices.grapes = limitPrices( prices.grapes + Math.random() - 0.5 );
      prices.oranges = limitPrices( prices.oranges + Math.random() - 0.5 );

    displayMarketPricesToDOM();
  } , timeInterval);

  var timerIDTwo = setInterval(function(){
    // Updates visible game timer.
    totalTime[1]--;
    if (totalTime[1] < 0){
      totalTime[0]--;
      totalTime[1]=59;
    }
    var htmlString = totalTime[0] + 'm:' + totalTime[1] + 's';
    if (totalTime[0]<0){
      htmlString = 'TIME IS UP!!';
      endGame();
    }
    $('#time').html(htmlString);
  }, 1000);

  function endGame(){
    clearInterval(timerIDOne);
    clearInterval(timerIDTwo);
    // $('button').attr('disabled', 'true');
    for (i = 0; i < fruitArray.length; i++) {
      finalSale = userInventory[fruitArray[i]] * prices[fruitArray[i]];
//      console.log("Sell " + userInventory[fruitArray[i]] + " " + fruitArray[i] + " at $" + prices[fruitArray[i]] + " yields $" + finalSale + " profit!");
      userInventory.money += finalSale;
    }
    displayInventoryToDOM();
    $("#finalMessage").slideDown();
    $("#fruitsAndUserRows").slideToggle();
    $("#endGameButton").html("Reset Game");
    $("#endGameButton").attr("name", "reset");

    var resultMoney = (initWallet - userInventory.money) * -1;
    $('#gainedOrLost').html("Gained");
    if(resultMoney < 0){
      resultMoney *= -1;
      $('#gainedOrLost').html("Lost");
    }
    $('#finalMoney').html(resultMoney.toLocaleString('en-US', { style: 'currency', currency: 'USD' }) );


  }

});
