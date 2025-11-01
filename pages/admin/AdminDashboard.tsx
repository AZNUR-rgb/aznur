
import React, { useMemo } from 'react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import { useData } from '../../context/DataContext';
import { OrderStatus } from '../../types';
import { UsersIcon, ClipboardDocumentListIcon, ChartPieIcon, RectangleStackIcon } from '../../components/Icons';

const AdminDashboard: React.FC = () => {
    const { orders, customers, menuItems } = useData();

    const stats = useMemo(() => {
        const totalIncome = orders
            .filter(o => o.status === OrderStatus.Completed)
            .reduce((sum, order) => sum + order.totalPrice, 0);
        
        const pendingOrders = orders.filter(o => o.status === OrderStatus.Pending).length;

        return {
            totalIncome,
            totalOrders: orders.length,
            totalCustomers: customers.length,
            totalMenuItems: menuItems.length,
            pendingOrders
        };
    }, [orders, customers, menuItems]);

    const dailyIncomeData = useMemo(() => {
        const incomeByDay: { [key: string]: number } = {};
        orders
            .filter(o => o.status === OrderStatus.Completed)
            .forEach(order => {
                const date = new Date(order.orderDate).toLocaleDateString('en-CA'); // YYYY-MM-DD
                if (!incomeByDay[date]) {
                    incomeByDay[date] = 0;
                }
                incomeByDay[date] += order.totalPrice;
            });
        
        return Object.keys(incomeByDay)
            .map(date => ({
                name: new Date(date).toLocaleDateString('en-GB', { month: 'short', day: 'numeric' }),
                income: incomeByDay[date],
            }))
            .sort((a,b) => new Date(a.name).getTime() - new Date(b.name).getTime())
            .slice(-7); // Last 7 days
    }, [orders]);
    
    const popularItemsData = useMemo(() => {
      const itemCounts: {[key: string]: number} = {};
      orders.forEach(order => {
        order.items.forEach(item => {
          if(!itemCounts[item.menuItem.name]) itemCounts[item.menuItem.name] = 0;
          itemCounts[item.menuItem.name] += item.quantity;
        })
      });

      return Object.entries(itemCounts)
        .sort(([, a], [, b]) => b - a)
        .slice(0, 5)
        .map(([name, count]) => ({name, count}));

    }, [orders]);

    return (
        <div className="space-y-8">
            <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard icon={<ChartPieIcon />} title="Total Income" value={`RM ${stats.totalIncome.toFixed(2)}`} color="green" />
                <StatCard icon={<ClipboardDocumentListIcon />} title="Total Orders" value={stats.totalOrders.toString()} color="blue" />
                <StatCard icon={<UsersIcon />} title="Total Customers" value={stats.totalCustomers.toString()} color="purple" />
                <StatCard icon={<RectangleStackIcon />} title="Menu Items" value={stats.totalMenuItems.toString()} color="yellow" />
            </div>

            {/* Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
                <div className="lg:col-span-3 bg-white p-6 rounded-lg shadow-md">
                    <h2 className="text-xl font-semibold mb-4">Daily Income (Last 7 Days)</h2>
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={dailyIncomeData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip formatter={(value: number) => `RM${value.toFixed(2)}`} />
                            <Bar dataKey="income" fill="#c026d3" />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
                 <div className="lg:col-span-2 bg-white p-6 rounded-lg shadow-md">
                    <h2 className="text-xl font-semibold mb-4">Most Popular Items</h2>
                     <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={popularItemsData} layout="vertical">
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis type="number" hide/>
                            <YAxis type="category" dataKey="name" width={120} stroke="#374151" />
                            <Tooltip formatter={(value: number) => `${value} sold`}/>
                            <Bar dataKey="count" fill="#facc15" />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
};

interface StatCardProps {
    icon: React.ReactNode;
    title: string;
    value: string;
    color: 'green' | 'blue' | 'purple' | 'yellow';
}

const StatCard: React.FC<StatCardProps> = ({ icon, title, value, color }) => {
    const colorClasses = {
        green: 'bg-green-500',
        blue: 'bg-blue-500',
        purple: 'bg-purple-500',
        yellow: 'bg-yellow-500',
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow-md flex items-center">
            <div className={`p-3 rounded-full text-white ${colorClasses[color]}`}>
                {icon}
            </div>
            <div className="ml-4">
                <p className="text-sm text-gray-500">{title}</p>
                <p className="text-2xl font-bold">{value}</p>
            </div>
        </div>
    );
};

export default AdminDashboard;
