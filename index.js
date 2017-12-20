'use strict';
//время старта игры
var startTime;
// состояние таймера (0 - выключен, 1 - включен)
var timerState = 0;



var array = [];
var sizeX = parseInt(prompt('Введите размер поля по горизонтали:', 4));
var sizeY = parseInt(prompt('Введите размер поля по вертикали:', 4));
var numberOfCells = sizeX * sizeY;
for(let i = 0; i < sizeX; i++) {
    array[i] = [];
}
var table = document.getElementById('table');
for(let i = 0; i < sizeX; i++) {
    var tr = document.createElement('tr');
    table.appendChild(tr);
    for(let j = 0; j < sizeY; j++) {
        var td = document.createElement('td');
        tr.appendChild(td);
    }
}

// создаём массив состояния игрового поля и заполняем его случайными числами
// var array = [
//     [], 
//     [], 
//     [], 
//     []
// ];
var usedArray = [];

for (var i = 0; i < sizeX; i++) {
    for (var j = 0; j < sizeY; j++) {
        var randomInt = getRandomInt(1, numberOfCells);
        while (usedArray.indexOf(randomInt) !== -1) {
            randomInt = getRandomInt(1, numberOfCells);
        }
        array[i][j] = randomInt;
        usedArray.push(randomInt);
    }
}

//заполняем этими числами таблицу
// var table = document.getElementById('table');
for (var i = 0; i < sizeX; i++) {
    for (var j = 0; j < sizeY; j++) {
        if (array[i][j] !== numberOfCells) {
            table.rows[i].cells[j].innerHTML = array[i][j];
            //вешаем обработчик события по клику
            table.rows[i].cells[j].addEventListener('click', checkCells);
            //обработчик на запуск таймера
            table.rows[i].cells[j].addEventListener('click', createTimer);
            //установка серых ячеек
            table.rows[i].cells[j].style.backgroundColor = 'rgba(0, 0, 0, 0.15)';
        } else {
            //число numberOfCells меняем на пустую строку
            table.rows[i].cells[j].innerHTML = '';
            //вешаем обработчик события по клику
            table.rows[i].cells[j].addEventListener('click', checkCells);
            //установка белой ячейки
            table.rows[i].cells[j].style.backgroundColor = 'white';
        }
    }
}
function checkCells() {
    //получаем значение в клетке, которую нажали
    var targetValue = parseInt(event.currentTarget.innerHTML);
    if (checkNeighbor(targetValue, 0, 1)) { //проверяем соседа справа, и если нет (=numberOfCells), то меняем
        changePlace(targetValue, 0, 1);
    } else if (checkNeighbor(targetValue, 0, -1)) { //проверяем соседа слева, и если нет (=numberOfCells), то меняем
        changePlace(targetValue, 0, -1);
    } else if (checkNeighbor(targetValue, -1, 0)) { //проверяем соседа сверху, и если нет (=numberOfCells), то меняем
        changePlace(targetValue, -1, 0);
    } else if (checkNeighbor(targetValue, 1, 0)) { //проверяем соседа снизу, и если нет (=numberOfCells), то меняем
        changePlace(targetValue, 1, 0);
    }
}
// функция проверки соседа справа/слева/сверху/снизу
function checkNeighbor(targetValue, changeOf_i, changeOf_j) {
    // console.log('Вызвалась функция проверки соседа');
    // console.log(array.length + ' - длина массива');
    // console.log(targetValue + ' - targetValue');
    for (var i = 0; i < array.length; i++) {
        // console.log(array[i].length + ' - длина подмассива');
        for (var j = 0; j < array[i].length; j++) {
            console.log(i + ' -  i');
            console.log(j + ' -  j');
            console.log(array[i][j] + ' - array[i][j]');
            console.log(array[i + changeOf_i] + ' - array[i + changeOf_i]');
            // console.log(array[j + changeOf_j] + ' - array[j + changeOf_j]');
            // console.log(array[i + changeOf_i][j + changeOf_j] + ' - array[i + changeOf_i][j + changeOf_j]');
            console.log('\n');

            if (array[i][j] === targetValue && array[i + changeOf_i] !== undefined /*&& array[j + changeOf_j] !== undefined */&& array[i + changeOf_i][j + changeOf_j] === numberOfCells) {
                console.log('Возвращаю true');
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
                array[i + changeOf_i][j + changeOf_j] = targetValue;
                var tempColor = table.rows[i].cells[j].style.backgroundColor;
                var div = document.createElement('div'); //создание временного div'a
                div.innerHTML = table.rows[i].cells[j].innerHTML;
                div.style.textAlign = 'center';
                div.style.lineHeight = '49px';
                div.id = 'movingDiv';
                div.style.backgroundColor = tempColor;
                div.style.display = 'inline-block';
                div.style.position = 'absolute';
                div.style.width = '49px';
                div.style.height = '49px';
                div.style.fontSize = '32px';
                div.style.top = event.currentTarget.offsetTop + 2 + 'px';
                div.style.left = table.offsetLeft + event.currentTarget.offsetLeft + 2 + 'px';
                div.style.transitionProperty = 'top left';
                div.style.transitionDuration = '1s'
                document.getElementsByTagName('body')[0].appendChild(div);
                setTimeout(function () {
                    if (changeOf_i === 0 && changeOf_j === 1) {
                        div.style.left = div.offsetLeft + 50 + 'px';
                    } else if (changeOf_i === 0 && changeOf_j === -1) {
                        div.style.left = div.offsetLeft - 50 + 'px';
                    } else if (changeOf_i === -1 && changeOf_j === 0) {
                        div.style.top = div.offsetTop - 50 + 'px';
                    } else if (changeOf_i === 1 && changeOf_j === 0) {
                        div.style.top = div.offsetTop + 50 + 'px';
                    };
                    setTimeout(function () {
                        document.getElementsByTagName('body')[0].removeChild(div); //удаление временного div'a
                        table.rows[i + changeOf_i].cells[j + changeOf_j].innerHTML = array[i + changeOf_i][j + changeOf_j];
                        table.rows[i + changeOf_i].cells[j + changeOf_j].style.backgroundColor = tempColor;
                    }, 1000)
                }, 0)

                array[i][j] = numberOfCells;
                table.rows[i].cells[j].innerHTML = '';
                table.rows[i].cells[j].style.backgroundColor = 'white';
                break outer;
            }
        }
    }
    //setTimeout тут больше для красоты
    setTimeout(function () {
        //если решил
        if (checkIfSolved()) {
            var endTime = new Date().getTime();
            var solveTime = endTime - startTime;
            var solveTimeSeconds = Math.floor(solveTime / 1000);
            var solveTimeMiliseconds = Math.round((solveTime % 1000) / 10);
            startTime = null;
            timerState = 0;
            alert('Ура! Вы решили головоломку за ' + solveTimeSeconds + '.' + solveTimeMiliseconds + ' сек.');
        }
    }, 1000);
}

function createTimer() {
    if (timerState === 0) { //если таймер выключен, то включаем
        startTime = new Date().getTime();
        timerState = 1;
    }
}
//функция проверки решения
function checkIfSolved() {
    var k = 0;
    outer: for (var i = 0; i < array.length; i++) {
        for (var j = 0; j < array[i].length; j++) {
            if (array[i][j] !== k + 1) {
                break outer;
            } else {
                k++;
            }
        }
    }
    if (k === numberOfCells) {
        return true;
    }
    return false;
}
//функция получения рандомного числа
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}