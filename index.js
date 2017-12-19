'use strict';
var array = [];
var usedArray = [];
var table = document.getElementById("table");

//создаём случайный массив
while (usedArray.length <= 15) {
    var randomNumber = getRandomInt(0, 15);
    if (usedArray.indexOf(randomNumber) === -1) {
        array.push(randomNumber);
        usedArray.push(randomNumber);
    }
    else {
        continue;
    }
}

console.log(array);

//забиваем в таблицу 
var indexInArray = 0;
for(var i=0; i<=3; i++) {
    for(var j=0; j<=3; j++) {
        if (array[indexInArray] !== 0) {
            table.firstElementChild.children[i].children[j].textContent = array[indexInArray];
            indexInArray++;
            table.firstElementChild.children[i].children[j].addEventListener('click', changePlace);
        } else {
            table.firstElementChild.children[i].children[j].textContent = '';
            indexInArray++;
            table.firstElementChild.children[i].children[j].addEventListener('click', changePlace);
        }

    }
}
table.firstElementChild.children[1].children[1].style.backgroundColor = 'red';


function changePlace() {
    console.log(event.currentTarget.nextElementSibling);
    if (checkRight(event.currentTarget.nextElementSibling)) {
        //меняем местами в массиве
        var tempArrayValue = parseInt(event.currentTarget.textContent);
        console.log(tempArrayValue);
        array[array.indexOf(parseInt(event.currentTarget.textContent))] = array[array.indexOf(parseInt(event.currentTarget.nextElementSibling.textContent))];
        array[array.indexOf(parseInt(event.currentTarget.nextElementSibling.textContent))] = tempArrayValue;
        //обновляем таблицу ...
    }
}

//проверка соседа справа
function checkRight(rightElem) {
    if ( rightElem !== null && rightElem.textContent === '') {
        return true;
    }
    else {
        return false;
    }
}

//функция получения рандомного числа
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
