var desk;
const human = 'X';
const computer = 'O';
const winnerCombination = [ [0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]]
const fields = document.querySelectorAll('.field');

startGame();
function startGame() 
{
	document.querySelector(".endgame").style.display= "none";
	desk = Array.from(Array(9).keys());
	
	for (var i = 0; i < fields.length; i++)
	{
		fields[i].innerText = '';
		fields[i].style.removeProperty('background-color');
		fields[i].addEventListener('click',turnClick,false);
	}
	}

	function turnClick(square)
	{
		if(typeof desk[square.target.id] == 'number'){
        turn(square.target.id, human);
        if(!checkTie()) turn(bestSpot(), computer); 
	}
}

	function turn(squareID, player)
	{

		desk[squareID] = player;
        document.getElementById(squareID).innerText = player;
        let gameWon = checkWin(desk, player)
        if(gameWon) gameOver(gameWon)
}

function checkWin(board, player){
        let plays = board.reduce((a,e,i) =>
        	(e === player) ? a.concat(i) : a,[]);
        let gameWon = null;
for(let [index, win] of winnerCombination.entries()) 
{
   if(win.every(elem => plays.indexOf(elem) > -1))
   {
   	gameWon = {index: index, player: player};
   	break;
   }
}
return gameWon;
}

function gameOver(gameWon)
{
	for(let index of winnerCombination[gameWon.index])
	{
		document.getElementById(index).style.backgroundColor=
		gameWon.player == human ? "gray" : "silver";
    document.getElementById(index).style.transition="0.5s";
    }

    for(var i =0;i<fields.length; i++)
    {
    	fields[i].removeEventListener('click', turnClick,false);
    }
    declareWinner(gameWon.player == human ? "Congratulations You Win" : "You Lose :(");
}

function declareWinner(who)
{
document.querySelector(".endgame").style.display = "block";
  document.querySelector(".endgame .text").innerText = who;
}

function emptySquares()
{
	return desk.filter(s => typeof s == 'number');
}

function bestSpot()
{
	return minimax(desk,computer).index;
}

function checkTie()
{
	if(emptySquares().length == 0)
	{
		for (var i = 0; i<fields.length; i++)
		{
			fields[i].style.backgroundColor = "green";
			fields[i].removeEventListener('click',turnClick, false);
		}
		declareWinner("Not Bad Draw!")
		return true;
	}
	return false;
}

function minimax(newBoard, player) {
	var availSpots = emptySquares();
	
	if (checkWin(newBoard, human)) {
		return {score: -10};
	} else if (checkWin(newBoard, computer)) {
		return {score: 10};
	} else if (availSpots.length === 0) {
		return {score: 0};
	}
	var moves = [];
	for (var i = 0; i < availSpots.length; i++) {
		var move = {};
		move.index = newBoard[availSpots[i]];
		newBoard[availSpots[i]] = player;

		if (player == computer) {
			var result = minimax(newBoard, human);
			move.score = result.score;
		} else {
			var result = minimax(newBoard, computer);
			move.score = result.score;
		}

		newBoard[availSpots[i]] = move.index;
		moves.push(move);
	}

	var bestMove;
	if(player === computer) {
		var bestScore = -10000;
		for(var i = 0; i < moves.length; i++) {
			if (moves[i].score > bestScore) {
				bestScore = moves[i].score;
				bestMove = i;
			}
		}
	} else {
		var bestScore = 10000;
		for(var i = 0; i < moves.length; i++) {
			if (moves[i].score < bestScore) {
				bestScore = moves[i].score;
				bestMove = i;
			}
		}
	}
	return moves[bestMove];
}