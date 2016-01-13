// Introduce numbers by clicking
$(".numeric_button").click(function(){
    var $this = $(this);
    addNumberToDisplay($this.text());
    calcObject.lastButton = $this.attr('class');
});

// Introducing numbers to the display control
function addNumberToDisplay(number) {
    var $number = $('#number');
    var currentText = $number.text();
    if(currentText === '0' || calcObject.lastButton.indexOf('operational_button') !== -1 || calcObject.lastButton === "equal_button"){
        deleteCurrentNumber();
        $number.text(number);
    }else if(currentText.length < 15){
        $number.text(currentText + number);
    }
}

// Checks if the operation is ready and then solves it
function solveCurrentOperation() {
    if(calcObject.operationReady()){
        calcObject.setOperand(2, parseInt($('#number').text(), 10));
        var solution = calcObject.solve();
        $('#number').text(solution);
    }
}

// -- Delete current number in display --
function deleteCurrentNumber(){
    $('#number').text('0');
    $('#sign').text('');
}

// -- Delete current number in display --
$('#c').click(deleteCurrentNumber);


// -- Reset the calculator --
$('#del').click(function(){
    calcObject.resetOperands();
    deleteCurrentNumber();
});
// +- button

$("#change_sign").click(function(){
    var $sign = $('#sign');
    var currentSign = $sign.text();
    if(currentSign === ""){
        $sign.text("-");
    }else if(currentSign === "-"){
        $sign.text("");
    }
});

// Operational_buttons
$('.operational_button').click(function(){
    if(calcObject.operationReady()){
        solveCurrentOperation();
    }


    var operationSymbol = $(this).text();
    calcObject.setOperand(1, parseInt($('#number').text(), 10));

    switch (operationSymbol) {
        case '+':
            calcObject.setActiveOperator('addition');
            break;
        case '%':
            calcObject.setActiveOperator('module');
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
    if(calcObject.operationReady()){
        solveCurrentOperation();
    }

    calcObject.resetOperands();
    calcObject.lastButton = $(this).attr('id');
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

    module: function(){
        return this.operand1 % this.operand2;
    },

   substraction  : function(){
        return this.operand1 - this.operand2;
    },

    sqrt : function(){
        return Math.sqrt(this.operand1);
    },

    multiplication : function(){
        return this.operand1 * this.operand2;
    },

    division : function(){
        return this.operand1 / this.operand2;
    },

    solve: function(){
        return this[this.activeOperator]();
    },

    resetOperands: function() {
        this.operand1 = null;
        this.operand2 = null;
        this.activeOperator = null;
    },

    operationReady: function(){
        return this.operan1 !== null
            && this.operan2 !== null
            && this.activeOperator !== null;
    }
};
