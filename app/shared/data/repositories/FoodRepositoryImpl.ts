import { Failure, Success } from '@/app/config/response';
import FoodRepository from '../../domain/repositories/FoodRepository';
import FoodDataSource from '../../domain/datasouces/FoodDataSource';
import Food from '../../models/Food';

class FoodRepositoryImpl extends FoodRepository {
    constructor(dataSource: FoodDataSource) {
        super(dataSource);
    }

    async fetchFoods(limit: number): Promise<Success<Food[]> | Failure> {
        return await (this.dataSource as FoodDataSource)
            .fetchFoods(limit)
            .then(value => {
                return new Success(value);
            })
            .catch((error: Error) => {
                return new Failure(error, '', '');
            });
    }
}

export default FoodRepositoryImpl;
