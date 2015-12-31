// Introduce numbers by clicking
$(".numeric_button").click(function(){
    addNumberToDisplay($(this).text());
});

// Introducing numbers to the display control
function addNumberToDisplay(number) {
    var currentText = $('#displayNumbers').text();
    if(currentText === '0'){
        $('#displayNumbers').text(number);
    }else if(currentText.length < 15){
        $('#displayNumbers').text(currentText + number);
    }
}

// -- Delete current number in display --
$('#c').click(deleteCurrentNumber);

// Controller
function deleteCurrentNumber(){
    $('#displayNumbers').text('0');
}
