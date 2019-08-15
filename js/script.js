function LoadToDo() {
    const button_save = document.getElementsByName("button_save");
    const button_wrap = document.getElementById("wrap_button");
    const button_show = document.getElementById("show_button");
    const input = document.querySelector("input[type='text']");
    const ul = document.querySelector("ul.tasks");
    const button_add = document.getElementsByName("button_add");


    function CreateTask() {
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
    }

    input.addEventListener("keypress", (keyPressed) => {
        const keyEnter = 13;
        if (keyPressed.which == keyEnter) {
            CreateTask();
        }
    });

    function DeleteTask(button) {
        button.addEventListener("click", (event) => {
            button.parentElement.remove();
            //event.stopPropagation();
        })
    }

    function Wrap_Show_Tasks(button) {

            button1.addEventListener("click", (event) => {
                const day_tasks = button.parentElement.querySelector("ul.tasks");
               // if (day_tasks.style.display = "block")
                    day_tasks.style.display = "none";
               // else
              //      day_tasks.style.display = "block"
            })
    }


    Wrap_Show_Tasks(button_wrap);
}

document.addEventListener("DOMContentLoaded", LoadToDo);