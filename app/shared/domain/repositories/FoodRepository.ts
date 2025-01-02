import { Repository } from '@/app/config/base';
import { Success, Failure } from '@/app/config/response';
import Food from '../../models/Food';

abstract class FoodRepository extends Repository {
    abstract fetchFoods(
        limit: number,
        search?: string,
        category?: string,
        status?: string,
        offset?: number,
    ): Promise<Success<Food[]> | Failure>;
}

export default FoodRepository;
