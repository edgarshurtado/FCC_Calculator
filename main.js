var c = document.getElementById("c");

$(".numeric_button").click(function(){
    var currentText = $('#displayNumbers').text();
    if(currentText == 0){
        $('#displayNumbers').text($(this).text());
    }else if(currentText.length < 15){
        $('#displayNumbers').text(currentText + $(this).text());
    }
});
