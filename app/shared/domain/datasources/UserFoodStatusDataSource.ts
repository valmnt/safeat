import { DataSource } from '@/app/config/abstract';
import { FoodStatusType } from '../../models/FoodStatus';

abstract class UserFoodStatusDataSource implements DataSource {
    abstract insertUserFoodStatus(
        foodId: string,
        statusType: FoodStatusType,
    ): Promise<void>;
}

export default UserFoodStatusDataSource;
