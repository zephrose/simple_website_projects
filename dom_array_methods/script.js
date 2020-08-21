const main = document.getElementById('main');
const addUser = document.getElementById('add-user');
const double = document.getElementById('double');
const showMill = document.getElementById('show-millionaires');
const sortWealth = document.getElementById('sort');
const calcWealth = document.getElementById('calculate-wealth');

let data = [];

getRandUser();
getRandUser();
getRandUser();

console.log(data);

async function getRandUser() {
    const res = await fetch('https://randomuser.me/api');
    const data = await res.json()

    const user = data.results[0];

    const newUser = {
        name: `${user.name.first} ${user.name.last}`,
        money: Math.floor(Math.random()*1000000)
    }
    addData(newUser);
}

function doubleWealth() {
    data = data.map(user => {
        return { ...user, money: user.money * 2 }
    });

    updateDOM();
}

function sortUsersWealth() {
    data.sort((a, b) => b.money - a.money);
    
    updateDOM();
}

function showMillionaires() {
    data = data.filter(user => user.money > 1000000);

    updateDOM();
}

function calcAllUsersWealth() {
    const wealth = data.reduce((acc, user) => (acc += user.money), 0)
    const totalWealthElement = document.createElement('div');
    totalWealthElement.innerHTML = `<h3>Total Wealth: <strong>${formatMoney(wealth)}</strong></h3>`;
    main.appendChild(totalWealthElement);
}

function addData(obj) {
    data.push(obj);

    updateDOM();
}

function updateDOM(providedData = data) {
    main.innerHTML = '<h2><strong>Person</strong> Wealth</h2>';

    providedData.forEach(item => {
        const element = document.createElement('div');
        element.classList.add('person');
        element.innerHTML = `<strong>${item.name}</strong> ${formatMoney(item.money)}`;
        main.appendChild(element);
    });
}

function formatMoney(number) {
    return '$ ' + number.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
}

addUser.addEventListener('click', getRandUser);
double.addEventListener('click', doubleWealth);
sortWealth.addEventListener('click', sortUsersWealth);
showMill.addEventListener('click', showMillionaires);
calcWealth.addEventListener('click', calcAllUsersWealth);