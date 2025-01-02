import { Success, Failure } from '@/app/config/response';
import UserFoodStatusDataSource from '../../domain/datasources/UserFoodStatusDataSource';
import UserFoodStatusRepository from '../../domain/repositories/UserFoodStatusRepository';
import { FoodStatusType } from '../../models/FoodStatus';
import i18n from '@/app/config/i18n';

class UserFoodRepositoryImpl extends UserFoodStatusRepository {
    constructor(dataSource: UserFoodStatusDataSource) {
        super(dataSource);
    }

    async insertUserFoodStatus(
        foodId: string,
        statusType: FoodStatusType,
    ): Promise<Success<void> | Failure> {
        return await (this.dataSource as UserFoodStatusDataSource)
            .insertUserFoodStatus(foodId, statusType)
            .then(value => {
                return new Success(value);
            })
            .catch((error: Error) => {
                return new Failure(
                    error,
                    i18n.t('Common.error.title'),
                    i18n.t('Common.error.updating'),
                );
            });
    }
}

export default UserFoodRepositoryImpl;
