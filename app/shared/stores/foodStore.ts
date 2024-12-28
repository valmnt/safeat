import { create } from 'zustand';
import Food from '../models/Food';
import { FoodStatusType } from '../models/FoodStatus';

interface FoodState {
    foods: Food[];
    selectedFood: Food;
    setFoods: (foods: Food[]) => void;
    setSelectedFood: (food: Food) => void;
    updateSelectedFoodStatus: (foodId: string, status: FoodStatusType) => void;
}

const useFoodStore = create<FoodState>(set => ({
    foods: [],
    selectedFood: {} as Food,
    setFoods: (foods: Food[]) => set(() => ({ foods })),
    setSelectedFood: (selectedFood: Food) => set(() => ({ selectedFood })),
    updateSelectedFoodStatus: (foodId: string, status: FoodStatusType) =>
        set(state => ({
            foods: state.foods.map(food =>
                food.id === foodId
                    ? { ...food, status: { ...food.status, type: status } }
                    : food,
            ),
        })),
}));

export default useFoodStore;
