import { UseCase } from '@/app/config/abstract';
import UserFoodStatusRepository from '../repositories/UserFoodStatusRepository';
import { FoodStatusType } from '../../models/FoodStatus';
import { Success, Failure } from '@/app/config/response';

class InsertUserFoodStatusUseCase extends UseCase {
    constructor(repository: UserFoodStatusRepository) {
        super(repository);
    }

    execute(
        foodId: string,
        status: FoodStatusType,
    ): Promise<Success<void> | Failure> {
        return (
            this.repository as UserFoodStatusRepository
        ).insertUserFoodStatus(foodId, status);
    }
}

export default InsertUserFoodStatusUseCase;
