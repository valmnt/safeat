import RemoteFoodDataSource from '@/app/shared/data/datasources/RemoteFoodDataSource';
import FetchFoodsPreviewUseCase from '../../../domain/usecases/FetchFoodsPreviewUseCase';
import { useCallback } from 'react';
import { Success } from '@/app/config/response';
import FoodRepositoryImpl from '@/app/shared/data/repositories/FoodRepositoryImpl';
import Food from '@/app/shared/models/Food';

const useFetchFoodsPreview = () => {
    const handleFetchFoodsPreview = useCallback(
        async (onSuccess: (foods: Food[]) => void) => {
            const dataSource = new RemoteFoodDataSource();
            const repository = new FoodRepositoryImpl(dataSource);
            const useCase = new FetchFoodsPreviewUseCase(repository);

            const result = await useCase.execute();
            if (result instanceof Success) {
                onSuccess(result.value);
            }
        },
        [],
    );

    return handleFetchFoodsPreview;
};

export default useFetchFoodsPreview;
