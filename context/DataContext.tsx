
import React, { createContext, useState, useEffect, useContext, ReactNode, useCallback } from 'react';
import { MenuItem, Order, User } from '../types';
import { api } from '../services/mockApi';
import { useAuth } from './AuthContext';

interface DataContextType {
  menuItems: MenuItem[];
  orders: Order[];
  customers: User[];
  isLoading: boolean;
  fetchMenuItems: () => void;
  fetchOrders: () => void;
  fetchCustomers: () => void;
  addMenuItem: (item: Omit<MenuItem, 'id'>) => Promise<void>;
  updateMenuItem: (item: MenuItem) => Promise<void>;
  deleteMenuItem: (id: number) => Promise<void>;
  updateOrderStatus: (orderId: number, status: Order['status']) => Promise<void>;
  submitOrder: (orderData: Omit<Order, 'id' | 'orderDate' | 'userId'>) => Promise<Order | null>;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [customers, setCustomers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useAuth();

  const fetchMenuItems = useCallback(async () => {
    setIsLoading(true);
    const items = await api.getMenuItems();
    setMenuItems(items);
    setIsLoading(false);
  }, []);

  const fetchOrders = useCallback(async () => {
    setIsLoading(true);
    const fetchedOrders = await api.getOrders();
    setOrders(fetchedOrders);
    setIsLoading(false);
  }, []);
  
  const fetchCustomers = useCallback(async () => {
    setIsLoading(true);
    const fetchedCustomers = await api.getCustomers();
    setCustomers(fetchedCustomers);
    setIsLoading(false);
  }, []);

  useEffect(() => {
    fetchMenuItems();
    fetchOrders();
    fetchCustomers();
  }, [fetchMenuItems, fetchOrders, fetchCustomers]);
  
  const addMenuItem = async (item: Omit<MenuItem, 'id'>) => {
    await api.addMenuItem(item);
    fetchMenuItems();
  };

  const updateMenuItem = async (item: MenuItem) => {
    await api.updateMenuItem(item);
    fetchMenuItems();
  };

  const deleteMenuItem = async (id: number) => {
    await api.deleteMenuItem(id);
    fetchMenuItems();
  };
  
  const updateOrderStatus = async (orderId: number, status: Order['status']) => {
    await api.updateOrderStatus(orderId, status);
    fetchOrders();
  };

  const submitOrder = async (orderData: Omit<Order, 'id' | 'orderDate' | 'userId'>) => {
    const finalOrderData = {
        ...orderData,
        userId: user ? user.id : -1, // Use logged-in user's ID, or -1 for guest
    };
    const newOrder = await api.addOrder(finalOrderData);
    if(newOrder) {
        fetchOrders();
        return newOrder;
    }
    return null;
  }

  return (
    <DataContext.Provider value={{ menuItems, orders, customers, isLoading, fetchMenuItems, fetchOrders, fetchCustomers, addMenuItem, updateMenuItem, deleteMenuItem, updateOrderStatus, submitOrder }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = (): DataContextType => {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};
