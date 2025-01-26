

document.addEventListener('DOMContentLoaded', function () {
    document.addEventListener('paste', function (evt) {
        const clipboardItems = evt.clipboardData.items;
        const items = [].slice.call(clipboardItems).filter(function (item) {
            // Filter the image items only
            return item.type.indexOf('image') !== -1;
        });
        if (items.length === 0) {
            return;
        }

        const item = items[0];
        const blob = item.getAsFile();

        const imageEle = document.getElementById('preview');
        imageEle.src = URL.createObjectURL(blob);

        (async () => {
            const worker = await Tesseract.createWorker('eng');
            const ret = await worker.recognize(URL.createObjectURL(blob));
            console.log(ret.data.text);
            await worker.terminate();
          })();

    });
});

const input1 = document.getElementById('input1');
const input2 = document.getElementById('input2');
const button1 = document.getElementById('button1');
const output1 = document.getElementById('output1');
const fibEntries = [0.0, 0.236, 0.382, 0.5, 0.618, 0.786];
const fibStops = [-0.382, -0.5, -0.236];
const fibProfits = [1.0, 1.272, 1.414, 1.618, 2.618, 3.618];

document.getElementById('input1').value = 12.008;
document.getElementById('input2').value = 13.002;


button1.addEventListener('click', function() {
    const fib0 = parseFloat(input1.value);
    const fib1 = parseFloat(input2.value);
    const precision = getPrecision(fib0);

    const fibn05 = fib(fib0, fib1, -0.5);
    const fib1618 = fib(fib0, fib1, 1.618);


    // output1.textContent = 'Fibx: ' + fibx.toFixed(precision);
    output1.innerHTML = 'fibn05: ' + fibn05.toFixed(precision)+ ' : ' + percent(fib0, fib1, 0, -0.5) + '%';
    output1.innerHTML += '<br>fib618: ' + fib1618.toFixed(precision)+ ' : ' + percent(fib0, fib1, 0, 1.618) + '%';
    output1.innerHTML += '<br>pnl: ' + xpnl(fib0, fib1, 0, 1.618, -0.5);


});

function getPrecision(n) {
    const xStr = n.toString();
    if (xStr.includes('.')) {
        return xStr.split('.')[1].length;
    } else {
        return 0;
    }
}

function fib(fib0, fib1, level) {
    return fib0 + (fib1 - fib0) * level;
}

function pnl(fibn, fibx) {
        return (((fibx - fibn) / fibn) * 100).toFixed(2);
}

function percent(fib0, fib1, fib_entry, fib_exit) {
    const entry_price = fib(fib0, fib1, fib_entry);
    const exit_price = fib(fib0, fib1, fib_exit);

    return (((exit_price - entry_price) / entry_price) * 100).toFixed(2);
}

function xpnl(fib0, fib1, fib_entry, fib_profit, fib_loss) {
    return Math.abs(percent(fib0, fib1, fib_entry, fib_profit) / percent(fib0, fib1, fib_entry, fib_loss)).toFixed(2);
}
