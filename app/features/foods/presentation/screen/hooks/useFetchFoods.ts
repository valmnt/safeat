import { useCallback } from 'react';
import { Success } from '@/app/config/response';
import RemoteFoodDataSource from '@/app/shared/data/datasources/RemoteFoodDataSource';
import FoodRepositoryImpl from '@/app/shared/data/repositories/FoodRepositoryImpl';
import FetchFoodsUseCase from '../../../domain/usecases/FetchFoodsUseCase';
import Food from '@/app/shared/models/Food';

const useFetchFoods = () => {
    const handleFetchFoods = useCallback(
        async (
            onSuccess: (foods: Food[]) => void,
            limit: number,
            search?: string,
            category?: string,
            status?: string,
            offset: number = 0,
        ) => {
            const dataSource = new RemoteFoodDataSource();
            const repository = new FoodRepositoryImpl(dataSource);
            const useCase = new FetchFoodsUseCase(repository);

            const result = await useCase.execute(
                limit,
                offset,
                search,
                category,
                status,
            );
            if (result instanceof Success) {
                onSuccess(result.value);
            }
        },
        [],
    );

    return handleFetchFoods;
};

export default useFetchFoods;
