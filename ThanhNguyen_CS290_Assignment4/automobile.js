// Name: Thanh Nguyen
// Date: 4/28/18
// Class: CS290 - Spring 2018

// ******************************************************************************************************************************************

// function definition of an automobile
function Automobile( year, make, model, type ){
    this.year = year; 	//integer (ex. 2001, 1995)
    this.make = make; 	//string  (ex. Honda, Ford)
    this.model = model; //string  (ex. Accord, Focus)
    this.type = type; 	//string  (ex. Pickup, SUV)
}

Automobile.prototype.logMe = function(z) {
	if (z) {
		// year make model type
		console.log(this.year + " " + this.make + " " + this.model + " " + this.type);
	}
	else
	{
		// year make model
		console.log(this.year + " " + this.make + " " + this.model);
	}
}

// array of automobiles
var automobiles = [ 
    new Automobile(1995, "Honda", "Accord", "Sedan"),
    new Automobile(1990, "Ford", "F-150", "Pickup"),
    new Automobile(2000, "GMC", "Tahoe", "SUV"),
    new Automobile(2010, "Toyota", "Tacoma", "Pickup"),
    new Automobile(2005, "Lotus", "Elise", "Roadster"),
    new Automobile(2008, "Subaru", "Outback", "Wagon")
    ];

// ******************************************************************************************************************************************
	
/*This function sorts arrays using an arbitrary comparator. 
  You pass it a comparator and an array of objects appropriate 
  for that comparator and it will return a new array which is 
  sorted with the largest object in index 0 and the smallest in 
  the last index*/
  
function sortArr(comparator, array){
    
	var s = 0;
	var t = 0;
	var temp;
	
	for (var i = 0; i < array.length - 1; i++) {
		for (var j = 0; j < array.length - i-1; j++) {
			if (!comparator(array[j], array[j+1])) {
				var temp = array[j];
				array[j] = array[j+1];
				array[j+1] = temp;
			}
		}
	}
}

// ******************************************************************************************************************************************

/*A comparator takes two arguments and uses some algorithm to 
  compare them. If the first argument is larger or greater than 
  the 2nd it returns true, otherwise it returns false. Here is 
  an example that works on integers*/
  
function exComparator( int1, int2){
    if (int1 > int2){
        return true;
    } else {
        return false;
    }
}

/*For all comparators if cars are 'tied' according to the comparison 
  rules then the order of those 'tied' cars is not specified and 
  either can come first*/

// ******************************************************************************************************************************************
  
/*This compares two automobiles based on their year. Newer cars are 
 "greater" than older cars.*/
 
function yearComparator( auto1, auto2){
    if (auto1.year > auto2.year)
		return true;
	else
		return false;
}

/*This compares two automobiles based on their make. It should be case 
 insensitive and makes which are alphabetically earlier in the alphabet
 are "greater" than ones that come later.*/
 
function makeComparator( auto1, auto2){
    if (auto1.make < auto2.make)
		return true;
	else
		return false;
}

/*This compares two automobiles based on their type. The ordering from 
 "greatest" to "least" is as follows: roadster, pickup, suv, wagon, 
 (types not otherwise listed). It should be case insensitive. If two cars 
 are of equal type then the newest one by model year should be considered 
 "greater".*/
 
function typeComparator( auto1, auto2){
    
	// Variables to use to rank the automobiles based on their type
	var auto1Rank = 0;
	var auto2Rank = 0;
	
	// if/else tree to properly rank the first automobile based on type
	if (auto1.type == "Roadster" || auto1.type == "roadster")
		auto1Rank = 5;
	else if (auto1.type == "Pickup" || auto1.type == "pickup")
		auto1Rank = 4;
	else if (auto1.type == "SUV" || auto1.type == "suv")
		auto1Rank = 3;
	else if (auto1.type == "Wagon" || auto1.type == "wagon")
		auto1Rank = 2;
	else
		auto1Rank = 1;
	
	// if/else tree to properly rank the second automobile based on type
	if (auto2.type == "Roadster" || auto2.type == "roadster")
		auto2Rank = 5;
	else if (auto2.type == "Pickup" || auto2.type == "pickup")
		auto2Rank = 4;
	else if (auto2.type == "SUV" || auto2.type == "suv")
		auto2Rank = 3;
	else if (auto2.type == "Wagon" || auto2.type == "wagon")
		auto2Rank = 2;
	else
		auto2Rank = 1;
	
	// With automobiles ranked, see if they are greater than, less than, or equal to each other
	if (auto1Rank > auto2Rank)
		return true;
	else if (auto1Rank < auto2Rank)
		return false;
	// If equal to each other, compare based on year
	else
		if (auto1.year > auto2.year)
			return true;
		else
			return false;
}

// ******************************************************************************************************************************************

/*Your program should output the following to the console.log, including 
  the opening and closing 5 stars. All values in parenthesis should be 
  replaced with appropriate values. Each line is a seperate call to console.log.

Each line representing a car should be produced via a logMe function. 
This function should be added to the Automobile class and accept a single
boolean argument. 
If the argument is 'true' then it prints "year make model type" with the year, 
make, model and type being the values appropriate for the automobile.
If the argument is 'false' then the type is ommited and just the "year make model" 
is logged.

// ******************************************************************************************************************************************

*****
The cars sorted by year are:
(year make model of the 'greatest' car)
(...)
(year make model of the 'least' car)

The cars sorted by make are:
(year make model of the 'greatest' car)
(...)
(year make model of the 'least' car)

The cars sorted by type are:
(year make model type of the 'greatest' car)
(...)
(year make model type of the 'least' car)
*****

As an example of the content in the parenthesis:
1990 Ford F-150 */

// ******************************************************************************************************************************************

// Output five stars to signal the start of the program running
console.log("*****");

// Sort and output cars by year
console.log("The cars sorted by year are:");

sortArr(yearComparator, automobiles);

for (var k = 0; k < automobiles.length; k++) {
	automobiles[k].logMe(false);
}

console.log();

// Sort and output cars by make
console.log("The cars sorted by make are:");

sortArr(makeComparator, automobiles);

for (var k = 0; k < automobiles.length; k++) {
	automobiles[k].logMe(false);
}

console.log();

// Sort and output cars by type
console.log("The cars sorted by type are:");

sortArr(typeComparator, automobiles);

for (var k = 0; k < automobiles.length; k++) {
	automobiles[k].logMe(true);
}

// Output five stars to signal the end of the program
console.log("*****");