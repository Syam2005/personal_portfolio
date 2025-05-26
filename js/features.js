// Todo List Functionality
const todoInput = document.getElementById('todo-input');
const addTodoBtn = document.getElementById('add-todo');
const todoList = document.getElementById('todo-list');
const filterBtns = document.querySelectorAll('.filter-btn');

let todos = JSON.parse(localStorage.getItem('todos')) || [];
let currentFilter = 'all';

// Add event listeners
addTodoBtn.addEventListener('click', addTodo);
todoInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') addTodo();
});

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        currentFilter = btn.getAttribute('data-filter');
        renderTodos();
    });
});

function addTodo() {
    const todoText = todoInput.value.trim();
    if (todoText) {
        const todo = {
            id: Date.now(),
            text: todoText,
            completed: false
        };
        todos.push(todo);
        saveTodos();
        renderTodos();
        todoInput.value = '';
    }
}

function toggleTodo(id) {
    todos = todos.map(todo => {
        if (todo.id === id) {
            return { ...todo, completed: !todo.completed };
        }
        return todo;
    });
    saveTodos();
    renderTodos();
}

function deleteTodo(id) {
    todos = todos.filter(todo => todo.id !== id);
    saveTodos();
    renderTodos();
}

function saveTodos() {
    localStorage.setItem('todos', JSON.stringify(todos));
}

function renderTodos() {
    const filteredTodos = todos.filter(todo => {
        if (currentFilter === 'active') return !todo.completed;
        if (currentFilter === 'completed') return todo.completed;
        return true;
    });

    todoList.innerHTML = '';
    filteredTodos.forEach(todo => {
        const li = document.createElement('li');
        li.className = `todo-item ${todo.completed ? 'completed' : ''}`;
        li.innerHTML = `
            <div class="todo-content">
                <input type="checkbox" ${todo.completed ? 'checked' : ''}>
                <span>${todo.text}</span>
            </div>
            <button class="delete-todo"><i class="fas fa-trash"></i></button>
        `;

        const checkbox = li.querySelector('input');
        checkbox.addEventListener('change', () => toggleTodo(todo.id));

        const deleteBtn = li.querySelector('.delete-todo');
        deleteBtn.addEventListener('click', () => deleteTodo(todo.id));

        todoList.appendChild(li);
    });
}

// Initialize todos on page load
document.addEventListener('DOMContentLoaded', () => {
    renderTodos();
});

// Products Functionality
const productsGrid = document.getElementById('products-grid');
const productSearch = document.getElementById('product-search');
const sortSelect = document.getElementById('sort-products');

const products = [
    {
        name: 'Laptop',
        category: 'electronics',
        price: 999.99,
        rating: 4.5,
        image: 'images/laptop.jpg'
    },
    // Add more products as needed
];

function renderProducts(filteredProducts) {
    productsGrid.innerHTML = '';
    filteredProducts.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        productCard.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p>$${product.price}</p>
            <div class="rating">Rating: ${product.rating}/5</div>
        `;
        productsGrid.appendChild(productCard);
    });
}

// Contact Form Functionality
// Add to your existing JavaScript

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Enhanced Todo functionality
function createTodoElement(todo) {
    const li = document.createElement('li');
    li.className = 'todo-item';
    li.innerHTML = `
        <div class="todo-content ${todo.completed ? 'completed' : ''}">
            <input type="checkbox" ${todo.completed ? 'checked' : ''}>
            <span>${todo.text}</span>
        </div>
        <div class="todo-actions">
            <button class="edit-todo"><i class="fas fa-edit"></i></button>
            <button class="delete-todo"><i class="fas fa-trash"></i></button>
        </div>
    `;

    // Add event listeners for todo actions
    const checkbox = li.querySelector('input[type="checkbox"]');
    checkbox.addEventListener('change', () => toggleTodo(todo.id));

    const editBtn = li.querySelector('.edit-todo');
    editBtn.addEventListener('click', () => editTodo(todo.id));

    const deleteBtn = li.querySelector('.delete-todo');
    deleteBtn.addEventListener('click', () => deleteTodo(todo.id));

    return li;
}

// Enhanced Product filtering
function filterProducts(products, filters) {
    return products.filter(product => {
        const matchesSearch = product.name.toLowerCase().includes(filters.search.toLowerCase());
        const matchesCategory = filters.category === 'all' || product.category === filters.category;
        return matchesSearch && matchesCategory;
    });
}

function sortProducts(products, sortBy) {
    return [...products].sort((a, b) => {
        switch(sortBy) {
            case 'price-low':
                return a.price - b.price;
            case 'price-high':
                return b.price - a.price;
            case 'rating':
                return b.rating - a.rating;
            default:
                return a.name.localeCompare(b.name);
        }
    });
}

// Form validation and submission
const contactForm = document.getElementById('contact-form');
contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    // Basic form validation
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();
    
    if (!name || !email || !message) {
        alert('Please fill in all fields');
        return;
    }
    
    // You can add your form submission logic here
    // For example, using EmailJS or a backend API
    
    alert('Message sent successfully!');
    contactForm.reset();
});

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    renderTodos();
    renderProducts(products);
});