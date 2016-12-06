$(document).ready(function() {

var sequence = [];

// Reset the sequence array and play new round
function startGame (){
sequence = [];
  newTurn();
}

// Display round number and delay playing the sequence
function newTurn() {
 	$('#startgame').text('Round ' + (sequence.length + 1));
 	setTimeout(function(){
 		playSequence();
	}, 1000);
}

// Generate a random number, play it on the wheel with delay
// Add that number to the sequence array and call user's turn
function playSequence() {
	var tile = Math.floor(Math.random() * 4);
	console.log('Game tile: '+tile);
	sequence.push(tile);
	console.log('Game sequence: ' +sequence);
	var i = 0;
	var times = sequence.length;
	function delayLoop () { //Found this way on the internet to add delay between tiles
		//extinguish.call($('.square').eq(sequence[i]));
		extinguish.call($('.square[data-square='+sequence[i]+']'));
		i++;
		//console.log(i);
			if (i<times) {
				setTimeout(delayLoop, 800);
			}
			else if (i==times) {//And I added this to move to the next function
				setTimeout(yourTurn, 800);
			}
		}
	delayLoop();
}

// Turn colour tiles grey for flickering effect
function extinguish(){
	$(this).addClass('extinguish').delay(300).queue(function(){
    	$(this).removeClass('extinguish').dequeue();
	});
}

// Prompt the user to repeat sequence
// Compare user input against sequence array with each click
// If the click is incorrect, call game over
// Disable colour wheel for clicks when sequence number reached
// If number of clicks is the same as sequence, call new round
function yourTurn(){
	var clickNo = 0;
	$('.square').unbind('click').removeClass("disabled").addClass("enabled");
	$('#startgame').text('Click the tiles in the same order.');
	$('.square').on('click', function() {
		extinguish.call($(this));
		console.log('User tile: ' + ($(this).attr('data-square')));
		if($(this).attr('data-square') != sequence[clickNo]) {
			gameOver();
			return true;
		}
		else if(clickNo + 1 == sequence.length) {
			$('.square').unbind('click');
			setTimeout(function(){
 				console.log('Good job!');
				$('#startgame').text('Good job!');
				setTimeout(newTurn, 2000);
			}, 1000);
		}
	clickNo++;
	});
}

// Display message, lock the red button, and display green button to play again
function gameOver(){
	$('#startgame').text('Game over! You got the order wrong.').after('<div id="playagain" class="startgame playagain">Play again</div>');
	$(".square").unbind('click').addClass("disabled");
	$('#playagain').on('click',function(){
		$(this).remove();
		startGame();
	});
}

// Start game on click and disable button for clicks
$('#startgame').on('click', function(){
	$(this).addClass("disabled");
	startGame();
});

});
