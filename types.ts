
export interface User {
  id: number;
  username: string;
  role: 'customer' | 'admin';
}

export interface MenuItem {
  id: number;
  name: string;
  category: 'food' | 'drink';
  price: number;
  description: string;
  image: string;
}

export interface CartItem extends MenuItem {
  quantity: number;
}

export enum OrderStatus {
  Pending = 'Pending',
  InProgress = 'In Progress',
  Completed = 'Completed',
  Cancelled = 'Cancelled'
}

export interface OrderItem {
  id: number;
  menuItem: MenuItem;
  quantity: number;
  subtotal: number;
}

export interface Order {
  id: number;
  userId: number;
  customerName: string;
  customerPhone: string;
  customerAddress: string;
  items: OrderItem[];
  totalPrice: number;
  orderDate: string;
  status: OrderStatus;
  paymentMethod: 'Cash on Delivery' | 'Online Banking';
}
