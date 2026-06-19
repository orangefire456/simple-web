// Application State
let menuItems = [];
let orders = [];
let staffMembers = [];

// DOM Elements
const navButtons = document.querySelectorAll('.nav-btn');
const tabContents = document.querySelectorAll('.tab-content');
const menuForm = document.getElementById('menuForm');
const orderForm = document.getElementById('orderForm');
const staffForm = document.getElementById('staffForm');
const menuItemsContainer = document.getElementById('menuItems');
const ordersListContainer = document.getElementById('ordersList');
const staffListContainer = document.getElementById('staffList');
const orderItemsSelect = document.getElementById('orderItemsSelect');

// Initialize app
document.addEventListener('DOMContentLoaded', () => {
    setupEventListeners();
    loadAllData();
});

// Event Listeners
function setupEventListeners() {
    // Tab switching
    navButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const tabName = e.target.dataset.tab;
            switchTab(tabName);
        });
    });

    // Form submissions
    menuForm.addEventListener('submit', handleMenuSubmit);
    orderForm.addEventListener('submit', handleOrderSubmit);
    staffForm.addEventListener('submit', handleStaffSubmit);
}

// Tab Switching
function switchTab(tabName) {
    // Hide all tabs
    tabContents.forEach(tab => tab.classList.remove('active'));
    navButtons.forEach(btn => btn.classList.remove('active'));

    // Show selected tab
    document.getElementById(tabName).classList.add('active');
    document.querySelector(`[data-tab="${tabName}"]`).classList.add('active');

    // Refresh data for selected tab
    if (tabName === 'menu') loadMenuItems();
    else if (tabName === 'orders') loadOrders();
    else if (tabName === 'staff') loadStaffMembers();
}

// Data Loading
async function loadAllData() {
    await Promise.all([
        loadMenuItems(),
        loadOrders(),
        loadStaffMembers()
    ]);
}

async function loadMenuItems() {
    menuItems = await RestaurantAPI.getMenuItems();
    renderMenuItems();
    updateOrderItemsSelect();
}

async function loadOrders() {
    orders = await RestaurantAPI.getOrders();
    renderOrders();
}

async function loadStaffMembers() {
    staffMembers = await RestaurantAPI.getStaffMembers();
    renderStaffMembers();
}

// Rendering Functions
function renderMenuItems() {
    if (menuItems.length === 0) {
        menuItemsContainer.innerHTML = '<div class="empty-state">No menu items yet. Add one to get started!</div>';
        return;
    }

    menuItemsContainer.innerHTML = menuItems.map(item => `
        <div class="item-card">
            <h4>${item.name}</h4>
            <p>${item.description}</p>
            <div class="item-price">$${item.price.toFixed(2)}</div>
            <span class="item-category">${item.category}</span>
            <div class="item-actions">
                <button class="btn-danger" onclick="deleteMenuItemHandler(${item.id})">Delete</button>
            </div>
        </div>
    `).join('');
}

function renderOrders() {
    if (orders.length === 0) {
        ordersListContainer.innerHTML = '<div class="empty-state">No orders yet.</div>';
        return;
    }

    ordersListContainer.innerHTML = orders.map(order => `
        <div class="order-card">
            <h4>Order #${order.id}</h4>
            <div>Customer: ${order.customer_name}</div>
            <span class="order-status ${order.status}">${order.status.toUpperCase()}</span>
            <div class="order-details">
                <p>Items: ${order.items.length}</p>
                <p>Total: $${order.total.toFixed(2)}</p>
                <p>Created: ${new Date(order.created_at).toLocaleString()}</p>
            </div>
            <div class="order-actions">
                <select onchange="updateOrderStatusHandler(${order.id}, this.value)" class="btn-secondary">
                    <option value="pending" ${order.status === 'pending' ? 'selected' : ''}>Pending</option>
                    <option value="preparing" ${order.status === 'preparing' ? 'selected' : ''}>Preparing</option>
                    <option value="ready" ${order.status === 'ready' ? 'selected' : ''}>Ready</option>
                    <option value="completed" ${order.status === 'completed' ? 'selected' : ''}>Completed</option>
                </select>
                <button class="btn-danger" onclick="deleteOrderHandler(${order.id})">Delete</button>
            </div>
        </div>
    `).join('');
}

function renderStaffMembers() {
    if (staffMembers.length === 0) {
        staffListContainer.innerHTML = '<div class="empty-state">No staff members yet. Add one to get started!</div>';
        return;
    }

    staffListContainer.innerHTML = staffMembers.map(member => `
        <div class="staff-card">
            <h4>${member.name}</h4>
            <span class="staff-position">${member.position.toUpperCase()}</span>
            <div class="staff-info">Email: ${member.email}</div>
            <div class="staff-info">Phone: ${member.phone}</div>
            <div class="staff-actions">
                <button class="btn-danger" onclick="deleteStaffHandler(${member.id})">Delete</button>
            </div>
        </div>
    `).join('');
}

function updateOrderItemsSelect() {
    orderItemsSelect.innerHTML = menuItems.map(item => `
        <div class="order-item-checkbox">
            <input type="checkbox" id="item-${item.id}" value="${item.id}" data-name="${item.name}" data-price="${item.price}">
            <label for="item-${item.id}">${item.name} - $${item.price.toFixed(2)}</label>
        </div>
    `).join('');
}

// Form Handlers
async function handleMenuSubmit(e) {
    e.preventDefault();

    const itemData = {
        name: document.getElementById('itemName').value,
        description: document.getElementById('itemDescription').value,
        price: parseFloat(document.getElementById('itemPrice').value),
        category: document.getElementById('itemCategory').value
    };

    try {
        await RestaurantAPI.addMenuItem(itemData);
        alert('Menu item added successfully!');
        menuForm.reset();
        await loadMenuItems();
    } catch (error) {
        alert('Error adding menu item: ' + error.message);
    }
}

async function handleOrderSubmit(e) {
    e.preventDefault();

    const selectedItems = Array.from(document.querySelectorAll('#orderItemsSelect input[type="checkbox"]:checked'));
    
    if (selectedItems.length === 0) {
        alert('Please select at least one item for the order.');
        return;
    }

    const items = selectedItems.map(checkbox => ({
        id: checkbox.value,
        name: checkbox.dataset.name,
        price: parseFloat(checkbox.dataset.price),
        quantity: 1
    }));

    const orderData = {
        customer_name: document.getElementById('customerName').value,
        items: items
    };

    try {
        await RestaurantAPI.createOrder(orderData);
        alert('Order created successfully!');
        orderForm.reset();
        await loadOrders();
    } catch (error) {
        alert('Error creating order: ' + error.message);
    }
}

async function handleStaffSubmit(e) {
    e.preventDefault();

    const staffData = {
        name: document.getElementById('staffName').value,
        position: document.getElementById('staffPosition').value,
        email: document.getElementById('staffEmail').value,
        phone: document.getElementById('staffPhone').value
    };

    try {
        await RestaurantAPI.addStaffMember(staffData);
        alert('Staff member added successfully!');
        staffForm.reset();
        await loadStaffMembers();
    } catch (error) {
        alert('Error adding staff member: ' + error.message);
    }
}

// Action Handlers
async function deleteMenuItemHandler(itemId) {
    if (confirm('Are you sure you want to delete this menu item?')) {
        try {
            await RestaurantAPI.deleteMenuItem(itemId);
            await loadMenuItems();
        } catch (error) {
            alert('Error deleting menu item: ' + error.message);
        }
    }
}

async function updateOrderStatusHandler(orderId, status) {
    try {
        await RestaurantAPI.updateOrderStatus(orderId, status);
        await loadOrders();
    } catch (error) {
        alert('Error updating order: ' + error.message);
    }
}

async function deleteOrderHandler(orderId) {
    if (confirm('Are you sure you want to delete this order?')) {
        try {
            await RestaurantAPI.deleteOrder(orderId);
            await loadOrders();
        } catch (error) {
            alert('Error deleting order: ' + error.message);
        }
    }
}

async function deleteStaffHandler(staffId) {
    if (confirm('Are you sure you want to delete this staff member?')) {
        try {
            await RestaurantAPI.deleteStaffMember(staffId);
            await loadStaffMembers();
        } catch (error) {
            alert('Error deleting staff member: ' + error.message);
        }
    }
}
