var inputOne;
var inputTwo;
var answer;
var operation;

$(function(){
  console.log("Please be gentle.  It's my first time.");
  init();
});// end Document Ready

//init function
function init(){
  eventListeners(true);
  getOperators();
}

function eventListeners(value){
  if(value){
  // $('#calculator').on('click', buttonInput);
  $('#calculator').on('click', '.number', buttonInput);
  $('#calculator').on('click', '.operations', buttonInput);
} else {
  $('#calculator').off('click');
}
}

function buttonInput(){
  var input = ($(this).data());
  numberInput(input);
}
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
  // switch (data){
    if (data.number) {
      console.log(data.number);
    } else {
      console.log(data.id);
    }

    // :
    // console.log(data.number);
    //   $('#numInput').val($('#numInput').val() + data.number);
    //   break;
    // default:
    // console.log('nope');
    // case typeof inputOne === "undefined":
    // console.log(data.id);
    // inputOne = $('#numInput').val();
    // operation = data.id;
    // break;
    // default:
    // console.log(data.number + " number 2");
    // inputTwo = $('#numInput').val();
    // operations (inputOne, inputTwo, operation);
    // break;
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
