// API Configuration
const API_BASE_URL = 'http://localhost:5000/api';

class RestaurantAPI {
    // Menu API calls
    static async getMenuItems() {
        try {
            const response = await fetch(`${API_BASE_URL}/menu`);
            if (!response.ok) throw new Error('Failed to fetch menu');
            return await response.json();
        } catch (error) {
            console.error('Error fetching menu:', error);
            return [];
        }
    }

    static async addMenuItem(itemData) {
        try {
            const response = await fetch(`${API_BASE_URL}/menu`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(itemData)
            });
            if (!response.ok) throw new Error('Failed to add menu item');
            return await response.json();
        } catch (error) {
            console.error('Error adding menu item:', error);
            throw error;
        }
    }

    static async deleteMenuItem(itemId) {
        try {
            const response = await fetch(`${API_BASE_URL}/menu/${itemId}`, {
                method: 'DELETE'
            });
            if (!response.ok) throw new Error('Failed to delete menu item');
        } catch (error) {
            console.error('Error deleting menu item:', error);
            throw error;
        }
    }

    // Order API calls
    static async getOrders() {
        try {
            const response = await fetch(`${API_BASE_URL}/orders`);
            if (!response.ok) throw new Error('Failed to fetch orders');
            return await response.json();
        } catch (error) {
            console.error('Error fetching orders:', error);
            return [];
        }
    }

    static async createOrder(orderData) {
        try {
            const response = await fetch(`${API_BASE_URL}/orders`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(orderData)
            });
            if (!response.ok) throw new Error('Failed to create order');
            return await response.json();
        } catch (error) {
            console.error('Error creating order:', error);
            throw error;
        }
    }

    static async updateOrderStatus(orderId, status) {
        try {
            const response = await fetch(`${API_BASE_URL}/orders/${orderId}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ status })
            });
            if (!response.ok) throw new Error('Failed to update order');
            return await response.json();
        } catch (error) {
            console.error('Error updating order:', error);
            throw error;
        }
    }

    static async deleteOrder(orderId) {
        try {
            const response = await fetch(`${API_BASE_URL}/orders/${orderId}`, {
                method: 'DELETE'
            });
            if (!response.ok) throw new Error('Failed to delete order');
        } catch (error) {
            console.error('Error deleting order:', error);
            throw error;
        }
    }

    // Staff API calls
    static async getStaffMembers() {
        try {
            const response = await fetch(`${API_BASE_URL}/staff`);
            if (!response.ok) throw new Error('Failed to fetch staff');
            return await response.json();
        } catch (error) {
            console.error('Error fetching staff:', error);
            return [];
        }
    }

    static async addStaffMember(staffData) {
        try {
            const response = await fetch(`${API_BASE_URL}/staff`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(staffData)
            });
            if (!response.ok) throw new Error('Failed to add staff member');
            return await response.json();
        } catch (error) {
            console.error('Error adding staff member:', error);
            throw error;
        }
    }

    static async deleteStaffMember(staffId) {
        try {
            const response = await fetch(`${API_BASE_URL}/staff/${staffId}`, {
                method: 'DELETE'
            });
            if (!response.ok) throw new Error('Failed to delete staff member');
        } catch (error) {
            console.error('Error deleting staff member:', error);
            throw error;
        }
    }
}
