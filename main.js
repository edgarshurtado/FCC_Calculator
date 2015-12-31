// Introduce numbers by clicking
$(".numeric_button").click(function(){
    addNumberToDisplay($(this).text());
});

// Introducing numbers to the display control
function addNumberToDisplay(number) {
    var currentText = $('#number').text();
    if(currentText === '0'){
        $('#number').text(number);
    }else if(currentText.length < 15){
        $('#number').text(currentText + number);
    }
}

// -- Delete current number in display --
$('#c').click(deleteCurrentNumber);

// Controller
function deleteCurrentNumber(){
    $('#number').text('0');
    $('#sign').text('');
}

// +- button

$("#change_sign").click(function(){
    var currentSign = $('#sign').text();
    if(currentSign === ""){
        $('#sign').text("-"); 
    }else if(currentSign === "-"){
        $('#sign').text(""); 
    }   
})
