import { useCallback } from 'react';
import RemoteUserFoodDataSource from '../data/datasources/RemoteUserFoodDataSource';
import { FoodStatusType } from '../models/FoodStatus';
import UserFoodRepositoryImpl from '../data/repositories/UserFoodRepositoryImpl';
import InsertUserFoodStatusUseCase from '../domain/usecases/InsertUserFoodStatusUseCase';
import { Success } from '@/app/config/response';
import Toast from 'react-native-toast-message';

const useInsertUserFoodStatus = () => {
    const insertUserFoodStatus = useCallback(
        async (
            foodId: string,
            statusType: FoodStatusType,
            onSuccess: () => void,
            didFinish: () => void,
        ) => {
            const dataSource = new RemoteUserFoodDataSource();
            const repository = new UserFoodRepositoryImpl(dataSource);
            const useCase = new InsertUserFoodStatusUseCase(repository);

            const result = await useCase.execute(foodId, statusType);
            if (result instanceof Success) {
                onSuccess();
            } else {
                Toast.show({
                    type: 'error',
                    text1: result.errorTitle,
                    text2: result.errorMessage,
                    position: 'top',
                });
            }
            didFinish();
        },
        [],
    );

    return insertUserFoodStatus;
};

export default useInsertUserFoodStatus;
