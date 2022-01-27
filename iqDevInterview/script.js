window.onload = function () {
    document.getElementById('chk').addEventListener('change', toggleInput);

    function toggleInput(evt) {
        if (document.getElementById('chk').checked) {
            document.getElementById('mon_dep').style.opacity = "1";
            document.getElementById('sumAdd').value = 0;
        } else {
            document.getElementById('mon_dep').style.opacity = "0";
            document.getElementById('sumAdd').value = 0;
        }
    }
}

function calculate() {

    var measure = document.getElementById('sel');
    if (measure.value == "year") {
        var term = document.getElementById('term').value * 12;
    } else if (measure.value == "month") {
        var term = document.getElementById('term').value;
    }
    var formInfo =
    {
        startDate: document.getElementById('startDate').value,
        sum: document.getElementById('sum').value,
        term: term,
        percent: document.getElementById('percent').value,
        sumAdd: document.getElementById('sumAdd').value
    }
    var xhr = new XMLHttpRequest();
    xhr.open('POST', 'calc.php');
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded'); // установить формат содержимого POST-запроса
    xhr.send('deposit=' + JSON.stringify(formInfo)); // отправить POST-запрос
    xhr.onreadystatechange = function () { // установить функцию-обработчик изменения свойства readyState
        if (xhr.readyState == 4) { // если ответ от сервера пришел и готов к обработке
            if (xhr.status == 200) { // и если ответ успешен
                document.getElementById('form').style.borderBottom = "1px solid black"
                document.getElementById('calculate').innerHTML = "Сумма к выплате";
                document.getElementById('res').innerHTML = "₽ " + JSON.parse(xhr.response)['sum']; // выводим ответ сервера пользователю в <span id="calculate"></span>  
            }
        }
    }
}
