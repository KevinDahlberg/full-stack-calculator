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

/*
function that takes the button that is pressed and decides whether the button is
a number or an operation.

If the button is an operation, it evaluates whether the button is a special operation,
such as equals or clear, and routes it on the proper path for that operation.

If the button is a normal math operation, the function stores that operation and
makes it possible for the second set of numbers to be pressed.
*/

function buttonInput(){
  var $el = $(this);
  $('#calculator').data('lastInput', ($el.data('id')));
  var input = $('#numInput').val();
  if ($el.data('id') === 'equals'){
    operationInput(input);
    $("#calculator").removeData('numberOne');
  } else if ($el.data('id') === 'clear'){
    clearInput();
    $("#calculator").removeData('numberOne');
    $("#calculator").removeData('operator');
    // console.log($("calculator").data());
  } else if ($el.data('id') === 'square'){
    answer = $('#numInput').val() * $('#numInput').val();
    clearInput();
    $('#numInput').val(answer);
    $("#calculator").removeData();
    //$("#calculator").data('numberOne', answer);
  } else if ($el.data('id') === 'sqRoot'){
    console.log('sqroot pressed with ', input);
    sqRoot(input);
  } else if ($el.data('id') === 'plusMinus'){
    plusMinus(input);
  } else if ($el.data('id') === 'mPlus'){
    console.log('in mPlus path');
    memoryAdd(input);
  } else if ($el.data('id') === 'mMinus'){
    console.log('in mMinus path', input);
    memoryMinus(input);
  } else if ($el.data('id') === 'mRecal'){
    mRecal('memory');
  } else if ($el.data('id') === 'mClear'){
    mDelete('memory');
  }
  else if ($el.data('id')){
    input = ($el.data('id'));
    operationInput(input);
  }   else if ($el.data('number')!=='undefined'){
    numberInput($el.data('number'));
  }
}

//clears the input
function clearInput(){
  $("#numInput").val('');
}

function clearData(){
  $('#calculator').removeData();
}

/* function called when buttons are clicked.
if there is information for the last input pressed, the calculator clears the
input field and lastInput from data.

if there is not any data for the last input pressed, then the calculator adds
that number to the input field.
*/
function numberInput (input){
  console.log($("#calculator").data('lastInput'));
  if ($("#calculator").data('lastInput')){
    clearInput();
    ($('#calculator').removeData('lastInput'));
    $("#numInput").val(input);
  } else {
    $('#numInput').val($('#numInput').val() + input);
  }
}

/*
function called when an operator is pushed
if there is data for lastInput, then the the calculator information is sent to the
operations function.
Otherwise, the number that is displayed on the input is stored as numberOne, and
the operator pressed is stored as operator.
*/
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

/*
Function that figures out the square root of the input number by starting
at zero and adding one each time it runs through the while loop.  When the
product of i squared equals the input number, the while loop stops and appends
the result to the input field
*/
function sqRoot(input){
  console.log('in sqRoot Path');
  var i = 0;
  var number = parseInt(input);
  while ((i*i)<number){
    i++;
    if((i*i)===number){
      clearInput();
      $("#calculator").removeData();
      $('#numInput').val(i);
    }
  }
}

function plusMinus(input){
  var answer;
  if (parseInt(input)>0) {
    answer = -Math.abs(input);
  } else if (parseInt(input)<0) {
    answer = Math.abs(input);
  }
  clearInput();
  $('#numInput').val(answer);
  clearData();
}

//memory functions

/*
Function that first checks to see if there is a value saved in the DB for the
calc memory.  If there is a value, add it to the current input and update the DB
with the new number.  If there is no value, post the input value to the DB.
*/
function memoryAdd (input){
  clearInput();
  mRecal('memory');
  var response = $("#numInput").val();
  if (response){
    var updatedNum = parseInt(input) + parseInt(response);
    mPlus('memory', updatedNum);
  } else {
    mAdd('memory', input);
  }
}

function memoryMinus (input){
  clearInput();
  mRecal('memory');
  var response = $('#numInput').val();
  console.log(response);
  if (response){
    var updatedNum = parseInt(response) - parseInt (input);
    console.log(updatedNum);
    mPlus('memory', updatedNum);
  } else {
    var negativeNum = 0 - parseInt(input);
    console.log(negativeNum);
    mAdd('memory', negativeNum);
  }
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


function mAdd(name, input) {
  $.ajax({
    type: "POST",
    url: "memory/madd",
    data: {name: name, value: input},
    success: function(response){
      mRecal('memory');
    }
  });
}

function mPlus (name, value) {
  $.ajax({
    type: "PUT",
    url: "memory/mplus",
    data: {name: name, value: value},
    success: function(response){
      mRecal();
    }
  });
}

//Gets value of memory from the DB, displays to the input, and clears any data
function mRecal (type) {
  $.ajax({
    type: "GET",
    url: "memory/mrecal",
    data: type,
    success: function (response){
      console.log(response);
      clearInput();
      $('#numInput').val(response[0].value);
      $("#calculator").removeData();
    }
  });
}

function mDelete (type) {
  $.ajax({
    type: "DELETE",
    url: "memory/mdelete/"+type+'/',
    success: function (response){
      clearInput();
      console.log(response);
    }
  });
}
