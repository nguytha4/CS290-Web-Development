// Name: Thanh Nguyen
// Date: 5/1/18
// Class: CS290 - Spring 2018

// --------------------------------------------------------------------------------------------

// Function to create the table
function buildTable() {
	
	// Create the table object
	var table = document.createElement("table");
	
// Create the table's header row
	
	// Create a table row
	var headRow = document.createElement("tr");
	
	// Create 4 header cells to put into the top row
	for (var i = 1; i < 5; i++) {
		var headCell = document.createElement("th")
		headCell.textContent = "Header " + i;
		headCell.style.border = "thin solid";
		headRow.appendChild(headCell);
	}
	
	// Append the header row to the table
	table.appendChild(headRow);

// Create the table body (3 rows x 4 cells)

	// Create a nested for loop to create the rest of the cells
	for (var s = 1; s < 4; s++) {
	
		// Create a table row
		var bodyRow = document.createElement("tr");
	
		// Create the data cells for the row
		for (var t = 1; t < 5; t++) {
			var bodyCell = document.createElement("td");
			bodyCell.textContent = t + ", " + s;
			bodyCell.style.border = "thin solid";
			bodyRow.appendChild(bodyCell);
		}
		
		// Append the data row to the table
		table.appendChild(bodyRow);
	}

	// Create a thicker border for the top-left cell to start with
	table.children[1].children[0].style.border = "solid";

	// Return the table
	return table;
}

// --------------------------------------------------------------------------------------------

// Function to add buttons
function buttons() {
	
	// Up button
	var upBtn = document.createElement("BUTTON");
	var upBtnText = document.createTextNode("Up");
	upBtn.id = 'upBtnID';
	upBtn.appendChild(upBtnText);
	document.body.appendChild(upBtn);
	
	// Down button
	var downBtn = document.createElement("BUTTON");
	var downBtnText = document.createTextNode("Down");
	downBtn.id = 'downBtnID';
	downBtn.appendChild(downBtnText);
	document.body.appendChild(downBtn);
	
	// Left button
	var leftBtn = document.createElement("BUTTON");
	var leftBtnText = document.createTextNode("Left");
	leftBtn.id = 'leftBtnID';
	leftBtn.appendChild(leftBtnText);
	document.body.appendChild(leftBtn);
	
	// Right button
	var rightBtn = document.createElement("BUTTON");
	var rightBtnText = document.createTextNode("Right");
	rightBtn.id = 'rightBtnID';
	rightBtn.appendChild(rightBtnText);
	document.body.appendChild(rightBtn);
	
	// Mark button
	var markBtn = document.createElement("BUTTON");
	var markBtnText = document.createTextNode("Mark Cell");
	markBtn.id = 'markBtnID';
	markBtn.appendChild(markBtnText);
	document.body.appendChild(markBtn);
}

// --------------------------------------------------------------------------------------------

// Functions for clicking buttons
function upClick (coordIn, data) {
	// If already at top row, do nothing
	if (coordIn[1] == 1)
		return;
	else {
		// Change the border of the current cell back to thin
		data.children[coordIn[1]].children[coordIn[0]].style.border = "thin solid";
		
		// Decrement the y-coordinate
		coordIn[1]--;
		
		// Change the border of the new cell to thicker
		data.children[coordIn[1]].children[coordIn[0]].style.border = "solid";
	}
}

function downClick (coordIn, data) {
	// If already at bottom row, do nothing
	if (coordIn[1] == 3)
		return;
	else {
		// Change the border of the current cell back to thin
		data.children[coordIn[1]].children[coordIn[0]].style.border = "thin solid";
		
		// Increment the y-coordinate
		coordIn[1]++;
		
		// Change the border of the new cell to thicker
		data.children[coordIn[1]].children[coordIn[0]].style.border = "solid";
	}
}

function leftClick (coordIn, data) {
	// If already at left-most column, do nothing
	if (coordIn[0] == 0)
		return;
	else {
		// Change the border of the current cell back to thin
		data.children[coordIn[1]].children[coordIn[0]].style.border = "thin solid";
		
		// Decrement the x-coordinate
		coordIn[0]--;
		
		// Change the border of the new cell to thicker
		data.children[coordIn[1]].children[coordIn[0]].style.border = "solid";
	}
}

function rightClick (coordIn, data) {
	// If already at right-most column, do nothing
	if (coordIn[0] == 3)
		return;
	else {
		// Change the border of the current cell back to thin
		data.children[coordIn[1]].children[coordIn[0]].style.border = "thin solid";
		
		// Decrement the x-coordinate
		coordIn[0]++;
		
		// Change the border of the new cell to thicker
		data.children[coordIn[1]].children[coordIn[0]].style.border = "solid";
	}
}

function markCell (coordIn, data) {
	// Highlight the background of the current cell to yellow
	data.children[coordIn[1]].children[coordIn[0]].style.backgroundColor = "yellow";
}

// --------------------------------------------------------------------------------------------

// Call the functions
var masterTable = buildTable();				// Create a variable for the table
document.body.appendChild(masterTable);		// Append the table to the HTML document
buttons();									// Create the buttons

var coord = [0, 1];							// Array to hold the x, y coordinate

// Create button click events that call the click functions to change the border to imitate traversing through table and highlighting cells
document.getElementById("upBtnID").addEventListener("click", function() { upClick(coord, masterTable); });
document.getElementById("downBtnID").addEventListener("click", function() { downClick(coord, masterTable); });
document.getElementById("leftBtnID").addEventListener("click", function() { leftClick(coord, masterTable); });
document.getElementById("rightBtnID").addEventListener("click", function() { rightClick(coord, masterTable); });
document.getElementById("markBtnID").addEventListener("click", function() { markCell(coord, masterTable); });