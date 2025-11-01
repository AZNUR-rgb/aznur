
import { User, MenuItem, Order, OrderStatus } from '../types';

// Helper to simulate async operations
const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Helper to get data from localStorage
const getData = <T>(key: string, defaultValue: T): T => {
    try {
        const item = localStorage.getItem(key);
        return item ? JSON.parse(item) : defaultValue;
    } catch (error) {
        console.error(`Error reading from localStorage key “${key}”:`, error);
        return defaultValue;
    }
};

// Helper to set data to localStorage
const setData = <T>(key: string, value: T) => {
    try {
        localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
        console.error(`Error writing to localStorage key “${key}”:`, error);
    }
};

// --- INITIAL MOCK DATA ---
const initialUsers: User[] = [
    { id: 1, username: 'admin', role: 'admin' },
    { id: 2, username: 'customer1', role: 'customer' },
    { id: 3, username: 'customer2', role: 'customer' },
];
// In a real scenario, passwords would be hashed. Here we just store them separately for the mock.
const initialPasswords: { [key: number]: string } = {
    1: 'admin123',
    2: 'customer1',
    3: 'customer2',
};

const initialMenuItems: MenuItem[] = [
    { id: 1, name: 'Nasi Lemak', category: 'food', price: 6.00, description: 'Aromatic coconut rice served with spicy sambal, anchovies, peanuts, and a hard-boiled egg.', image: 'https://picsum.photos/400/300?image=1060' },
    { id: 2, name: 'Char Kuey Teow', category: 'food', price: 8.00, description: 'Stir-fried flat rice noodles with prawns, cockles, bean sprouts, and chives in a soy sauce mixture.', image: 'https://picsum.photos/400/300?image=292' },
    { id: 3, name: 'Chicken Rice', category: 'food', price: 7.50, description: 'Poached chicken and seasoned rice, served with chili sauce and cucumber garnishes.', image: 'https://picsum.photos/400/300?image=582' },
    { id: 4, name: 'Laksa', category: 'food', price: 9.00, description: 'Spicy noodle soup with a rich, coconut-based curry broth, topped with shrimp, chicken, and tofu puffs.', image: 'https://picsum.photos/400/300?image=431' },
    { id: 5, name: 'Teh Tarik', category: 'drink', price: 2.50, description: 'A hot milk tea beverage which is made from black tea, condensed milk and evaporated milk.', image: 'https://picsum.photos/400/300?image=367' },
    { id: 6, name: 'Iced Milo', category: 'drink', price: 3.00, description: 'A refreshing chocolate and malt powder drink served with ice.', image: 'https://picsum.photos/400/300?image=1025' },
    { id: 7, name: 'Sirap Bandung', category: 'drink', price: 2.80, description: 'A popular Malaysian drink made from rose syrup and condensed milk.', image: 'https://picsum.photos/400/300?image=102' },
];

const initialOrders: Order[] = [
    {
        id: 101,
        userId: 2,
        customerName: 'customer1',
        customerPhone: '012-3456789',
        customerAddress: '123 Jalan Test, KL',
        items: [
            { id: 1, menuItem: initialMenuItems[0], quantity: 2, subtotal: 12.00 },
            { id: 2, menuItem: initialMenuItems[4], quantity: 1, subtotal: 2.50 },
        ],
        totalPrice: 14.50,
        orderDate: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
        status: OrderStatus.Completed,
        paymentMethod: 'Cash on Delivery',
    },
    {
        id: 102,
        userId: 3,
        customerName: 'customer2',
        customerPhone: '019-8765432',
        customerAddress: '456 Lorong Cuba, PJ',
        items: [
            { id: 3, menuItem: initialMenuItems[1], quantity: 1, subtotal: 8.00 },
        ],
        totalPrice: 8.00,
        orderDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
        status: OrderStatus.InProgress,
        paymentMethod: 'Online Banking',
    },
    {
        id: 103,
        userId: 2,
        customerName: 'customer1',
        customerPhone: '012-3456789',
        customerAddress: '123 Jalan Test, KL',
        items: [
            { id: 4, menuItem: initialMenuItems[3], quantity: 1, subtotal: 9.00 },
            { id: 5, menuItem: initialMenuItems[5], quantity: 2, subtotal: 6.00 },
        ],
        totalPrice: 15.00,
        orderDate: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
        status: OrderStatus.Pending,
        paymentMethod: 'Cash on Delivery',
    },
];

// --- DATA INITIALIZATION ---
const initializeData = () => {
    if (!localStorage.getItem('users')) {
        setData('users', initialUsers);
        setData('passwords', initialPasswords);
    }
    if (!localStorage.getItem('menuItems')) {
        setData('menuItems', initialMenuItems);
    }
    if (!localStorage.getItem('orders')) {
        setData('orders', initialOrders);
    }
};

initializeData();


// --- API IMPLEMENTATION ---
export const api = {
    async login(username: string, password: string): Promise<User | null> {
        await sleep(500);
        const users = getData<User[]>('users', []);
        const passwords = getData<{ [key: number]: string }>('passwords', {});
        const user = users.find(u => u.username === username);
        if (user && passwords[user.id] === password) {
            return user;
        }
        return null;
    },

    async register(username: string, password: string): Promise<User | null> {
        await sleep(500);
        const users = getData<User[]>('users', []);
        const passwords = getData<{ [key: number]: string }>('passwords', {});

        if (users.some(u => u.username === username)) {
            return null; // Username exists
        }

        const newId = (users.reduce((maxId, user) => Math.max(user.id, maxId), 0)) + 1;
        const newUser: User = { id: newId, username, role: 'customer' };
        
        users.push(newUser);
        passwords[newId] = password;
        
        setData('users', users);
        setData('passwords', passwords);

        return newUser;
    },

    async getMenuItems(): Promise<MenuItem[]> {
        await sleep(300);
        return getData<MenuItem[]>('menuItems', []);
    },

    async addMenuItem(item: Omit<MenuItem, 'id'>): Promise<MenuItem> {
        await sleep(400);
        const menuItems = getData<MenuItem[]>('menuItems', []);
        const newId = (menuItems.reduce((maxId, item) => Math.max(item.id, maxId), 0)) + 1;
        const newItem: MenuItem = { ...item, id: newId };
        menuItems.push(newItem);
        setData('menuItems', menuItems);
        return newItem;
    },

    async updateMenuItem(item: MenuItem): Promise<MenuItem | null> {
        await sleep(400);
        const menuItems = getData<MenuItem[]>('menuItems', []);
        const index = menuItems.findIndex(i => i.id === item.id);
        if (index !== -1) {
            menuItems[index] = item;
            setData('menuItems', menuItems);
            return item;
        }
        return null;
    },

    async deleteMenuItem(id: number): Promise<boolean> {
        await sleep(400);
        let menuItems = getData<MenuItem[]>('menuItems', []);
        const initialLength = menuItems.length;
        menuItems = menuItems.filter(i => i.id !== id);
        setData('menuItems', menuItems);
        return menuItems.length < initialLength;
    },

    async getOrders(): Promise<Order[]> {
        await sleep(300);
        return getData<Order[]>('orders', []);
    },
    
    async addOrder(orderData: Omit<Order, 'id' | 'orderDate'>): Promise<Order> {
        await sleep(600);
        const orders = getData<Order[]>('orders', []);
        
        const newId = (orders.reduce((maxId, order) => Math.max(order.id, maxId), 0) || 100) + 1;

        const newOrder: Order = {
            ...orderData,
            id: newId,
            orderDate: new Date().toISOString(),
        };
        orders.push(newOrder);
        setData('orders', orders);
        return newOrder;
    },

    async updateOrderStatus(orderId: number, status: OrderStatus): Promise<Order | null> {
        await sleep(300);
        const orders = getData<Order[]>('orders', []);
        const index = orders.findIndex(o => o.id === orderId);
        if (index !== -1) {
            orders[index].status = status;
            setData('orders', orders);
            return orders[index];
        }
        return null;
    },

    async getCustomers(): Promise<User[]> {
        await sleep(300);
        const users = getData<User[]>('users', []);
        return users.filter(u => u.role === 'customer');
    }
};
