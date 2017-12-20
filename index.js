'use strict';
// создаём массив состояния игрового поля и заполняем его случайными числами
var array = [[], [], [], []];
var usedArray = [];
for (var i = 0; i <= 3; i++) {
    for (var j = 0; j <= 3; j++) {
        var randomInt = getRandomInt(1, 16);
        while (usedArray.indexOf(randomInt) !== -1) {
            randomInt = getRandomInt(1, 16);
        }
        array[i][j] = randomInt;
        usedArray.push(randomInt);
    }
}

//заполняем этими числами таблицу
var table = document.getElementById('table').firstElementChild;
for (var i = 0; i <= 3; i++) {
    for (var j = 0; j <= 3; j++) {
        if (array[i][j] !== 16) {
            table.rows[i].cells[j].innerHTML = array[i][j];
            //вешаем обработчик события по клику
            table.rows[i].cells[j].addEventListener('click', checkCells);
        } else {
            //число 16 меняем на пустую строку
            table.rows[i].cells[j].innerHTML = '';
            //вешаем обработчик события по клику
            table.rows[i].cells[j].addEventListener('click', checkCells);
        }
    }
}

function checkCells() {
    //получаем значение в клетке, которую нажали
    var targetValue = parseInt(event.currentTarget.innerHTML);
    if (checkNeighbor(targetValue, 0, 1)) { //проверяем соседа справа, и если нет (=16), то меняем
        changePlace(targetValue, 0, 1);
    } else if (checkNeighbor(targetValue, 0, -1)) { //проверяем соседа слева, и если нет (=16), то меняем
        changePlace(targetValue, 0, -1);
    } else if (checkNeighbor(targetValue, -1, 0)) { //проверяем соседа сверху, и если нет (=16), то меняем
        changePlace(targetValue, -1, 0);
    } else if (checkNeighbor(targetValue, 1, 0)) { //проверяем соседа снизу, и если нет (=16), то меняем
        changePlace(targetValue, 1, 0);
    }
}

// функция проверки соседа справа/слева/сверху/снизу
function checkNeighbor(targetValue, changeOf_i, changeOf_j) {
    for (var i = 0; i < array.length; i++) {
        for (var j = 0; j < array[i].length; j++) {
            if (array[i][j] === targetValue && array[i+changeOf_i] !== undefined && array[j+changeOf_j] !== undefined && array[i+changeOf_i][j+changeOf_j] === 16) {
                return true;
            }
        }
    }
    return false;
}

//функция смены значений в массиве и в таблице
function changePlace(targetValue, changeOf_i, changeOf_j) {
    outer: for (var i = 0; i < array.length; i++) {
        for (var j = 0; j < array[i].length; j++) {
            if (array[i][j] === targetValue) {
                array[i+changeOf_i][j+changeOf_j] = targetValue;
                table.rows[i+changeOf_i].cells[j+changeOf_j].innerHTML = array[i+changeOf_i][j+changeOf_j];
                array[i][j] = 16;
                table.rows[i].cells[j].innerHTML = '';
                break outer;
            }
        }
    }
}

//функция получения рандомного числа
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}