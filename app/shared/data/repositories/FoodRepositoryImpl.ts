import { Failure, Success } from '@/app/config/response';
import FoodRepository from '../../domain/repositories/FoodRepository';
import FoodDataSource from '../../domain/datasources/FoodDataSource';
import Food from '../../models/Food';

class FoodRepositoryImpl extends FoodRepository {
    constructor(dataSource: FoodDataSource) {
        super(dataSource);
    }

    async fetchFoods(
        limit: number,
        search?: string,
        category?: string,
        status?: string,
        offset?: number,
    ): Promise<Success<Food[]> | Failure> {
        return await (this.dataSource as FoodDataSource)
            .fetchFoods(limit, search, category, status, offset)
            .then(value => {
                return new Success(value);
            })
            .catch((error: Error) => {
                return new Failure(error);
            });
    }
}

export default FoodRepositoryImpl;
