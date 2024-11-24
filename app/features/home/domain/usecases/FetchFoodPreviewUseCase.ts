import { UseCase } from '@/app/config/abstract';
import { Success, Failure } from '@/app/config/response';
import FoodRepository from '@/app/shared/domain/repositories/FoodRepository';
import Food from '@/app/shared/models/Food';

class FetchFoodPreviewUseCase extends UseCase {
    constructor(repository: FoodRepository) {
        super(repository);
    }

    async execute(): Promise<Success<Food[]> | Failure> {
        return await (this.repository as FoodRepository).fetchFoods(10);
    }
}

export default FetchFoodPreviewUseCase;
