function LoadToDo() {
    //const button_save = document.getElementsByName("button_save");
    //const button_wrap = document.getElementById("mon_button");
    const monday_block = document.getElementById("monday");
    const input = document.querySelector("input[type='text']");
    const button_add = document.getElementsByName("button_add");
    const day_block = document.getElementById("day_block");
    const day = document.querySelectorAll('.day_block > span.day');
    const add_button = document.querySelector('#add_button')
    let status_active;

    //Функция создания задачи
    function CreateTask() {
        if (status_active) {
            const ul = document.querySelector('span.active > ul')
            const li = document.createElement("li");
            const button_delete = document.createElement("button");
            const span = document.createElement("span");
            const task = document.createTextNode(input.value);
            span.classList.add("text");
            button_delete.classList.add("button_delete");
            span.append(task);
            li.append(span, button_delete);
            ul.append(li);

            DeleteTask(button_delete)
        } else {
            alert('Выбери день недели!')
        }
    }
    //Добавление по нажатию кнопки
    add_button.addEventListener('click',(event)=>{
            NewTask()
    })
    //Добавление по нажатию "Enter"
    input.addEventListener('keypress', (keyPressed) => {
        const keyEnter = 13;
        if (keyPressed.which == keyEnter) {
            NewTask()
        }
    });
    //Функция проверки корректности ввода задачи
    function NewTask() {
        if (input.value !== '') {
            CreateTask();
            input.value = '';
        } else alert("Введите задачу")
    }
    //Функция удаления задачи
    function DeleteTask(button) {
        button.addEventListener('click', (event) => {
            button.parentElement.remove();
            event.stopPropagation();
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
            //day = day.parentNode;
        }
        select_day.classList.remove('active')
    }

    function ActiveDay(day) {
        if (select_day) {
            select_day.classList.remove('active');
            // console.log(day.classList)
        }
        select_day = day;
        select_day.classList.add('active');
        // console.log(day.classList);
    }

    /*    function Wrap_Show_Tasks(button) {
            const day_tasks = button.parentElement.querySelector("ul.task");
            day_tasks.style.display = 'block';
            button.style.background='url("../wrap.png") no-repeat'
            button.addEventListener('click', (event) => {
                if (day_tasks.style.display == 'block')
                {
                    day_tasks.style.display = 'none';
                    button.style.background='url("../show.png") no-repeat'
                }
                else
                {
                    day_tasks.style.display = 'block';
                    button.style.background='url("../wrap.png") no-repeat'
                }

            })
        }*/

    // Wrap_Show_Tasks(button_wrap);

}

document.addEventListener("DOMContentLoaded", LoadToDo);