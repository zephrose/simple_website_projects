const currency_ele_1 = document.getElementById('currency-one');
const currency_ele_2 = document.getElementById('currency-two');
const amount_ele_1 = document.getElementById('amount-one');
const amount_ele_2 = document.getElementById('amount-two');
const rate_ele = document.getElementById('rate');
const swap = document.getElementById('swap');

const apiKey = "dddd1041d3e0b6e458f7f4ee";

function calculate(){
    const curr_one = currency_ele_1.value;
    const curr_two = currency_ele_2.value;

    fetch(`https://v6.exchangerate-api.com/v6/${apiKey}/latest/${curr_one}`)
        .then(res => res.json())
        .then(data => {
            console.log(data);
            const rate = data.conversion_rates[curr_two];

            rate_ele.innerHTML = `1 ${curr_one} = ${rate} ${curr_two}.`;

            amount_ele_2.value = (amount_ele_1.value * rate).toFixed(2);
        });

}

currency_ele_1.addEventListener('change', calculate);
currency_ele_2.addEventListener('change', calculate);
amount_ele_1.addEventListener('input', calculate);
amount_ele_2.addEventListener('input', calculate);

swap.addEventListener('click', () => {
    const temp = currency_ele_1.value;
    currency_ele_1.value = currency_ele_2.value;
    currency_ele_2.value = temp;
    calculate();
});

calculate();