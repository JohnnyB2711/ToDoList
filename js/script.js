function LoadToDo() {
    const monday_block = document.getElementById("monday");
    const input = document.querySelector("input[type='text']");
    const button_add = document.getElementsByName("button_add");
    const day_block = document.getElementById("day_block");
    const day = document.querySelectorAll('.day_block > span.day');
    const add_button = document.querySelector('#add_button');
    let status_active;

    //Функция создания задачи
    function CreateTask() {
        const ul = document.querySelector('span.active > ul');
        const label = document.createElement('label');
        const li = document.createElement("li");
        const button_delete = document.createElement("input");
        const checkbox = document.createElement("input");
        const checkbox_custom = document.createElement("span");
        const span = document.createElement("span");
        const task = document.createTextNode(input.value);
        span.classList.add("text");
        checkbox.setAttribute('type', 'checkbox');
        button_delete.setAttribute('type', 'button');
        button_delete.classList.add("button_delete");
        checkbox.classList.add('checkbox');
        checkbox_custom.classList.add("checkbox-custom");
        span.append(task);
        label.append(checkbox, checkbox_custom, span);
        li.append(label, button_delete);
        ul.append(li);
        console.log(label.parentElement)

        DeleteTask(button_delete);
        ActiveChesk(label)
    }

    //Добавление по нажатию кнопки
    add_button.addEventListener('click', (event) => {
        NewTask()
    });
    //Добавление по нажатию "Enter"
    input.addEventListener('keypress', (keyPressed) => {
        const keyEnter = 13;
        if (keyPressed.which == keyEnter) {
            NewTask()
        }
    });

    //Функция проверки корректности ввода задачи
    function NewTask() {
        if (status_active){
            if (input.value !== '') {
                const ul = document.querySelector('span.active > ul');
                if (!ul) {
                    const block = document.querySelector('span.active');
                    const ul = document.createElement('ul');
                    block.append(ul);
                    CreateTask();
                    input.value = '';
                } else {
                    CreateTask();
                    input.value = '';
                }
            } else alert("Введите задачу")
        }else  alert("Выбери день")
    }

    //Функция удаления задачи
    function DeleteTask(button) {
        button.addEventListener('click', (event) => {
            button.parentElement.remove();
            event.stopPropagation();
        })
    }

    function ActiveChesk(label) {
        label.addEventListener('click', (event) => {
            label.parentElement.style.background = 'cornsilk';
        })
    }

    let select_day;
    day_block.onclick = function (event) {
        let day = event.target;
        while (day != this) {
            if (day.className == 'day') {
                ActiveDay(day);
                status_active = true;
                const ul = document.querySelector('span.active > ul')
                return;
            }
            status_active = false;
            day = day.parentNode;
        }
        select_day.classList.remove('active')
    }

    function ActiveDay(day) {
        if (select_day) {
            select_day.classList.remove('active');
        }
        select_day = day;
        select_day.classList.add('active');
    }
}

document.addEventListener("DOMContentLoaded", LoadToDo);