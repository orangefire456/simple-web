# Restaurant Management Web App

A simple web application for managing restaurant operations including menu items, orders, and staff.

## Features

- **Menu Management**: Add, edit, and delete menu items
- **Order Management**: Create and track customer orders
- **Staff Management**: Manage restaurant staff and schedules
- **Real-time Updates**: Live order status updates

## Project Structure

```
restaurant-management-app/
├── backend/              # Python Flask API
│   ├── app.py           # Main Flask application
│   ├── models.py        # Database models
│   ├── routes.py        # API routes
│   ├── config.py        # Configuration
│   └── requirements.txt  # Python dependencies
├── frontend/            # HTML/CSS/JavaScript
│   ├── index.html       # Main page
│   ├── css/             # Stylesheets
│   └── js/              # JavaScript files
└── README.md
```

## Getting Started

### Prerequisites

- Python 3.8+
- pip
- Modern web browser

### Backend Setup

```bash
cd backend
pip install -r requirements.txt
python app.py
```

The API will be available at `http://localhost:5000`

### Frontend

Open `frontend/index.html` in your web browser or serve it using a simple HTTP server:

```bash
cd frontend
python -m http.server 8000
```

Then visit `http://localhost:8000`

## API Endpoints

- `GET /api/menu` - Get all menu items
- `POST /api/menu` - Add new menu item
- `PUT /api/menu/<id>` - Update menu item
- `DELETE /api/menu/<id>` - Delete menu item
- `GET /api/orders` - Get all orders
- `POST /api/orders` - Create new order
- `PUT /api/orders/<id>` - Update order status
- `GET /api/staff` - Get all staff members
- `POST /api/staff` - Add new staff member

## License

MIT
