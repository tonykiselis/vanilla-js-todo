const select = document.querySelector.bind(document);

const listItems = [];
let counter = -1;
const increment = () => {
    counter += 1;
    return counter;
};

document.addEventListener('DOMContentLoaded', () => {
    const submit = select('input[type=submit]');
    submit.addEventListener('click', add)
});

function add() {
    const input = select('input[name=item-form]');
    if (input.value === '') return;

    listItems.push({
        id: increment(),
        value: input.value,
    });
    input.value = '';
    render();
}

function remove(span) {
    const index = listItems.findIndex(item => item.id === parseInt(span.id));
    listItems.splice(index, 1);
    render();
}

function compileListElement({ id, value }) {
    const span = document.createElement('button');
    span.innerText = 'remove';
    span.id = id;
    span.addEventListener('click', () => remove(span));

    const liElement = document.createElement('li');
    liElement.innerText = value;
    liElement.classList.add('todo-item');
    liElement.append(span);

    return liElement;
}

function render() {
    const liElements = listItems.map(compileListElement);
    const todoList = select('.todo-list');
    while (todoList.firstChild) {
        todoList.removeChild(todoList.firstChild);
    }

    liElements.forEach(item => {
        todoList.append(item);
    });
}
