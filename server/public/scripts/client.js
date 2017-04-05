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
  var number = 0;
  for (var j = 0; j < array.length; j++) {
    if (array[j].operation=== "null"){
      $('#calculator').append("<button class='number' id=number"+number+" operations' data-number='" + array[j].number +
      "'>" + array[j].number + "</button>");
      number++;
    } else if (array[j].number === "null"){
    $('#calculator').append("<button class='operations' id=operation"+j+" operations' data-id='" + array[j].type +
    "'>" + array[j].operation + "</button>");
  }
  }
}

function buttonInput(){
  console.log($(this).data());
  $('#calculator').data('lastInput', ($(this).data('id')));
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
  } else if ($(this).data('id')){
    input = ($(this).data('id'));
    operationInput(input);
  }
}

function clearInput(){
  $("#numInput").val('');
}

//function called when buttons are clicked
function numberInput (input){
  console.log($("#calculator").data('lastInput'));
  // switch (data){
  if ($("#calculator").data('lastInput')) {
    clearInput();
    ($('#calculator').removeData('lastInput'));
    $("#numInput").val(input);
  } else {
    $('#numInput').val($('#numInput').val() + input);
  }
}

//function called when an operator is pushed
function operationInput(input){
  console.log($("#calculator").data('lastInput'));
  // console.log(data + " in operationInput path");
  var $el = $("#calculator");

  if($el.data('numberOne')){
    $el.data('operatorTwo', input);
    // console.log($("#calculator").data());
    operations ($el.data('numberOne'), $("#numInput").val(), $el.data('operator'));
  } else {
    $el.data('numberOne', $("#numInput").val());
    $el.data('operator', input);
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
