import { Repository } from '@/app/config/base';
import { FoodStatusType } from '../../models/FoodStatus';
import { Success, Failure } from '@/app/config/response';

abstract class UserFoodStatusRepository extends Repository {
    abstract upsertOrDeleteUserFoodStatus(
        foodId: string,
        statusType: FoodStatusType,
    ): Promise<Success<void> | Failure>;
}

export default UserFoodStatusRepository;
