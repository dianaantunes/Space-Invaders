// global namespace
var MYAPP = MYAPP || {};

// sub namespace
MYAPP.event = {};

// Create a container called MYAPP.commonMethod for common method and properties
MYAPP.commonMethod = {
	regExForName: "", // define regex for name validation
	regExForPhone: "", // define regex for phone validation
	validateName: function(name) {
		// Do something with name, you can access regExForName variable
		// using "this.regExForName"
	},
	validadePhoneNo: function(phoneNo) {
		// Do something with phone number
	}
}

// Object together with the method declarations
MYAPP.event = {
	addListener: function(el, type, fn) {
		// code stuff
	},
	removeListener: function(el, type, fn) {
		// code stuff
	},
	getEvent: function(e) {
		// code stuff
	}

	// Can add another method and properties
}

//Syntax for Using addListener method:
MYAPP.event.addListener("yourel", "type", MYAPP.commonMethod.validateName("Ed"));

console.log(Math.random());

// We define classes as functions
var Person = function(firstName) {
	this.firstName = firstName;
	console.log("instance" + firstName + "created");
};

// We add a couple of methods
Person.prototype.sayHello = function() {
	console.log("Hello, I'm " + this.firstName);
}
Person.prototype.walk = function() {
	console.log("I am walking!");
}

// Define the Student constructor
function Student(firstName, subject) {
	// Call the parent constructor, making sure (using call)
	// that "this" is ser correctly during the call
	Person.call(this, firstName);

	// Initialize our Student specific properties
	this.subject = subject;
}

// Create a Student.prototype object that inherits from Person.prototype.
// Note: A common error here is to use "new Person()" to create the
// Student.prototype. That's incorrect for several reasons, not least
// that we don't have anything to give Person for the "firstName"
// argument. The correct place to call Person is above, where we call
// it from Student.
Student.prototype = Object.create(Person.prototype);

// Set the constructor properly to refer to Student
Student.prototype.constructor = Student;

// Replace the "sayHello" methods
Student.prototype.sayHello = function() {
	console.log("Hello, I'm " + this.firstName + ". I'm studying "
			 + this.subject + ".");
}
// Add a "sayGoodBye" method
Student.prototype.sayGoodBye = function(){
  console.log("Goodbye!");
};

var person1 = new Person("Alice");
var person2 = new Person("Bob");
// In JS, you can invoke methods out of the context
var helloFunction = person1.sayHello;
helloFunction();
// logs true
console.log(helloFunction === person1.sayHello);

// logs true
console.log(helloFunction === Person.prototype.sayHello);

// logs "Hello, I'm Alice"
helloFunction.call(person1);

// Show the firstName properties of the objects
console.log("Person1 is " + person1.firstName);
console.log("Person2 is " + person2.firstName);

person1.sayHello(); //Logs "Hello, I'm Alice"
person2.sayHello();	//Logs "Hello, I'm Bob"

var student1 = new Student("Janet", "Applied Physics");
student1.sayHello();
student1.walk();
student1.sayGoodBye();

// Check that instanceof works correctly
console.log(student1 instanceof Person);  // true
console.log(student1 instanceof Student); // true
