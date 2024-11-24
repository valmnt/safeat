import { useCallback } from 'react';
import RemoteCategoryDataSource from '../../../data/datasources/RemoteCategoryDataSource';
import CategoryRepositoryImpl from '../../../data/repositories/CategoryRepositoryImpl';
import { Success } from '@/app/config/response';
import Category from '@/app/shared/models/Category';
import FetchCategoriesUseCase from '../../../domain/usecases/FetchCategoriesUseCase';

const useFetchCategories = (): (() => Promise<Category[] | undefined>) => {
    const handleFetchCategories = useCallback(async () => {
        const dataSource = new RemoteCategoryDataSource();
        const repository = new CategoryRepositoryImpl(dataSource);
        const useCase = new FetchCategoriesUseCase(repository);

        const result = await useCase.execute();
        if (result instanceof Success) {
            return result.value;
        }
    }, []);

    return handleFetchCategories;
};

export default useFetchCategories;
