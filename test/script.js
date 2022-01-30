window.onload = function () {
    document.getElementById('chk').addEventListener('change', toggleInput);
    document.getElementById('chk').checked = false;
    document.getElementById('sumAdd').value = 0;
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

function validate() {
    var measure = document.getElementById('sel');
    if (measure.value == "year") {
        var termRules = {
            required: true,
            number: true,
            min: 1,
            max: 5
        };
        var termMessages =
        {
            required: "Это поле обязательно нужно заполнить.",
            min: "Введите число в диапазоне от 1 до 5",
            max: "Введите число в диапазоне от 1 до 5",
            number: "Введите корректное число."
        };
    } else if (measure.value == "month") {
        var termRules = {
            required: true,
            number: true,
            min: 1,
            max: 60
        };
        var termMessages =
        {
            required: "Это поле обязательно нужно заполнить.",
            min: "Введите число в диапазоне от 1 до 60",
            max: "Введите число в диапазоне от 1 до 60",
            number: "Введите корректное число."
        };
    }
    $("#input-form").validate({
        rules:
        {
            startDate:
            {
                required: true
            },
            term: termRules,
            sum:
            {
                min: 1000,
                max: 3000000,
                required: true,
                number: true
            },
            percent:
            {
                min: 3,
                max: 100,
                required: true,
                number: true
            },
            sumAdd:
            {
                required: true,
                number: true
            }
        },
        messages:
        {
            startDate:
            {
                required: "Это поле обязательно нужно заполнить."
            },
            term: termMessages,
            sum:
            {
                min: "Введите число в диапазоне от 1000 до 3000000",
                max: "Введите число в диапазоне от 1000 до 3000000",
                required: "Это поле обязательно нужно заполнить.",
                number: "Введите корректное число."
            },
            percent:
            {
                min: "Введите число в диапазоне от 3 до 100",
                max: "Введите число в диапазоне от 3 до 100",
                required: "Это поле обязательно нужно заполнить.",
                number: "Введите корректное число."
            },
            sumAdd:
            {
                min: "Введите число в диапазоне от 0 до 3000000",
                max: "Введите число в диапазоне от 0 до 3000000",
                required: "Это поле обязательно нужно заполнить.",
                number: "Введите корректное число."
            }
        },
        submitHandler: function () {
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
            $.ajax({
                type: "POST",
                url: "calc.php",
                data: "deposit=" + JSON.stringify(formInfo),
                success: function (data) {
                    document.getElementById('form').style.borderBottom = "1px solid black";
                    $("#calculate").html("Сумма к выплате:");
                    $("#res").html("₽ " + data['sum']);
                },
                error: function (xhr, str) {
                    alert("Возникла ошибка!");
                }
            });

        },
        errorElement: "div",
        errorPlacement: function (error, element) {
            if (element.attr("name") == "term") {
                error.insertAfter(".combo-input");
            } else {
                error.insertAfter(element);
            }
        }
    });
}