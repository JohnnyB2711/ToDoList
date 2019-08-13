function LoadToDo() {
    const button_save = document.getElementsByName("button_save");
    const button_wrap = document.getElementById("wrap_button");
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
        li.append(span,button_delete);
        ul.append(li);
        DeleteTask(button_delete)
    }

    input.addEventListener("keypress", (keyPressed) => {
        const keyEnter = 13;
        if (keyPressed.which == keyEnter) {
            CreateTask();
        }
    });
    button_save.addEventListener('click', () => {
        localStorage.setItem('tasks', ul.innerHTML)
    })

    function DeleteTask(button){
        button.addEventListener("click",(event)=>{
            button.parentElement.remove();
            //event.stopPropagation();
        })
    }

    document.getElementById('wrap_button').onclick=function WrapTasks() {
        alert("fffffff");
    }
    button_wrap.click(function () {
        alert("fffffff");
    });
    function ShowTasks() {

    }
}

document.addEventListener("DOMContentLoaded", LoadToDo);