import RemoteFoodDataSource from '@/app/shared/data/datasources/RemoteFoodDataSource';
import { useCallback } from 'react';
import { Success } from '@/app/config/response';
import FoodRepositoryImpl from '@/app/shared/data/repositories/FoodRepositoryImpl';
import Food from '@/app/shared/models/Food';

const useFetchFoodsPreview = () => {
    const handleFetchFoodsPreview = useCallback(
        async (onSuccess: (foods: Food[]) => void) => {
            const dataSource = new RemoteFoodDataSource();
            const repository = new FoodRepositoryImpl(dataSource);

            const result = await repository.fetchFoods(10);
            if (result instanceof Success) {
                onSuccess(result.value);
            }
        },
        [],
    );

    return handleFetchFoodsPreview;
};

export default useFetchFoodsPreview;
