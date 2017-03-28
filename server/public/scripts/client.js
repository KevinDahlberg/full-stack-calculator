var inputOne;
var inputTwo;
var answer;
var operation;

$(function(){
  console.log("Please be gentle.  It's my first time.");
  getOperators();

  $('#calculator').on('click', 'button', function(){
    numberInput($(this).data());
  });
});// end Document Ready

//creates buttons for calculator
function createButtons(array){
  for (var i = 0; i < 10; i++) {
    $('#calculator').append("<button class=number data-number='"+i+"'>" + i + "</button>");
  }
  for (var j = 0; j < array.length; j++) {
    console.log(array[j]);
    $('#calculator').append("<button class=operations data-id='" + array[j].type +
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

//function called when buttons are clicked
function numberInput (data){
  console.log(data.number, data.id);
  if (data.number) {
    $('#numInput').val($('#numInput').val() + data.number);
  } else if (typeof inputOne === "undefined"){
    inputOne = $('#numInput').val();
    operation = data.id;
    $('#numInput').val('');
  // } else if (typeof operation === "undefined") {
  //   operation = data.id;
  } else {
    inputTwo = $('#numInput').val();
    operations (inputOne, inputTwo, operation);
  }
}
//statement for operations
function operations (inputOne, inputTwo, operation){
  switch (operation){
    case "add":
      answer = parseInt(inputOne) + parseInt(inputTwo);
      break;
    case "subtract":
      answer = parseInt(inputOne) - parseInt(inputTwo);
      break;
    case "multiply":
      answer = parseInt(inputOne) * parseInt(inputTwo);
      break;
    case "divide":
      answer = parseInt(inputOne) / parseInt(inputTwo);
      break;
    default:
      console.log("Error finding answer");
  }
  $("#numInput").val(answer);
}
