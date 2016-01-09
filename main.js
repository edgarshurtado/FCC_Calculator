// Introduce numbers by clicking
$(".numeric_button").click(function(){
    addNumberToDisplay($(this).text());
    calcObject.lastButton = $(this).attr('class');
});

// Introducing numbers to the display control
function addNumberToDisplay(number) {
    var currentText = $('#number').text();
    if(currentText === '0' || calcObject.lastButton.indexOf('operational_button') !== -1){
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
});

// Operational_buttons
$('.operational_button').click(function(){
    var operationSymbol = $(this).text();
    calcObject.setOperand(1, parseInt($('#number').text(), 10));

    switch (operationSymbol) {
        case '+':
            calcObject.setActiveOperator('addition');
            break;
        case '%':
            calcObject.setActiveOperator('division');
            break;
        case '-':
            calcObject.setActiveOperator('substraction');
            break;
        case '√':
            calcObject.setActiveOperator('sqrt');
            break;
        case '*':
            calcObject.setActiveOperator('multiplication');
            break;
        case '/':
            calcObject.setActiveOperator('division');
            break;
        default:

    }
    calcObject.lastButton = $(this).attr('class');
});

$('#equal_button').click(function(){
    calcObject.setOperand(2, parseInt($('#number').text(), 10));
    var solution = calcObject.solve();
    $('#number').text(solution);
});

// ---- CALC LOGIC ----

var calcObject = {
    operand1 : null,
    operand2 : null,
    activeOperator : null,
    lastButton: "",

    setOperand: function(operandNumber, number){
        this["operand" + operandNumber] = number;
    },

    setActiveOperator: function(operatorSymbol){
        this.activeOperator = operatorSymbol;
    },

    addition : function(){
        return this.operand1 + this.operand2;
    },

    solve: function(){
        return this[this.activeOperator]();
    }
};
