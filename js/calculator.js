const numb = document.querySelectorAll('button.numb');
const point = document.querySelector('button.point');
const display = document.querySelector('.display');
const arithmetic = document.querySelectorAll('button.arithmetic');
const operation = document.querySelectorAll('button.operation');
const regex = /[+\-*/%]/;

point.addEventListener('click', function (event) {
    if (display.innerHTML.endsWith('.') || display.innerHTML.includes('.') && !regex.test(display.innerHTML) || regex.test(display.innerHTML) && numbSplit().includes('.') ) {
        event.preventDefault();
    } else {
        display.innerHTML += point.innerHTML;
    }
});

numb.forEach(element => {
    element.addEventListener('click', function () {

        if (display.innerHTML.endsWith('0') && regex.test(display.innerHTML.charAt(display.innerHTML.length - 2))) {
            return false;
        }

        if (display.innerHTML == '0') {
            display.innerHTML = element.innerHTML;
        } else {
            display.innerHTML += element.innerHTML;
        }
    });
});

arithmetic.forEach(element => {
    element.addEventListener('click', function (event) {
        if (display.innerHTML != '') {
            if (regex.test(display.innerHTML)) {
                calculate();
            }

            display.innerHTML += element.innerHTML;
        } 
    });
});

operation.forEach(element => {
    element.addEventListener('click', function () {
        if (element.innerHTML == 'C') {
            display.innerHTML = '0';
        } else if (element.innerHTML == 'Del') {
            display.innerHTML = display.innerHTML.slice(0, -1);
            if (display.innerHTML == '') {
                display.innerHTML = '0';
            }
        } else if (element.innerHTML == '=') {
            calculate();
         }
    });
});

function numbSplit() {
    const parts = display.innerHTML.split(regex);
    return parts[parts.length - 1];
}

function calculate() {
    try {
        display.innerHTML = eval(display.innerHTML);
    } catch {
        display.innerHTML = 'Error';
    }
    
    return display.innerHTML;
}
