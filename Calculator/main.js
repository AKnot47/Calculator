let isNumber
let isOperation
let A = ''
let B = ''
let operation = ''
let switchNum = false
let clicked = false
let previousFunction
let inputText = document.querySelector('[data-input-text]')
let outputText = document.querySelector('[data-output-text]')
document.addEventListener('click', (e) =>{
    isNumber = e.target.matches('[data-number]')
    isOperation = e.target.matches('[data-operation')
    
    //if isnumber check to see switchnum boolean and add inputtext
    if(isNumber){
    if(A == '' || switchNum == false){
        A = A + e.target.innerHTML
    }else{
        B = B + e.target.innerHTML
    }
    inputText.innerHTML = (A + operation + B)
    }

    if(e.target.innerHTML == 'DEL'){
        inputText.innerHTML = inputText.innerHTML.slice(0, -1)
        //if we have A but no B turn A into parsefloat inputtext(which gets rid of the operation)
        //if input is empty meaning we deleted everything turn a into string so it doesnt turn into NaN
        if(A != '' && B ==''){
            if(inputText.innerHTML!= ''){
            A = parseFloat(inputText.innerHTML)
            }else{
                A = ''
            }
            operation = ''
            switchNum = false
            clicked = ''
        }
        if(B != ''){
            B = B.toString().slice(0, -1)
            previousFunction()
        }
        if(B == ''){
            outputText.innerHTML = ''
        }
    }

    //if isoperation and B is empty but we clicked on operation already then ignore
    //if that operation is delete then dont ignore it
    if(isOperation && A != '' && B=='' && clicked == true && e.target.innerHTML != 'DEL'){
        if(inputText.innerHTML.includes('%')){
            inputText.innerHTML = A + operation
        }else{
            return
        }
    }
    
    //if isoperation && both numbers are not '' meaning we completed the previous operation
    //turn A into our output reset the inputtext clear outputtext and B  toggle switchnum
    //if that operation is del then ignore
    if(isOperation && A !='' && B!='' && e.target.innerHTML != 'DEL'){
        A = outputText.innerHTML
        inputText.innerHTML = A + e.target.innerHTML
        B = ''
        outputText.innerHTML = ''
        switchNum = switchNum !== true
    }
    
    //if is operation toggle switchnum get the operation with e.target & change the inputtext
    //if that operation is del then dont do it
    if(isOperation && e.target.innerHTML != 'DEL'){
        switchNum = switchNum !== true
        operation = e.target.innerHTML
        inputText.innerHTML = (A + operation + B)
    }
    
    switch (operation) {
    case '+':
        addition()
        break;
    case '-':
        subtraction()
        break;
    case '×':
        multiplication()
        break;
        case '÷':
            division()
    break;
    case '%':
        percentage()
        break;
    case 'AC':
        allclear()
        break;
    }
    console.log(A)
})

//Functions for every operation   
function addition() {
if(A != '' && B != ''){
A = parseFloat(A)
if(B == '0.'){
    return
}
B = parseFloat(B)
outputText.innerHTML = A + B
previousFunction = addition
}
clicked = true
}
function subtraction() {
    if(A != '' && B != ''){
        A = parseFloat(A)
        if(B == '0.'){
            return
        }
        B = parseFloat(B)
        outputText.innerHTML = A - B
        previousFunction = subtraction
    }
    clicked = true
}
function multiplication() {
    if(A != '' && B != ''){
        A = parseFloat(A)
        if(B == '0.'){
            return
        }
        B = parseFloat(B)
        let output = A * B
        outputText.innerHTML = parseFloat(output.toFixed(3))
        previousFunction = multiplication
    }
    clicked = true
}
function division() {
    if(A != '' && B != ''){
        A = parseFloat(A)
        if(B == '0.'){
            return
        }
        B = parseFloat(B)
        let output = A / B
        outputText.innerHTML = parseFloat(output.toFixed(3))
        previousFunction = division
    }
    clicked = true
}
function percentage() {
    if(A != '' && B == ''){
        A = parseFloat(A)
        let output = A / 100
        outputText.innerHTML = parseFloat(output.toFixed(3))
        A = outputText.innerHTML
        operation = ''
        console.log(A)
        switchNum = switchNum !== true
    }
}
function allclear(){
    outputText.innerHTML = ''
    inputText.innerHTML = ''
    A = ''
    B = ''
    operation = ''
    switchNum = false
    clicked = false
}


//del and equals