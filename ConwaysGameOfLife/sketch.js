// https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life
// Conway's Game of Life
// Rules:
// 1. Any live cell with fewer than two live neighbors dies, as if by underpopulation.
// 2. Any live cell with two or three live neighbors lives on to the next generation.
// 3. Any live cell with more than three live neighbors dies, as if by overpopulation.
// 4. Any dead cell with exactly three live neighbors becomes a live cell, as if by reproduction.

var cols;
var rows;
var cellSize = 20;

var gridArray = [];

function setup() {
	createCanvas(600, 400);
	cols = width / cellSize;
	rows = height / cellSize;
	
	// Create grid array
	gridArray = make2DArray(cols, rows);
	for(var i = 0; i < cols; i++) {
		for(var j = 0; j < rows; j++) {
			gridArray[i][j] = floor(random(2));
		}
	}	

	drawGrid();	
}

function draw() {
	background(51);

	checkRules();

	drawGrid();	
}

function drawGrid() {
	for(var i = 0; i < cols; i++) {
		for(var j = 0; j < rows; j++) {
			var x = i * cellSize;
			var y = j * cellSize;
			stroke(70);
			
			if(gridArray[i][j]){
				fill(0);
			}else{
				fill(255);
			}

			rect(x, y, cellSize - 1, cellSize -1);
		}
	}
}

function checkRules() {
	// For each element in the array, check the neighbours and check the rules

	var tempArray = make2DArray(cols, rows);
	for(var i = 0; i < cols; i++) {
		for(var j = 0; j < rows; j++) {
			
			numNeighbours = checkNeighbours(gridArray, i, j);

			var state = gridArray[i][j];

			if(state == 0 && numNeighbours == 3){
				tempArray[i][j] = 1
			} else if(state == 1 && (numNeighbours < 2 || numNeighbours > 3)){
				tempArray[i][j] = 0;
			} else{
				tempArray[i][j] = state;
			}
		}
	}	

	gridArray = tempArray;
}

function make2DArray(cols, rows) {
	var arr = new Array(cols);
	for(var i = 0; i < arr.length; i++) {
		arr[i] = new Array(rows);
	}

	return arr;
}

function checkNeighbours(arr, x, y){
	var numNeighbours = 0;

	// Check each of the neighbours
	for(var i = -1; i < 2; i++){
		for(var j = -1; j < 2; j++){

			var col = (x + i + cols) % cols;
			var row = (y + j + rows) % rows;

			numNeighbours += arr[col][row];
		}
	}
	
	numNeighbours -= arr[x][y];
	return numNeighbours;
}