import { useCallback } from 'react';
import { Success } from '@/app/config/response';
import RemoteFoodDataSource from '@/app/shared/data/datasources/RemoteFoodDataSource';
import FoodRepositoryImpl from '@/app/shared/data/repositories/FoodRepositoryImpl';
import Food from '@/app/shared/models/Food';

const useFetchFoods = () => {
    return useCallback(
        async (
            onSuccess: (foods: Food[]) => void,
            onError: () => void,
            didFetch: () => void,
            limit: number,
            search?: string,
            category?: string,
            status?: string,
            offset: number = 0,
        ) => {
            const dataSource = new RemoteFoodDataSource();
            const repository = new FoodRepositoryImpl(dataSource);

            const result = await repository.fetchFoods(
                limit,
                search,
                category,
                status,
                offset,
            );
            if (result instanceof Success) {
                onSuccess(result.value);
            } else {
                onError();
            }
            didFetch();
        },
        [],
    );
};

export default useFetchFoods;
