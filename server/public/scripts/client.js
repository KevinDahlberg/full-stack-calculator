var inputOne;
var inputTwo;
var answer;
$(function(){
  console.log("Please be gentle.  It's my first time.");
  getOperators();

  $('#calculator').on('click', 'button', function(){
    numberInput($(this).data('number'));
  });
});// end Document Ready

//creates buttons for calculator
function createButtons(array){
  for (var i = 0; i < 10; i++) {
    $('#calculator').append("<button class=number data-number='"+i+"'>" + i + "</button>");
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

//function called when buttons are clicked
function numberInput (number){
  console.log(number);
  if (number) {
    $('#numInput').val($('#numInput').val() + number);
  } else if (typeof inputOne === "undefined"){
    inputOne = $('#numInput').val();
    $('#numInput').val('');
  } else {
    inputTwo = $('#numInput').val();
    operations (inputOne, inputTwo);
  }
}
//statement for operations
function operations (inputOne, inputTwo){
  answer = parseInt(inputOne) + parseInt(inputTwo);
  $("#numInput").val(answer);
}
