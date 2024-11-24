import RemoteFoodDataSource from '@/app/shared/data/datasources/RemoteFoodDataSource';
import FoodRepositoryImpl from '@/app/shared/data/repositories/FoodRepository';
import FetchFoodPreviewUseCase from '../../../domain/usecases/FetchFoodPreviewUseCase';
import Food from '@/app/shared/models/Food';
import { useCallback } from 'react';
import { Success } from '@/app/config/response';

const useFetchFoodPreview = (): (() => Promise<Food[] | undefined>) => {
    const handleFetchFoodPreview = useCallback(async () => {
        const dataSource = new RemoteFoodDataSource();
        const repository = new FoodRepositoryImpl(dataSource);
        const useCase = new FetchFoodPreviewUseCase(repository);

        const result = await useCase.execute();
        if (result instanceof Success) {
            return result.value;
        }
    }, []);

    return handleFetchFoodPreview;
};

export default useFetchFoodPreview;
