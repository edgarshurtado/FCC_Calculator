
// ---- CALC LOGIC ----

var calcObject = {
    operand1 : null,
    operand2 : null,
    activeOperator : null,
    lastButton: "", 

    // Sets the operand in the calc. If there's no activeOperator, the number
    // is sets to the operand1, if there is it sets to the operand2
    setOperand: function(number){
        if(this.operand1 === null){
            this.operand1 = number;
        } else {
            this.operand2 = number;
        }
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

    pow : function(){
        return Math.pow(this.operand1, this.operand2);
    },

    solve: function(){
        var solution = this[this.activeOperator]();
        this.resetOperands();
        return solution;
    },

    resetOperands: function() {
        this.operand1 = null;
        this.operand2 = null;
        //this.activeOperator = null;
    },

    operationReady: function(){
        if(this.activeOperator === "sqrt"){
            // The square root is special because it requires just 1 operand
            return this.operand1 !== null;
        }else {
        return this.operand1 !== null
            && this.operand2 !== null
            && this.activeOperator !== null;
        }
    }
};

// ------------------------------
// GUI Logic
// ------------------------------

// Introducing numbers to the display control
function addNumberToDisplay(number) {
    var $number = $('#number');
    var currentText = $number.text();
    if(currentText === '0' || calcObject.lastButton.indexOf('operational_button') !== -1 || calcObject.lastButton === "equal_button"){
        if(calcObject.lastButton === "change_sign"){
            // In case the user hits the change_sign button just right after
            // hitting an operational button because he wants a negative number
            // as second operand.
            $number.text(0);
        }else {
            deleteCurrentNumber();
        }
        $number.text(number);
        calcObject.setOperand(parseDisplayNumber());
    }else if(currentText.length < 15){
        var newNumber = currentText + number;
        $number.text(newNumber);
        calcObject.setOperand(parseDisplayNumber());
    }
}

// Checks if the operation is ready and then solves it
function solveCurrentOperation() {
    var $sign = $('#sign');
    var $number = $('#number');

    if(calcObject.operationReady()){
        calcObject.setOperand(parseDisplayNumber());
        var solution = calcObject.solve();
        
        //Check the sign of the result
        if(solution < 0){
            $sign.text("-");
            $number.text(solution * (-1));
        }else {
            $sign.text("");
            $number.text(solution);
        }
        calcObject.resetOperands();
    }
}

// -- Delete current number in display --
function deleteCurrentNumber(){
    $('#number').text('0');
    $('#sign').text('');
}

// Parse the display number
function parseDisplayNumber(){
    var numberString = $('#sign').text() + $('#number').text()
    return parseInt( numberString, 10);
}

// ------------------------------
// BUTTONS EVENTS
// ------------------------------

// Introduce numbers by clicking
$(".numeric_button").click(function(){
    var $this = $(this);
    addNumberToDisplay($this.text());
    calcObject.lastButton = $this.attr('class');
});

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

    if(calcObject.lastButton.indexOf("operational_button") !== -1  && calcObject.operand2 === null){
        $sign.text("-");
        $('#number').text("0");
        calcObject.setOperand(parseDisplayNumber);
    }else {
        if(currentSign === ""){
            $sign.text("-");
        }else if(currentSign === "-"){
            $sign.text("");
        }
    }

    calcObject.lastButton = $(this).attr('id');
});

// Operational_buttons
$('.operational_button').click(function(){
    if(calcObject.operationReady()){
        solveCurrentOperation();
    }

    var operationSymbol = $(this).text();
    // In case we are concatenating operations, to set the result number as
    // operand1
    calcObject.setOperand(parseDisplayNumber());

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
            solveCurrentOperation();
            break;
        case '*':
            calcObject.setActiveOperator('multiplication');
            break;
        case '/':
            calcObject.setActiveOperator('division');
            break;
        case '^':
            calcObject.setActiveOperator('pow');
            break;
        default:

    }
    calcObject.lastButton = $(this).attr('class');
});

$('#equal_button').click(function(){
    calcObject.setOperand(parseDisplayNumber());

    if(calcObject.operationReady()){
        solveCurrentOperation();
    }

    calcObject.resetOperands();
    calcObject.lastButton = $(this).attr('id');
});

