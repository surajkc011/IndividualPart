const todos = [{
    text: 'Order cat food',
    completed: false
}, {
    text: 'Clean kitchen',
    completed: true
}, {
    text: 'Buy food',
    completed: true
}, {
    text: 'Do work',
    completed: false
}, {
    text: 'Exercise',
    completed: true
}];

const filters = {
    searchText: '',
    hideCompleted: false
};


const renderTodos = () => {
    const filteredTodos = todos.filter(todo => 
        todo.text.toLowerCase().includes(filters.searchText.toLowerCase()) &&
        (!filters.hideCompleted || !todo.completed)
    );

    document.getElementById('todos').innerHTML = ''; 

    filteredTodos.forEach(todo => {
        const todoEl = document.createElement('div');
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.checked = todo.completed;
        checkbox.addEventListener('change', () => {
            todo.completed = !todo.completed;
            renderTodos();
        });

        const todoText = document.createElement('span');
        todoText.textContent = todo.text;
        if (todo.completed) {
            todoText.style.textDecoration = 'line-through';
        }

        todoEl.appendChild(checkbox);
        todoEl.appendChild(todoText);
        document.getElementById('todos').appendChild(todoEl);
    });
};


document.getElementById('new-todo').addEventListener('submit', e => {
    e.preventDefault();
    const text = e.target.elements[0].value.trim();
    if (text) {
        todos.push({ text, completed: false });
        renderTodos();
        e.target.elements[0].value = '';
    }
});

document.getElementById('search-text').addEventListener('input', e => {
    filters.searchText = e.target.value;
    renderTodos();
});

document.getElementById('hide-completed').addEventListener('change', e => {
    filters.hideCompleted = e.target.checked;
    renderTodos();
});
renderTodos();