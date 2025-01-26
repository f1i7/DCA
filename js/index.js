/* 

*/

// const button1 = document.getElementById('button1');
const fibEntries = [0.0, 0.236, 0.382, 0.5, 0.618, 0.786];
const fibStops = [-0.382, -0.5, -0.236];
const fibProfits = [1.0, 1.272, 1.414, 1.618, 2.618, 3.618];

document.getElementById('input0').value = 10;
document.getElementById('input1').value = '0.9800';
document.getElementById('input2').value = '0.9842';
document.getElementById('input3').value = -0.5;
document.getElementById('input4').value = 1.618;

document.getElementById('dist1').value = 20;
document.getElementById('dist2').value = 20;
document.getElementById('dist3').value = 20;
document.getElementById('dist4').value = 40;

document.getElementById('button1').addEventListener('click', function() {
    output();

});

button2.addEventListener('click', function() {
    clearAll();
});

// ----------- event listener: change button color ---------------
document.addEventListener("DOMContentLoaded", () => {
    // const input1 = document.getElementById("input1");
    // const input2 = document.getElementById("input2");
    const button = document.getElementById("button1");

    const input0 = document.getElementById('input0');
    const input1 = document.getElementById('input1');
    const input2 = document.getElementById('input2');
    const input3 = document.getElementById('input3');
    const input4 = document.getElementById('input4');
    const dist1 = document.getElementById('dist1');
    const dist2 = document.getElementById('dist2');
    const dist3 = document.getElementById('dist3');
    const dist4 = document.getElementById('dist4');


    const updateButtonColor = () => {
        const value1 = parseFloat(input1.value) || 0;
        const value2 = parseFloat(input2.value) || 0;

        if (value1 < value2) {
            button.style.backgroundColor = "#0BB797";
            // console.log("green");
        } else {
            button.style.backgroundColor = "#E85151";
            // console.log("red");
        }

        console.log("Change");
        clearOutput();
        output();

    };

    input0.addEventListener("input", updateButtonColor);
    input1.addEventListener("input", updateButtonColor);
    input2.addEventListener("input", updateButtonColor);
    input3.addEventListener("input", updateButtonColor);
    input4.addEventListener("input", updateButtonColor);
    dist1.addEventListener("input", updateButtonColor);
    dist2.addEventListener("input", updateButtonColor);
    dist3.addEventListener("input", updateButtonColor);
    dist4.addEventListener("input", updateButtonColor);
})

// ----------------- get precision function ----------------------
function getPrecision(n) {
    // const xStr = n.toString();
    const xStr = n;
    if (xStr.includes('.')) {
        return xStr.split('.')[1].length;
    } else {
        return 0;
    }
}

// ------------------------- fib function -------------------------
// fib0: price at fib0
// fib1: price at fib1
// level: target fib level
// return: price at fib level
function fib(fib0, fib1, level) {
    return fib0 + (fib1 - fib0) * level;
}

// --------------------- percentage function -----------------------
function percentage(entry, exit) {
        return Math.abs((((exit - entry) / entry)));
}

// --------------------- leverage function -----------------------
function leverage(effective_change, price_change) {
    return Math.abs(parseInt((effective_change / (price_change * 100))));
}

// --------------------- clear all function -----------------------
function clearAll() {
    document.getElementById('input1').value = '';
    document.getElementById('input2').value = '';

    document.getElementById('input0').value = 10;
    document.getElementById('input3').value = -0.5;
    document.getElementById('input4').value = 1.618;

    // document.getElementById('output1').innerText = '';
    document.getElementById("button1").style.backgroundColor = "#474747";
    document.querySelector(".item").innerHTML = '';
}

// --------------------- clear output function -----------------------
function clearOutput() {
    document.querySelector(".item").innerHTML = '';
}

// --------------------- keyboard: enter  -----------------------
document.addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        document.getElementById('button1').click();
    }
});


function output() {
        // ------------------------------------------------------
    // creating items in .item div
    // ------------------------------------------------------
    document.querySelector(".item").innerHTML = '';
    const parentDiv = document.querySelector(".item");
    const newOutput = document.createElement("p");
    for (let i = 1; i <= 3; i++) {
        const newOutput = document.createElement("p");
        newOutput.id = `output${i}`;
        parentDiv.appendChild(newOutput);
    }
    
    // ------------------------------------------------------
    // 
    // ------------------------------------------------------
    const input1 = document.getElementById('input1');
    const input2 = document.getElementById('input2');
    const fib0 = parseFloat(input1.value);
    const fib1 = parseFloat(input2.value);
    const precision = getPrecision(input1.value);

    const stoploss_level = parseFloat(document.getElementById('input3').value);
    // const takeprofit_level = 1.618;
    const takeprofit_level = parseFloat(document.getElementById('input4').value);

    const stoploss = fib(fib0, fib1, stoploss_level);
    const takeprofit = fib(fib0, fib1, takeprofit_level);

    const entry1 = fib(fib0, fib1, 0.618);
    const entry2 = fib(fib0, fib1, 0.5);
    const entry3 = fib(fib0, fib1, 0.382);
    const entry4 = fib(fib0, fib1, 0);

    const dist1_percentage = parseInt(document.getElementById('dist1').value) / 100;
    const dist2_percentage = parseInt(document.getElementById('dist2').value) / 100;
    const dist3_percentage = parseInt(document.getElementById('dist3').value) / 100;
    const dist4_percentage = parseInt(document.getElementById('dist4').value) / 100;

    console.log(dist4_percentage);

    const margin = parseFloat(document.getElementById('input0').value);
    const dist1 = margin * dist1_percentage;
    const dist2 = margin * dist2_percentage;
    const dist3 = margin * dist3_percentage;
    const dist4 = margin * dist4_percentage;
    const risk  = 10;

    // const margin;
    // const capital;
    // const leverage;
    // const fee;

    // ----------------------------------------------------------------------------------
    //                                OUTPUT 1
    // ----------------------------------------------------------------------------------
    const output1 = document.getElementById("output1");
    output1.innerHTML += 'ENTRIES:<br>';

    // -------------------------------- entry 1 --------------------------------
    output1.innerHTML += '1: (' + entry1.toFixed(precision) + ')';
    output1.innerHTML += ' ' + leverage(risk, percentage(entry1, stoploss)) + 'x';
    output1.innerHTML += ' $' + dist1;

    const loss_1 = dist1 * leverage(risk, percentage(entry1, stoploss)) * percentage(entry1, stoploss);
    const profit_1 = dist1 * leverage(risk, percentage(entry1, stoploss)) * percentage(entry1, takeprofit);
    // output1.innerHTML += '<br> | $' + loss_1.toFixed(2) + ' : ' + '$' + profit_1.toFixed(2);

    // -------------------------------- entry 2 -------------------------------- 
    output1.innerHTML += '<br>' + '2: (' + entry2.toFixed(precision) + ')';
    output1.innerHTML += ' ' + leverage(risk, percentage(entry2, stoploss)) + 'x';
    output1.innerHTML += ' $' + dist2;

    const loss_2 = dist2 * leverage(risk, percentage(entry2, stoploss)) * percentage(entry2, stoploss);
    const profit_2 = dist2 * leverage(risk, percentage(entry2, stoploss)) * percentage(entry2, takeprofit);
    // output1.innerHTML += '<br> | $' + loss_2.toFixed(2) + ' : ' + '$' + profit_2.toFixed(2);

    // -------------------------------- entry 3 -------------------------------- 
    output1.innerHTML += '<br>' + '3: (' + entry3.toFixed(precision) + ')';
    output1.innerHTML += ' ' + leverage(risk, percentage(entry3, stoploss)) + 'x';
    output1.innerHTML += ' $' + dist3;

    const loss_3 = dist3 * leverage(risk, percentage(entry3, stoploss)) * percentage(entry3, stoploss);
    const profit_3 = dist3 * leverage(risk, percentage(entry3, stoploss)) * percentage(entry3, takeprofit);
    // output1.innerHTML += '<br> | $' + loss_3.toFixed(2) + ' : ' + '$' + profit_3.toFixed(2);

    // -------------------------------- entry 4 -------------------------------- 
    output1.innerHTML += '<br>' + '4: (' + entry4.toFixed(precision) + ')';
    output1.innerHTML += ' ' + leverage(risk, percentage(entry4, stoploss)) + 'x';    
    output1.innerHTML += ' $' + dist4;

    const loss_4 = dist4 * leverage(risk, percentage(entry4, stoploss)) * percentage(entry4, stoploss);
    const profit_4 = dist4 * leverage(risk, percentage(entry4, stoploss)) * percentage(entry4, takeprofit);
    // output1.innerHTML += '<br> | $' + loss_4.toFixed(2) + ' : ' + '$' + profit_4.toFixed(2);

    // -------------------------------- stoploss | takeprofit -------------------------------- 
    output1.innerHTML += '<br>';
    output1.innerHTML += '<br>SL: (' + stoploss.toFixed(precision) + ')';
    output1.innerHTML += '<br>TP: (' + takeprofit.toFixed(precision) + ')';




    // ----------------------------------------------------------------------------------
    //                                OUTPUT 2
    // ----------------------------------------------------------------------------------
    const output2 = document.getElementById("output2");

    // -------------------------------- profit loss -------------------------------- 
    let total_loss = 0;
    let total_profit = 0;

    // --------------------------- pnl 1 ---------------------------  
    total_loss = loss_1;
    total_profit = profit_1;

    output2.innerHTML += 'PROFIT/LOSS & RATIO:<br>';
    output2.innerHTML += '1: ';
    output2.innerHTML += ' [$' + total_loss.toFixed(2) + ' : $' + total_profit.toFixed(2) + ']';
    output2.innerHTML += ' | ' + Math.abs((total_profit / total_loss).toFixed(2));

    // --------------------------- pnl 2 ---------------------------  
    total_loss = loss_1 + loss_2;
    total_profit = profit_1 + profit_2;

    output2.innerHTML += '<br>2: ';
    output2.innerHTML += ' [$' + total_loss.toFixed(2) + ' : $' + total_profit.toFixed(2) + ']';
    output2.innerHTML += ' | ' + Math.abs((total_profit / total_loss).toFixed(2));
    // --------------------------- pnl 3 ---------------------------  
    total_loss = loss_1 + loss_2 + loss_3;
    total_profit = profit_1 + profit_2 + profit_3;

    output2.innerHTML += '<br>3: ';
    output2.innerHTML += ' [$' + total_loss.toFixed(2) + ' : $' + total_profit.toFixed(2) + ']';
    output2.innerHTML += ' | ' + Math.abs((total_profit / total_loss).toFixed(2));
    // --------------------------- pnl 4 ---------------------------  
    total_loss = loss_1 + loss_2 + loss_3 + loss_4;
    total_profit = profit_1 + profit_2 + profit_3 + profit_4;

    output2.innerHTML += '<br>4: ';
    output2.innerHTML += ' [$' + total_loss.toFixed(2) + ' : $' + total_profit.toFixed(2) + ']';
    output2.innerHTML += ' | ' + Math.abs((total_profit / total_loss).toFixed(2));

    // ----------------------------------------------------------------------------------
    //                                OUTPUT 3
    // ----------------------------------------------------------------------------------
    const output3 = document.getElementById("output3");

    output3.innerHTML += 'margin: $' + margin;
    output3.innerHTML += '<br>SL Fib: ' + stoploss_level;
    output3.innerHTML += '<br>TP Fib: ' + takeprofit_level;
    output3.innerHTML += '<br>risk: ' + risk + '%';



    // output2.innerHTML += '<br><br>dist1: $' + dist1.toFixed(2) + ' * 20x ';
    // output2.innerHTML += '<br>dist2: $' + dist2.toFixed(2);
    // output2.innerHTML += '<br>dist3: $' + dist3.toFixed(2);
    // output2.innerHTML += '<br>dist4: $' + dist4.toFixed(2);

    output2.innerHTML += '<br>';
}