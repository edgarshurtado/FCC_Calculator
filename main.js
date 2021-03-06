//TODO: When the sign is changed the result is not displayed properly

/*jslint browser: true*/
/*global $, jQuery, alert*/

// --------------------
//      CALC LOGIC
// --------------------

var calcObject;
calcObject = {
    operand1: null,
    operand2: null,
    activeOperator: null,
    lastButton: "",

    // Sets the operand in the calc. If there's no activeOperator, the number
    // is sets to the operand1, if there is it sets to the operand2
    setOperand: function (number) {
        if (this.activeOperator === null) {
            this.operand1 = number;
        } else {
            this.operand2 = number;
        }
    },

    setActiveOperator: function (operatorSymbol) {
        this.activeOperator = operatorSymbol;
    },

    addition: function () {
        return this.operand1 + this.operand2;
    },

    percent: function () {
        return this.operand1 * this.operand2/100;
    },

    substraction: function () {
        return this.operand1 - this.operand2;
    },

    sqrt: function () {
        return Math.sqrt(this.operand1);
    },

    multiplication: function () {
        return this.operand1 * this.operand2;
    },

    division: function () {
        return this.operand1 / this.operand2;
    },

    pow: function () {
        return Math.pow(this.operand1, this.operand2);
    },

    solve: function () {
        var solution = this[this.activeOperator]();
        solution = parseFloat(parseFloat(solution).toPrecision(15));
        this.resetOperands();
        return solution;
    },

    resetOperands: function () {
        this.operand1 = null;
        this.operand2 = null;
        this.activeOperator = null;
    },

    operationReady: function () {
        if (this.activeOperator === "sqrt") {
            // The square root is special because it requires just 1 operand
            return this.operand1 !== null;
        }
        return this.operand1 !== null
            && this.operand2 !== null
            && this.activeOperator !== null;
    }
};

// ------------------------------
// GUI Logic
// ------------------------------

// -- Delete current number in display --
function deleteCurrentNumber(){
    $('#number').text('0');
    $('#sign').text('');
}

function printNumber(num){
    var $numberHolder = $('#number');
    var $signHolder = $('#sign');

    if(num < 0){
        $signHolder.text("-");
        num = num * (-1);
    }else{
        $signHolder.text("");
    }

    num = num.toString().slice(0, 15);

    $numberHolder.text(num);
}

// Parse the display number
function parseDisplayNumber(){
    var numberString = $('#sign').text() + $('#number').text();
    var parsedNumber;

    if(numberString.indexOf(".") !== -1){
        parsedNumber = parseFloat(numberString);
    }else {
        parsedNumber = parseInt( numberString, 10 );
    }
    return parsedNumber;
}

// Introducing numbers to the display control
function addNumberToDisplay(newNumber) {
    var $number = $('#number');
    var $sign = $('#sign');
    var currentNumber = $sign.text() + $number.text();
    if(currentNumber === '0' || calcObject.lastButton.indexOf('operational_button') !== -1 || calcObject.lastButton === "equal_button"){
        if(calcObject.lastButton === "change_sign"){
            // In case the user hits the change_sign button just right after
            // hitting an operational button because he wants a negative number
            // as second operand.
            printNumber(newNumber);
        }else if(newNumber === '.') { // For the cases in which the user want the left-side of the point be 0
            printNumber("0.");
        } else {
            deleteCurrentNumber();
            printNumber(newNumber);
        }
    }else if(currentNumber.length < 15){
        printNumber(currentNumber + newNumber);
    }
}


// Checks if the operation is ready and then solves it
function solveCurrentOperation() {
    if (calcObject.operationReady()) {
        var solution = calcObject.solve();
        calcObject.resetOperands();
        printNumber(solution);
    }
}

// ------------------------------
// BUTTONS EVENTS
// ------------------------------

// Introduce numbers by clicking
$(".numeric_button").click(function(){
    var $this = $(this);
    if($this.text() !== '.' || $('#number').text().indexOf('.') === -1){
        addNumberToDisplay($this.text());
    }
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
    calcObject.setOperand(parseDisplayNumber());
    if(calcObject.operationReady()){
        solveCurrentOperation();
        // In case we are concatenating operations, to set the result number as
        // operand1
        calcObject.setOperand(parseDisplayNumber());
    }

    var operationSymbol = $(this).text();

    switch (operationSymbol) {
        case '+':
            calcObject.setActiveOperator('addition');
            break;
        case '%':
            calcObject.setActiveOperator('percent');
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

$('#help_button').click(function(){
    $('#help').show();
});

$('.transparent_background').click(function(){
    $('#help').hide();
});
