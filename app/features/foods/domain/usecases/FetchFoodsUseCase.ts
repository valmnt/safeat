import { UseCase } from '@/app/config/abstract';
import { Success, Failure } from '@/app/config/response';
import FoodRepository from '@/app/shared/domain/repositories/FoodRepository';
import Food from '@/app/shared/models/Food';

class FetchFoodsUseCase extends UseCase {
    constructor(repository: FoodRepository) {
        super(repository);
    }

    async execute(
        limit: number,
        offset: number,
        search?: string,
        category?: string,
        status?: string,
    ): Promise<Success<Food[]> | Failure> {
        return await (this.repository as FoodRepository).fetchFoods(
            limit,
            search,
            category,
            status,
            offset,
        );
    }
}

export default FetchFoodsUseCase;
