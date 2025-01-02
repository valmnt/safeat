import { create } from 'zustand';
import Category from '../models/Category';

interface CategoryState {
    categories: Category[];
    setCategories: (categories: Category[]) => void;
}

const useCategoryStore = create<CategoryState>(set => ({
    categories: [],
    setCategories: (categories: Category[]) => set({ categories }),
}));

export default useCategoryStore;
