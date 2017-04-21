$(function(){
  console.log("Please be gentle.  It's my first time.");
  init();
});// end Document Ready

//init function
function init(){
  eventListeners(true);
  getOperators();
  mRecal('memory');
  intitialValue();
}

//turns buttons on or off
function eventListeners(value){
  if(value){
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
      //number buttons
      $('#calculator').append("<button class='number' id=number"+number+" operations' data-number='" + array[j].number +
      "'>" + array[j].number + "</button>");
      number++;
    } else if (array[j].number === "null"){
      //operator buttons
      $('#calculator').append("<button class='operations' id=operation"+j+" operations' data-id='" + array[j].type +
      "'>" + array[j].operation + "</button>");
    }
  }
}

function intitialValue(){
  $('#numInput').val('0');
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
  var answer;
  var $el = $(this);
  $('#calculator').data('lastInput', ($el.data('id')));
  var input = $('#numInput').val();
  if ($el.data('id') === 'equals'){
    operationInput(input);
    $("#calculator").removeData('numberOne');
  } else if ($el.data('id') === 'clear'){
    clearInput();
    clearData();
  } else if ($el.data('id') === 'square'){
    square(input);
    //$("#calculator").data('numberOne', answer);
  } else if ($el.data('id') === 'sqRoot'){
    sqRoot(input);
  } else if ($el.data('id') === 'plusMinus'){
    plusMinus(input);
  } else if ($el.data('id') === 'mPlus'){
    console.log('in mPlus path');
    memoryAdd(input);
  } else if ($el.data('id') === 'mMinus'){
    console.log('in mMinus path', input);
    memoryMinus(input);
    mRecal('memory');
    memoryRecal();
  } else if ($el.data('id') === 'mRecal'){
    mRecal('memory');
    memoryRecal();
  } else if ($el.data('id') === 'mClear'){
    $('#numInput').removeData('mem');
    mDelete('memory');
  }
  else if ($el.data('id')){
    input = ($el.data('id'));
    operationInput(input);
  // }   else if ($('#number0')){
  //   console.log($(this))
  //   $('#numInput').val($('#numInput').val() + '.');
} else if ($(this).data('number') === '.'){
  $('#numInput').val($('#numInput').val() + '.');
} else {
    numberInput($el.data('number'));
  }
}

/* function called when buttons are clicked.
if there is information for the last input pressed, the calculator clears the
input field and lastInput from data.

if there is not any data for the last input pressed, then the calculator adds
that number to the input field.
*/
function numberInput (input){

  if ($("#calculator").data('lastInput')){
    clearInput();
    ($('#calculator').removeData('lastInput'));
    $("#numInput").val(input);
  } else if ($('#numInput').val()=='0'){
    clearInput();
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
  var $el = $("#calculator");
  if($el.data('numberOne')){
    $el.data('operatorTwo', input);
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
    answer = parseFloat(inputOne) + parseFloat(inputTwo);
    break;
    case "subtract":
    answer = parseFloat(inputOne) - parseFloat(inputTwo);
    break;
    case "multiply":
    answer = parseFloat(inputOne) * parseFloat(inputTwo);
    break;
    case "divide":
    answer = parseFloat(inputOne) / parseFloat(inputTwo);
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
  var number = parseFloat(input);
  while ((i*i)<number){
    i++;
    if((i*i)===number){
      clearInput();
      $("#calculator").removeData();
      $('#numInput').val(i);
    }
  }
}

/*
function that figures out the square of a number by finding the product of the
input multiplied by itself and posting it to the input field
*/
function square(input){
  clearInput();
  $('#numInput').val(input*input);
  $("#calculator").removeData();
}

/*
function that changes the value of the number in the input to either negative or
positive
*/
function plusMinus(input){
  var answer;
  if (parseFloat(input)>0) {
    answer = -Math.abs(input);
  } else if (parseFloat(input)<0) {
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
  var oldNum = $('#numInput').data('mem');
  console.log('The memoryAdd respons is ', oldNum);
  if (oldNum){
    var updatedNum = parseFloat(input) + parseFloat(oldNum);
    console.log('Updated Num is ', updatedNum );
    $.when(mPlus('memory', updatedNum)).then(mRecal('memory')).then(memoryRecal());
  } else {
    $.when(mAdd('memory', input)).then(memoryRecal());
  }
}

/*
function for the M- button.  If there is a number saved on the input as a mem,
the M- button subtracts the number from that number and updates the DB.  If there
isn't a number saved, it adds a negative number to the DB
*/
function memoryMinus (input){
  var oldNum = $('#numInput').data('mem');
  console.log('The old number is, ', oldNum);
  if (oldNum){
    var updatedNum = parseFloat(oldNum) - parseFloat (input);
    console.log('the updated number is', updatedNum);
    mPlus('memory', updatedNum);
  } else {
    var negativeNum = -Math.abs(input);
    console.log('the new input is', negativeNum);
    mAdd('memory', negativeNum);
  }
}

/*
function for the MR button. It calls the mRecal function which stores a number
as data that gets displayed on #numInput
*/
function memoryRecal () {
  clearInput();
  $('#calculator').removeData('operatorTwo');
  $('#calculator').removeData('operator');
  $('#calculator').removeData('numberOne');
  console.log($('#calculator').data());
  mRecal('memory');
}

/*
Function that is called with the response for the mRecal function.  This function
saves the value recieved from the DB as data on the #numInput
*/
function memoryCheck (input){
    $('#numInput').data('mem', input);
   if ($('#calculator').data('lastInput')){
    $('#numInput').val(input);
  }
}

//clears the input
function clearInput(){
  $("#numInput").val('');
  intitialValue();
}

function clearData(){
  $('#calculator').removeData();
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

//adds a value to the DB
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

//updates a value in the DB
function mPlus (name, value) {
  $.ajax({
    type: "PUT",
    url: "memory/mplus",
    data: {name: name, value: value},
    success: function(response){
      mRecal('memory');
    }
  });
}

//Gets value of memory from the DB and puts it through the memoryCheck function
function mRecal (type) {
  $.ajax({
    type: "GET",
    url: "memory/mrecal",
    data: type,
    success: function (response){
      res = response[0].value;
      memoryCheck(res);
    }
  });
}

/*
deletes values from the DB.  Type is the column that the item is deleted from.
for every instance in this application (as of version 1.0), the only thing that is
deleted is anything with the type of 'memory'.
*/
function mDelete (type) {
  $.ajax({
    type: "DELETE",
    url: "memory/mdelete/"+type+'/',
    success: function (response){
      clearInput();
      intitialValue();
    }
  });
}
