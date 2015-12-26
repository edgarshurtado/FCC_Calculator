var c = document.getElementById("c");

// Introduce numbers by clicking
$(".numeric_button").click(function(){
    addNumberToDisplay($(this).text());
});

function addNumberToDisplay(number) {
    var currentText = $('#displayNumbers').text();
    if(currentText == 0){
        $('#displayNumbers').text(number);
    }else if(currentText.length < 15){
        $('#displayNumbers').text(currentText + number);
    }
}
