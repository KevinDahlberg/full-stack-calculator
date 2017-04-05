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

//turns buttons on or off
function eventListeners(value){
  if(value){
    // $('#calculator').on('click', buttonInput);
    $('#calculator').on('click', '.number', buttonInput);
    $('#calculator').on('click', '.operations', buttonInput);
  } else {
    $('#calculator').off('click');
  }
}

//creates buttons for calculator
function createButtons(array){
  for (var i = 0; i < 10; i++) {
    $('#calculator').append("<button class='number' id='number"+i+"' data-number='"+i+"'>" + i + "</button>");
  }
  for (var j = 0; j < array.length; j++) {
    $('#calculator').append("<button class='operations' id=operation"+j+" operations' data-id='" + array[j].type +
    "'>" + array[j].operation + "</button>");
  }
}

function buttonInput(){
  var input;
  if ($(this).data('number')){
    input = ($(this).data('number'));
    numberInput(input);
  } else if ($(this).data('id') === 'equals'){
    operationInput(input);
    $("#calculator").removeData('numberOne');
    // console.log($("calculator").data('numberOne'));
  } else if ($(this).data('id') === 'clear'){
    clearInput();
    $("#calculator").removeData('numberOne');
    $("#calculator").removeData('operator');
    // console.log($("calculator").data());
  } else {
    input = ($(this).data('id'));
    operationInput(input);
  }
}

function clearInput(){
  $("#numInput").val('');
}

//function called when buttons are clicked
function numberInput (data){
  // console.log($("#calculator").data('lastButton'));
  // switch (data){
  if ($("#calculator").data('operator')) {
    clearInput();
    $("#numInput").val(data);
  } else {
    $('#numInput').val($('#numInput').val() + data);
  }
}

//function called when an operator is pushed
function operationInput(data){
  // console.log(data + " in operationInput path");
  var $el = $("#calculator");

  if($el.data('numberOne')){
    $el.data('operatorTwo', data);
    // console.log($("#calculator").data());
    operations ($el.data('numberOne'), $("#numInput").val(), $el.data('operator'));
  } else {
    $el.data('numberOne', $("#numInput").val());
    $el.data('operator', data);
  }
}

//statement for operations
function operations (inputOne, inputTwo, operation){
  console.log(inputOne, inputTwo, operation, "in operations path");
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
    case "equals":
    console.log("equals clicked");
    $('#calculator').removeData('operator');
    break;
    default:
    console.log("Error finding answer");
  }
  console.log(answer);
  $("#calculator").data('numberOne', answer);
  var newOperator = $('#calculator').data('operatorTwo');
  $('#calculator').data('operator', newOperator);
  $('#calculator').removeData('operatorTwo');
  $("#numInput").val(answer);
}

//get function to retrieve additional buttons from DOM
function getOperators (){
  $.ajax({
    type: "GET",
    url: "/operators",
    success: function(response){
      createButtons(response);
    }
  }); // end ajax
}
