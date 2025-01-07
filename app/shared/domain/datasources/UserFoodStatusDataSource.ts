import { DataSource } from '@/app/config/base';
import { FoodStatusType } from '../../models/FoodStatus';

abstract class UserFoodStatusDataSource implements DataSource {
    abstract upsertOrDeleteUserFoodStatus(
        foodId: string,
        statusType: FoodStatusType,
    ): Promise<void>;
}

export default UserFoodStatusDataSource;
