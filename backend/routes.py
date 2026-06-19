from flask import Blueprint, request, jsonify
from models import MenuItem, Order, StaffMember
from datetime import datetime

api = Blueprint('api', __name__, url_prefix='/api')

# In-memory storage (in production, use a database)
menu_items = {}
orders = {}
staff_members = {}

# Menu Routes
@api.route('/menu', methods=['GET'])
def get_menu():
    """Get all menu items."""
    return jsonify([item.to_dict() for item in menu_items.values()])

@api.route('/menu', methods=['POST'])
def add_menu_item():
    """Add a new menu item."""
    data = request.get_json()
    
    if not data or not all(k in data for k in ['name', 'price', 'category']):
        return jsonify({'error': 'Missing required fields'}), 400
    
    item_id = max(menu_items.keys()) + 1 if menu_items else 1
    item = MenuItem(
        id=item_id,
        name=data['name'],
        description=data.get('description', ''),
        price=data['price'],
        category=data['category'],
        available=data.get('available', True)
    )
    
    menu_items[item_id] = item
    return jsonify(item.to_dict()), 201

@api.route('/menu/<int:item_id>', methods=['PUT'])
def update_menu_item(item_id):
    """Update a menu item."""
    if item_id not in menu_items:
        return jsonify({'error': 'Menu item not found'}), 404
    
    data = request.get_json()
    item = menu_items[item_id]
    
    item.name = data.get('name', item.name)
    item.description = data.get('description', item.description)
    item.price = data.get('price', item.price)
    item.category = data.get('category', item.category)
    item.available = data.get('available', item.available)
    
    return jsonify(item.to_dict())

@api.route('/menu/<int:item_id>', methods=['DELETE'])
def delete_menu_item(item_id):
    """Delete a menu item."""
    if item_id not in menu_items:
        return jsonify({'error': 'Menu item not found'}), 404
    
    del menu_items[item_id]
    return '', 204

# Order Routes
@api.route('/orders', methods=['GET'])
def get_orders():
    """Get all orders."""
    return jsonify([order.to_dict() for order in orders.values()])

@api.route('/orders', methods=['POST'])
def create_order():
    """Create a new order."""
    data = request.get_json()
    
    if not data or not all(k in data for k in ['customer_name', 'items']):
        return jsonify({'error': 'Missing required fields'}), 400
    
    order_id = max(orders.keys()) + 1 if orders else 1
    total = sum(item['price'] * item.get('quantity', 1) for item in data['items'])
    
    order = Order(
        id=order_id,
        customer_name=data['customer_name'],
        items=data['items'],
        total=total,
        status='pending'
    )
    
    orders[order_id] = order
    return jsonify(order.to_dict()), 201

@api.route('/orders/<int:order_id>', methods=['PUT'])
def update_order(order_id):
    """Update order status."""
    if order_id not in orders:
        return jsonify({'error': 'Order not found'}), 404
    
    data = request.get_json()
    order = orders[order_id]
    
    if 'status' in data:
        order.status = data['status']
    
    return jsonify(order.to_dict())

@api.route('/orders/<int:order_id>', methods=['DELETE'])
def delete_order(order_id):
    """Delete an order."""
    if order_id not in orders:
        return jsonify({'error': 'Order not found'}), 404
    
    del orders[order_id]
    return '', 204

# Staff Routes
@api.route('/staff', methods=['GET'])
def get_staff():
    """Get all staff members."""
    return jsonify([member.to_dict() for member in staff_members.values()])

@api.route('/staff', methods=['POST'])
def add_staff():
    """Add a new staff member."""
    data = request.get_json()
    
    if not data or not all(k in data for k in ['name', 'position', 'email']):
        return jsonify({'error': 'Missing required fields'}), 400
    
    staff_id = max(staff_members.keys()) + 1 if staff_members else 1
    member = StaffMember(
        id=staff_id,
        name=data['name'],
        position=data['position'],
        email=data['email'],
        phone=data.get('phone', ''),
        schedule=data.get('schedule', {})
    )
    
    staff_members[staff_id] = member
    return jsonify(member.to_dict()), 201

@api.route('/staff/<int:staff_id>', methods=['PUT'])
def update_staff(staff_id):
    """Update staff member information."""
    if staff_id not in staff_members:
        return jsonify({'error': 'Staff member not found'}), 404
    
    data = request.get_json()
    member = staff_members[staff_id]
    
    member.name = data.get('name', member.name)
    member.position = data.get('position', member.position)
    member.email = data.get('email', member.email)
    member.phone = data.get('phone', member.phone)
    member.schedule = data.get('schedule', member.schedule)
    
    return jsonify(member.to_dict())

@api.route('/staff/<int:staff_id>', methods=['DELETE'])
def delete_staff(staff_id):
    """Delete a staff member."""
    if staff_id not in staff_members:
        return jsonify({'error': 'Staff member not found'}), 404
    
    del staff_members[staff_id]
    return '', 204
