const css_task = {
    item: 'item',
    div0: 'item-div0',
    div1: 'item-div1',
    div2: 'item-div2',
    btn: 'item-btn',
    btn_cmp: 'btn-cmp',
    btn_rmv: 'btn-rmv',
    completed: 'task-cmp',
}

const input = document.querySelector('input#task-text');
const button = document.querySelector('button.btn');
const ul = document.querySelector('ul.list');

let task_total = 0;
let task_list = [];

function textIsNull() {
    if (input.value.length === 0) {
        return true;
    } else {
        return false;
    }
}

class Task {
    constructor(text) {
        this.item = domCreateTask(text, this);
        this.completed = false;
        this.id = ++task_total;

        task_list.push(this);
    }

    complete() {
        this.completed = !this.completed;
        domCompleteTask(this.item);
    }

    remove() {
        const index = task_list.findIndex(task => task.id === this.id);
        if (index == -1) return;

        task_list.splice(index, 1);
        this.item.remove();
    }
}

function domCreateTask(text, task) {
    let li = document.createElement('li');
        li.classList.add(css_task.item);
    let div0 = document.createElement('div');
        div0.classList.add(css_task.div0);
    
    let div1 = document.createElement('div');
        div1.classList.add(css_task.div1);
    let p = document.createElement('p');
        p.textContent = text;
    
    let div2 = document.createElement('div');
        div2.classList.add(css_task.div2);
    let btn_cmp = document.createElement('button');
        btn_cmp.onclick = () => task.complete();
        btn_cmp.textContent = 'Concluir';
        btn_cmp.classList.add(css_task.btn);
        btn_cmp.classList.add(css_task.btn_cmp);
    let btn_rmv = document.createElement('button');
        btn_rmv.onclick = () => task.remove();
        btn_rmv.textContent = 'Remover';
        btn_rmv.classList.add(css_task.btn);
        btn_rmv.classList.add(css_task.btn_rmv);
    
    
    div1.appendChild(p);
    div2.appendChild(btn_cmp);
    div2.appendChild(btn_rmv);
    div0.appendChild(div1);
    div0.appendChild(div2);
    li.appendChild(div0);
    ul.appendChild(li);

    return li;
}

function domCompleteTask(item) {
    const task_li = item.closest('li');
    const task_p = item.querySelector('p');
    task_p.classList.toggle(css_task.completed);
}

function addTask() {
    let task = new Task(input.value);
    input.value = '';
}

button.addEventListener('click', function () {
    if (textIsNull()) return;
    addTask();
});

input.addEventListener('keydown', function(evt) {
    if (evt.key === 'Enter') {
        evt.preventDefault();
        if (textIsNull()) return;
        addTask();
    }
});