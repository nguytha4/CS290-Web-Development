document.addEventListener('DOMContentLoaded', loadTable);

function loadTable() {
  var req = new XMLHttpRequest();
  var url = "http://flip3.engr.oregonstate.edu:8743/"
  req.open("GET", url, true);
  req.addEventListener('load', function() {
    if (req.status >= 200 && req.status < 400) {
      var response = JSON.parse(req.responseText);
      console.log(response);
      loadRows(response);
    } else {
      console.log("There was a network error: " + req.status + ' ' + req.statusText);
    }
  });
  req.send(null);
}

function loadRows(workouts) {
	
	// For creating each row based on JSON array
	for (var i = 0; i < workouts.length; i++) {
		
		var num = workouts[i].id;
		var idAsNum = num.toString();
		
		// Create a row element
		var bodyRow = document.createElement("tr");
		bodyRow.setAttribute('id', num);
			
		// Create the data cells for the row
		var bodyCell1 = document.createElement("td");
		bodyCell1.textContent = workouts[i].name;
		bodyCell1.style.border = "thin solid";
		bodyRow.appendChild(bodyCell1);
		
		var bodyCell2 = document.createElement("td");
		bodyCell2.textContent = workouts[i].reps;
		bodyCell2.style.border = "thin solid";
		bodyRow.appendChild(bodyCell2);
		
		var bodyCell3 = document.createElement("td");
		bodyCell3.textContent = workouts[i].weight;
		bodyCell3.style.border = "thin solid";
		bodyRow.appendChild(bodyCell3);
		
		var bodyCell4 = document.createElement("td");
		bodyCell4.textContent = workouts[i].newdate;
		bodyCell4.style.border = "thin solid";
		bodyRow.appendChild(bodyCell4);
		
		var bodyCell5 = document.createElement("td");
		bodyCell5.textContent = workouts[i].lbs;
		bodyCell5.style.border = "thin solid";
		bodyRow.appendChild(bodyCell5);
		
		// Create buttons
		
		var editBtn = document.createElement("button");
		var editBtnText = document.createTextNode("Edit");
		var injectFunction = "editWorkout(" + idAsNum + ")";
		editBtn.setAttribute("onclick",injectFunction);
		editBtn.appendChild(editBtnText);
		bodyRow.appendChild(editBtn);
		
		var delBtn = document.createElement("button");
		var delBtnText = document.createTextNode("Delete");
		var injectFunction = "deleteRow(" + idAsNum + ")";
		delBtn.setAttribute("onclick",injectFunction);
		delBtn.appendChild(delBtnText);
		bodyRow.appendChild(delBtn);
		
		
		// Create forms 
		
		/*
		var editForm = document.createElement("form");	// Create form for the edit and delete buttons
		editForm.setAttribute('class', 'edit');
	
		var delForm = document.createElement("form");	// Create form for the edit and delete buttons
		delForm.setAttribute('class', 'del');
		delForm.setAttribute('action', "http://flip3.engr.oregonstate.edu:8743/delete");
		delForm.setAttribute('method', "POST");
	
		var hide = document.createElement("input"); //input element, hidden id
		hide.setAttribute('type',"hidden");
		hide.setAttribute('name','id');
		hide.setAttribute('value',num);
		
		var edit = document.createElement("input"); //input element, Edit button
		edit.setAttribute('type',"submit");
		edit.setAttribute('value',"Edit");
		
		var del = document.createElement("input"); //input element, Delete button
		del.setAttribute('type',"submit");
		del.setAttribute('value',"Delete");
		
		editForm.appendChild(hide); // Append the hidden element, and edit and delete buttons
		delForm.appendChild(hide);
		
		editForm.appendChild(edit);
		delForm.appendChild(del);
		
		// Add forms to rows
		
		bodyRow.appendChild(editForm);
		bodyRow.appendChild(delForm);
		*/
		// Add row to table
		
		document.getElementById("workoutTable").appendChild(bodyRow);
	}
}

function addWorkout() {
  var nameIn = document.getElementById('name').value;
  var repsIn = document.getElementById('reps').value;
  var weightIn = document.getElementById('weight').value;
  var dateIn = document.getElementById('date').value;
  var unitIn = document.getElementById('lbs').value;
  

  if(nameIn == "") {
    alert("The exercise name is blank!");
  } else if (repsIn == "") {
    alert("The number of reps is blank!");
  } else if (weightIn == "") {
    alert("The amount of weight is blank!");
  } else if (dateIn == "") {
    alert("The date is blank!");
  } else if (unitIn == "") {
    alert("Lbs is blank!!");
  } else {
      
	  var req = new XMLHttpRequest();	  
      var payload = {a: nameIn, b: repsIn, c: weightIn, d: dateIn, e: unitIn};
      var url = "http://flip3.engr.oregonstate.edu:8743/insert"
      req.open("POST", url, true);
      req.setRequestHeader('Content-Type', 'application/json');
      req.addEventListener('load', function() {
        if (req.status >= 200 && req.status < 400) {
          var response = JSON.parse(req.responseText);
          console.log(response);
          loadRows(response);
        } else {
          console.log("There was a network error: " + req.status + ' ' + req.statusText);
        }
      });
      req.send(JSON.stringify(payload));
  }
}

function deleteWorkout(x) {
	
	var req = new XMLHttpRequest();	  
    
	var payload = {id: x};
    
	var url = "http://flip3.engr.oregonstate.edu:8743/delete"
    req.open("POST", url, true);
    req.setRequestHeader('Content-Type', 'application/json');
    req.addEventListener('load', function() {
      if (req.status >= 200 && req.status < 400) {
        var response = JSON.parse(req.responseText);
        console.log(response);
      } else {
        console.log("There was a network error: " + req.status + ' ' + req.statusText);
        }
      });
      req.send(JSON.stringify(payload));
	  
}

function deleteRow(y) {
	var table = document.getElementById("workoutTable");
	var rowCount = table.rows.length;
	for (var i = 0; i < rowCount; i++) {
		var row = table.rows[i];
		if (row.id == y) {
			table.deleteRow(i);
			i = rowCount;
		}
	}
	deleteWorkout(y);
}

function editWorkout(z) {
	
	var nameHolder;
	var repsHolder;
	var weightHolder;
	var dateHolder;
	var lbsHolder;
	
	var rowIndex;
	
	// Get the row values based on id
	var table = document.getElementById("workoutTable");
	var rowCount = table.rows.length;
	for (var v = 0; v < rowCount; v++) {
		var row = table.rows[v];
		if (row.id == z) {
			nameHolder = row.cells[0].innerHTML;
			repsHolder = row.cells[1].innerHTML;
			weightHolder = row.cells[2].innerHTML;
			dateHolder = row.cells[3].innerHTML;
			lbsHolder = row.cells[4].innerHTML;
			rowIndex = v;
			v = rowCount;
		}
	}
	
	var newdate = dateHolder.split("-").reverse();
	
	var tmp = newdate[2];
	newdate[2] = newdate[1];
	newdate[1] = tmp;
	newdate = newdate.join("-");
	
	var newdateString = String(newdate);
	
	console.log(nameHolder);
	console.log(repsHolder);
	console.log(weightHolder);
	console.log(dateHolder);
	console.log(newdate);
	console.log(lbsHolder);
	
	// Create the header
	var editHead = document.createElement("h1");
	editHead.setAttribute('id',"editHead");
	var editHeadText = document.createTextNode("Edit Workout")
	editHead.appendChild(editHeadText);
	document.body.appendChild(editHead);
	
	// Create the form and the fieldset
	var editForm = document.createElement("form");
	editForm.setAttribute('id',"editForm");
	var editFormSet = document.createElement("fieldset");
	
	// Create the legend and append it to the fieldset
	var editFormLegend = document.createElement("legend");
	editFormLegend.innerHTML = "Edit workout:";
	editFormSet.appendChild(editFormLegend);
	
	// Name
	
	// Create label
	var nameLabel = document.createElement("label");
	nameLabel.setAttribute("for","editName");
	nameLabel.innerHTML = "Name: ";
	editFormSet.appendChild(nameLabel);
		
	// Create input
	var nameInput = document.createElement("input");
	nameInput.setAttribute('type',"text");
	nameInput.setAttribute('id',"editName");
	nameInput.setAttribute('value',nameHolder);
	editFormSet.appendChild(nameInput);
	
	// Reps
	
	// Create label
	var repsLabel = document.createElement("label");
	repsLabel.setAttribute("for","editReps");
	repsLabel.innerHTML = " Reps: ";
	editFormSet.appendChild(repsLabel);
		
	// Create input
	var repsInput = document.createElement("input");
	repsInput.setAttribute('type',"number");
	repsInput.setAttribute('id',"editReps");
	repsInput.setAttribute('value',repsHolder);
	editFormSet.appendChild(repsInput);
	
	
	// Weight
	
	// Create label
	var weightLabel = document.createElement("label");
	weightLabel.setAttribute("for","editWeight");
	weightLabel.innerHTML = " Weight: ";
	editFormSet.appendChild(weightLabel);
		
	// Create input
	var weightInput = document.createElement("input");
	weightInput.setAttribute('type',"number");
	weightInput.setAttribute('id',"editWeight");
	weightInput.setAttribute('value',weightHolder);
	editFormSet.appendChild(weightInput);
	
	
	
	// Date
	
	// Create label
	var dateLabel = document.createElement("label");
	dateLabel.setAttribute("for","editDate");
	dateLabel.innerHTML = " Date: ";
	editFormSet.appendChild(dateLabel);
		
	// Create input
	var dateInput = document.createElement("input");
	dateInput.setAttribute('type',"date");
	dateInput.setAttribute('id',"editDate");
	dateInput.setAttribute('value',newdateString);
	editFormSet.appendChild(dateInput);
	
	
	
	// Lbs
	
	// Create label
	var lbsLabel = document.createElement("label");
	lbsLabel.setAttribute("for","editlbs");
	lbsLabel.innerHTML = " lbs (1 for true, 0 for false): ";
	editFormSet.appendChild(lbsLabel);
		
	// Create input
	var lbsInput = document.createElement("input");
	lbsInput.setAttribute('type',"number");
	lbsInput.setAttribute('id',"editlbs");
	lbsInput.setAttribute('value',lbsHolder);
	editFormSet.appendChild(lbsInput);
	
	
	// Final
	
	// Append fieldset to form and form to body
	editForm.appendChild(editFormSet);
	document.body.appendChild(editForm);
	
	// Add button
	
	var breakTag = document.createElement("br");
	document.body.appendChild(breakTag);
	
	var editWorkout = document.createElement("button");
	editWorkout.setAttribute('id',"editWorkout");
	editWorkout.setAttribute('type',"button");
	editWorkout.innerHTML = "Edit Workout";
	editWorkout.setAttribute("onclick","sendUpdate(" + z + ")");
	document.body.appendChild(editWorkout);
	
}

function sendUpdate(secretID) {
  var nameOut = document.getElementById('editName').value;
  var repsOut = document.getElementById('editReps').value;
  var weightOut = document.getElementById('editWeight').value;
  var dateOut = document.getElementById('editDate').value;
  var unitOut = document.getElementById('editlbs').value;
  
  var req = new XMLHttpRequest();	  
  var payload = {name: nameOut, reps: repsOut, weight: weightOut, date: dateOut, lbs: unitOut, id: secretID};
  var url = "http://flip3.engr.oregonstate.edu:8743/safe-update"
  req.open("POST", url, true);
  req.setRequestHeader('Content-Type', 'application/json');
  req.addEventListener('load', function() {
    if (req.status >= 200 && req.status < 400) {
       var response = JSON.parse(req.responseText);
       console.log(response);
       //loadRows(response);
	   console.log("SUPER SUCCESS!!!");
	   updateRow(secretID, response);
    } else {
       console.log("There was a network error: " + req.status + ' ' + req.statusText);
      }
  });
  req.send(JSON.stringify(payload));
  
}

function updateRow (secretID, workouts) {
	
	console.log(workouts);
	console.log(workouts[0].name);
	console.log(secretID);
	
	var table = document.getElementById("workoutTable");
	var rowCount = table.rows.length;
	for (var i = 0; i < rowCount; i++) {
		var row = table.rows[i];
		if (row.id == secretID) {
			row.cells[0].innerHTML = workouts[0].name;
			row.cells[1].innerHTML = workouts[0].reps;
			row.cells[2].innerHTML = workouts[0].weight;
			row.cells[3].innerHTML = workouts[0].newdate;
			row.cells[4].innerHTML = workouts[0].lbs;
			i = rowCount;
		}
	}
	
	deleteEdit();

}

function deleteEdit () {
	var delBtn = document.getElementById("editWorkout");
	delBtn.parentNode.removeChild(delBtn);
	
	var delForm = document.getElementById("editForm");
	delForm.parentNode.removeChild(delForm);
	
	var delHeader = document.getElementById("editHead");
	delHeader.parentNode.removeChild(delHeader);
}