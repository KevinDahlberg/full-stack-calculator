function operations (type, operation){
  this.type = type;
  this.operation = operation;
}

var operationsArray = [
    {type: "add", operation: "+"},
    {type: "subtract", operation: "-"},
    {type: "multiply", operation: "x"},
    {type: "divide", operation: "÷"},
    {type: "equals", operation: "="}];

$(function(){
  console.log("Please be gentle.  It's my first time.");
  console.log(operationsArray);
  getOperators();
});// end Document Ready

//creates buttons for calculator
function createButtons(array){
  for (var i = 0; i < 10; i++) {
    $('#calculator').append("<button class=number>" + i + "</button>");
  }
  for (var j = 0; j < array.length; j++) {
    console.log(array[j]);
    $('#calculator').append("<button class=operations id='" + array[j].type +
                            "'>" + array[j].operation + "</button>");
  }
}

//get function to retrieve additional buttons from DOM
function getOperators (){
  console.log("in GET path");
  $.ajax({
    type: "GET",
    url: "/operators",
    success: function(response){
      console.log("GET Path finished");
      createButtons(response);
    }
  }); // end ajax
}

//statement for operations
function operations (inputOne, inputTwo){
  var answer = inputOne + inputTwo;
  $("#numInput").val("answer");
}
