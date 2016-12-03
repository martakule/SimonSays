$(document).ready(function() {

  function startGame (){
    var sequence = [];
    newTurn();

  //Display message and after 2 s call playSequence and yourTurn in succession
  	function newTurn() {
  	 	$('#startgame').text('Pay attention!');
  	 	setTimeout(function(){
  	 		playSequence();
  		}, 2000);
  	}

  // Generate a list of random numbers 0-3 and play them on the colour wheel
  	function playSequence() {
  		var tile = Math.floor(Math.random() * 4);
  		console.log('Game tile: '+tile);
  		sequence.push(tile);
  		console.log('Game sequence:' +sequence+" Length: " +sequence.length);
  		var i = 0;
  		var times = sequence.length;
  		function loop () { // I found this way on the internet to add delay between tiles
  			extinguish.call($('.square').eq(sequence[i]));
  			i++;
  			//console.log(i);
  				if (i<times) {
  					setTimeout(loop, 1000);
  				}
  				else if (i===times) { // And I added this to move to the next function
  					setTimeout(yourTurn, 1000);
  				}
  			}
  		loop();
  	}

  // Turn colour tiles grey for .4 second
  	function extinguish(){
  		$(this).addClass('extinguish').delay(400).queue(function(){
  	    	$(this).removeClass('extinguish').dequeue();
  		});
  	}

  // Display a prompt for the user to click the tiles, add clicks to the list
  	function yourTurn(){
  		//console.log('yourTurn');
  		$('#startgame').text('Click the tiles in the same order.');
  		$('.square').on('click', function() {
  			extinguish.call($(this));
  			var userTile = $(this).index();
  			//console.log("User click: " +userTile);
  			//userSequence.push(userTile);
  			//console.log("User sequence: " +userSequence+" Length: " +userSequence.length);
        for (i = 0; i < sequence.length; i++) {
          if (userTile !== sequence[i]) {
            //console.log(i);
            setTimeout(gameOver, 1000);}
          else if (userTile === sequence[i]) {
            i++;}
          else if (i === sequence.length){
            $('#startgame').text('Good job!');}
            newTurn();
        }
        });
  	}


  //Display message that the user sequence was incorrect; display button to play again
  	function gameOver(){
  		$('#startgame').text('Game over! You got the order wrong.').after('<div id="playagain" class="startgame playagain">Play again</div>');
  		$('#playagain').on('click',function(){
  			$(this).remove();
  			return startGame();
  		});
  	}
 }

  //Button to start the game on click
  $('#startgame').on('click', startGame);
});
