// Timer Functionality
let timer;
let minutes = 25;
let seconds = 0;
let isRunning = false;

const minutesDisplay = document.getElementById('minutes');
const secondsDisplay = document.getElementById('seconds');
const toggleButton = document.getElementById('toggle-timer');
const resetButton = document.getElementById('reset-timer');
const customTimeInput = document.getElementById('custom-time');


function updateTimer() {
    if (seconds > 0) {
        seconds--;
    } else if (minutes > 0) {
        minutes--;
        seconds = 59;
    } else {
        clearInterval(timer);
        const alarm = new Audio('Resources/alarm.wav');
        alarm.play();
        setTimeout(() => {
            alert('Waktu habis! Silakan input ulang waktu.');
            alarm.pause(); // Berhenti saat alert ditekan
        }, 500); // tunggu 0.5 detik sebelum muncul alert
        isRunning = false;
        return;
    }

    minutesDisplay.textContent = minutes < 10 ? '0' + minutes : minutes;
    secondsDisplay.textContent = seconds < 10 ? '0' + seconds : seconds;
}

toggleButton.addEventListener('click', () => {
    if (!isRunning) {
        const customTime = customTimeInput.value;
        if (customTime) {
            minutes = parseInt(customTime);
            seconds = 0;
        }

        timer = setInterval(updateTimer, 1000);
        isRunning = true;
        toggleButton.innerHTML = '<ion-icon name="pause-circle"></ion-icon>'; // Ubah ikon menjadi pause
    } else {
        clearInterval(timer);
        isRunning = false;
        toggleButton.innerHTML = '<ion-icon name="play-circle"></ion-icon>'; // Ubah ikon menjadi play
    }
});

resetButton.addEventListener('click', () => {
    clearInterval(timer);
    minutes = 0;
    seconds = 0;
    minutesDisplay.textContent = '00';
    secondsDisplay.textContent = '00';
    isRunning = false;
    toggleButton.innerHTML = '<ion-icon name="play-circle"></ion-icon>'; // Pastikan ikon kembali ke play setelah reset
    alert('Timer telah direset!');
});

// To-Do List Functionality
const todoInput = document.getElementById('todo-input');
const addTodoButton = document.getElementById('add-todo');
const todoList = document.getElementById('todo-list');

// Load todo list from localStorage
document.addEventListener('DOMContentLoaded', () => {
    const storedTodos = localStorage.getItem('todos');
    if (storedTodos) {
        const todos = JSON.parse(storedTodos);
        todos.forEach(todo => {
            const li = document.createElement('li');
            li.classList.add('todo-item');

            const span = document.createElement('span');
            span.textContent = todo.text;
            if (todo.completed) {
                span.classList.add('completed');
            }

            const deleteButton = document.createElement('button');
            deleteButton.innerHTML = '<ion-icon name="close-sharp"></ion-icon>'; 
            deleteButton.addEventListener('click', () => {
                todoList.removeChild(li);
                saveTodos();
            });

            span.addEventListener('click', () => {
                span.classList.toggle('completed');
                saveTodos();
            });

            li.appendChild(span);
            li.appendChild(deleteButton);
            todoList.appendChild(li);
        });
    }
});

function addTodo() {
    const todoText = todoInput.value.trim();
    if (todoText) {
        const li = document.createElement('li');
        li.classList.add('todo-item');

        const span = document.createElement('span');
        span.textContent = todoText;

        const deleteButton = document.createElement('button');
        deleteButton.innerHTML = '<ion-icon name="close-sharp"></ion-icon>'; 
        deleteButton.addEventListener('click', () => {
            todoList.removeChild(li);
            saveTodos();
        });

        span.addEventListener('click', () => {
            span.classList.toggle('completed');
            saveTodos();
        });

        li.appendChild(span);
        li.appendChild(deleteButton);
        todoList.appendChild(li);

        todoInput.value = '';
        saveTodos();
    }
}

addTodoButton.addEventListener('click', addTodo);

todoInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        addTodo();
    }
});

function saveTodos() {
    const todos = Array.from(todoList.children).map(todo => ({
        text: todo.children[0].textContent,
        completed: todo.children[0].classList.contains('completed')
    }));
    localStorage.setItem('todos', JSON.stringify(todos));
}
