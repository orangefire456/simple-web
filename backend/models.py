from datetime import datetime

class MenuItem:
    """Menu item model."""
    def __init__(self, id, name, description, price, category, available=True):
        self.id = id
        self.name = name
        self.description = description
        self.price = price
        self.category = category
        self.available = available

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'description': self.description,
            'price': self.price,
            'category': self.category,
            'available': self.available
        }

class Order:
    """Order model."""
    def __init__(self, id, customer_name, items, total, status='pending', created_at=None):
        self.id = id
        self.customer_name = customer_name
        self.items = items  # List of menu items
        self.total = total
        self.status = status  # pending, preparing, ready, completed
        self.created_at = created_at or datetime.now()

    def to_dict(self):
        return {
            'id': self.id,
            'customer_name': self.customer_name,
            'items': self.items,
            'total': self.total,
            'status': self.status,
            'created_at': self.created_at.isoformat()
        }

class StaffMember:
    """Staff member model."""
    def __init__(self, id, name, position, email, phone, schedule=None):
        self.id = id
        self.name = name
        self.position = position  # manager, chef, waiter, cashier
        self.email = email
        self.phone = phone
        self.schedule = schedule or {}

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'position': self.position,
            'email': self.email,
            'phone': self.phone,
            'schedule': self.schedule
        }
