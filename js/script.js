function LoadToDo() {
    const input = document.querySelector("input[type='text']");
    const day_block = document.getElementById("day_block");
    const day = document.querySelectorAll('span.day');
    const add_button = document.querySelector('#add_button');
    const save_button = document.querySelector('#save_button');
    const remove_button = document.querySelector('#remove_button');
    let status_active;
    //const checkbox = document.querySelectorAll('checkbox-custom');

    //Шаблон создания задач
    function TemplateTasks(text) {
        const label = document.createElement('label');
        const li = document.createElement("li");
        const button_delete = document.createElement("input");
        const checkbox = document.createElement("input");
        const checkbox_custom = document.createElement("span");
        const span = document.createElement("span");
        span.classList.add("text");
        checkbox.setAttribute('type', 'checkbox');
        button_delete.setAttribute('type', 'button');
        button_delete.classList.add("button_delete");
        checkbox.classList.add('checkbox');
        checkbox_custom.classList.add("checkbox-custom");
        span.append(text);
        label.append(checkbox, checkbox_custom, span);
        ActiveCheck(label, checkbox);
        li.append(label, button_delete);
        return li;
    }

    //Функция создания задачи
    function CreateTask() {
        const ul = document.querySelector('span.active > ul');
        const task = document.createTextNode(input.value);
        ul.append(TemplateTasks(task));
        DeleteTask();
    }

    //Функция удаления задачи
    function DeleteTask() {
        const delete_button = document.querySelectorAll('.button_delete');
        for (let button of delete_button) {
            button.addEventListener("click", (event) => {
                button.parentElement.remove();
                event.stopPropagation();
            });
        }
    }

    //Загрузка данных в LocalStorage
    function LoadTasks() {
        let i, x;
        let checkbox;
        for (i = 0; i < day.length; i++) {
            if (day[i].querySelector('ul')) {
                const ul = (day[i].lastChild);
                localStorage.setItem(i, ul.innerText);
                let checkboxes = ul.querySelectorAll('.checkbox');
                console.log(checkboxes);
                for (x = 0; x < checkboxes.length; x++) {
                    if (checkboxes[x].checked) {
                        localStorage.setItem('day' + i + 'check' + x, 'true')
                    }
                }
            }
        }

    }

    save_button.addEventListener('click', LoadTasks);

    //Функция считывания данных из LocalStorage
    function LoadFromLS() {
        let x;
        for (x = 0; x < day.length; x++) {
            if (localStorage.getItem(x)) {
                let mas_task = localStorage.getItem(x).split('\n');
                const ul = document.createElement('ul');
                day[x].append(ul);
                for (let i = 0; i < mas_task.length; i++) {
                    ul.append(TemplateTasks(mas_task[i]));
                    let li = ul.querySelectorAll('li');
                    let checkbox = li[i].querySelector('.checkbox')
                    if (localStorage.getItem('day' + x + 'check' + i)) {
                        checkbox.checked = 'checked';
                        //ActiveCheck(li[i],checkbox)
                    }
                }
                DeleteTask()
            }

        }
    }

    LoadFromLS();

    //Очистка LS
    function RemoveLS() {
        localStorage.clear();
        LoadFromLS()
    }

    remove_button.addEventListener('click', RemoveLS);
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
        if (status_active) {
            if (input.value !== '') {
                const ul = document.querySelector('span.active > ul');
                const block = document.querySelector('span.active');
                if (!ul) {
                    const ul = document.createElement('ul');
                    block.append(ul);
                    CreateTask();
                    input.value = '';
                } else {
                    CreateTask();
                    input.value = '';
                }
            } else alert("Введите задачу")
        } else alert("Выбери день")
    }

    function ActiveCheck(label, checkbox) {
        label.addEventListener('click', function () {
            if (checkbox.checked) {
                label.parentElement.style.background = 'cornsilk'
            } else {
                label.parentElement.style.background = 'antiquewhite'
            }
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
    };

    function ActiveDay(day) {
        if (select_day) {
            select_day.classList.remove('active');
        }
        select_day = day;
        select_day.classList.add('active');
    }
}

document.addEventListener("DOMContentLoaded", LoadToDo);