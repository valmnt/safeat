import { DataSource } from '@/app/config/abstract';
import Food from '../../models/Food';

abstract class FoodDataSource implements DataSource {
    abstract fetchFoods(limit: number): Promise<Food[]>;
}

export default FoodDataSource;
