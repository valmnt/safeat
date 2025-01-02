import { DataSource } from '@/app/config/abstract';
import Food from '../../models/Food';

abstract class FoodDataSource implements DataSource {
    abstract fetchFoods(
        limit: number,
        search?: string,
        category?: string,
        status?: string,
        offset?: number,
    ): Promise<Food[]>;
}

export default FoodDataSource;
