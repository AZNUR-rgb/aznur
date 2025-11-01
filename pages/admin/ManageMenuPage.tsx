
import React, { useState, useEffect } from 'react';
import { useData } from '../../context/DataContext';
import { MenuItem } from '../../types';
import { PencilIcon, TrashIcon, PlusIcon } from '../../components/Icons';

const ManageMenuPage: React.FC = () => {
    const { menuItems, addMenuItem, updateMenuItem, deleteMenuItem } = useData();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentItem, setCurrentItem] = useState<Omit<MenuItem, 'id'> | MenuItem | null>(null);
    const [imagePreview, setImagePreview] = useState<string | null>(null);

    const openModalForNew = () => {
        setCurrentItem({ name: '', category: 'food', price: 0, description: '', image: '' });
        setImagePreview(null);
        setIsModalOpen(true);
    };

    const openModalForEdit = (item: MenuItem) => {
        setCurrentItem(item);
        setImagePreview(item.image);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setCurrentItem(null);
        setImagePreview(null);
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            const reader = new FileReader();
            reader.onloadend = () => {
                const result = reader.result as string;
                if (currentItem) {
                    setCurrentItem({ ...currentItem, image: result });
                }
                setImagePreview(result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        if (currentItem) {
            const { name, value } = e.target;
            setCurrentItem({ ...currentItem, [name]: name === 'price' ? parseFloat(value) : value });
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!currentItem || !currentItem.image) return;

        if ('id' in currentItem) {
            await updateMenuItem(currentItem as MenuItem);
        } else {
            await addMenuItem(currentItem);
        }
        closeModal();
    };
    
    const handleDelete = async (id: number) => {
        if (window.confirm('Are you sure you want to delete this item?')) {
            await deleteMenuItem(id);
        }
    }

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold text-gray-800">Manage Menu</h1>
                <button onClick={openModalForNew} className="flex items-center bg-primary text-white py-2 px-4 rounded-md font-semibold hover:bg-fuchsia-700 transition-colors">
                    <PlusIcon />
                    <span className="ml-2">Add New Item</span>
                </button>
            </div>

            <div className="bg-white shadow-md rounded-lg overflow-x-auto">
                <table className="w-full text-sm text-left text-gray-500">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                        <tr>
                            <th scope="col" className="px-6 py-3">Image</th>
                            <th scope="col" className="px-6 py-3">Name</th>
                            <th scope="col" className="px-6 py-3">Category</th>
                            <th scope="col" className="px-6 py-3">Price</th>
                            <th scope="col" className="px-6 py-3">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {menuItems.map(item => (
                            <tr key={item.id} className="bg-white border-b hover:bg-gray-50">
                                <td className="px-6 py-4">
                                    <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded"/>
                                </td>
                                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">{item.name}</th>
                                <td className="px-6 py-4 capitalize">{item.category}</td>
                                <td className="px-6 py-4">RM{item.price.toFixed(2)}</td>
                                <td className="px-6 py-4 flex items-center space-x-3">
                                    <button onClick={() => openModalForEdit(item)} className="text-blue-600 hover:text-blue-800"><PencilIcon /></button>
                                    <button onClick={() => handleDelete(item.id)} className="text-red-600 hover:text-red-800"><TrashIcon /></button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {isModalOpen && currentItem && (
                 <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
                    <div className="bg-white rounded-lg shadow-xl p-8 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                        <h2 className="text-2xl font-bold mb-6">{'id' in currentItem ? 'Edit' : 'Add'} Menu Item</h2>
                        <form onSubmit={handleSubmit} className="space-y-4">
                             <div>
                                <label className="block text-sm font-medium text-gray-700">Image</label>
                                <div className="mt-1 flex items-center space-x-4">
                                    {imagePreview && <img src={imagePreview} alt="Preview" className="w-24 h-24 object-cover rounded"/>}
                                    <input type="file" accept="image/*" onChange={handleFileChange} className="block text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-violet-50 file:text-primary hover:file:bg-violet-100"/>
                                </div>
                            </div>
                            <div>
                                <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
                                <input type="text" name="name" id="name" value={currentItem.name} onChange={handleChange} required className="mt-1 w-full border-gray-300 rounded-md shadow-sm"/>
                            </div>
                            <div>
                                <label htmlFor="category" className="block text-sm font-medium text-gray-700">Category</label>
                                <select name="category" id="category" value={currentItem.category} onChange={handleChange} required className="mt-1 w-full border-gray-300 rounded-md shadow-sm">
                                    <option value="food">Food</option>
                                    <option value="drink">Drink</option>
                                </select>
                            </div>
                            <div>
                                <label htmlFor="price" className="block text-sm font-medium text-gray-700">Price (RM)</label>
                                <input type="number" name="price" id="price" value={currentItem.price} onChange={handleChange} required min="0" step="0.01" className="mt-1 w-full border-gray-300 rounded-md shadow-sm"/>
                            </div>
                            <div>
                                <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
                                <textarea name="description" id="description" value={currentItem.description} onChange={handleChange} required rows={3} className="mt-1 w-full border-gray-300 rounded-md shadow-sm"></textarea>
                            </div>
                            <div className="flex justify-end space-x-3 pt-4">
                                <button type="button" onClick={closeModal} className="bg-gray-200 text-gray-800 py-2 px-4 rounded-md hover:bg-gray-300">Cancel</button>
                                <button type="submit" className="bg-primary text-white py-2 px-4 rounded-md hover:bg-fuchsia-700">Save</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ManageMenuPage;
