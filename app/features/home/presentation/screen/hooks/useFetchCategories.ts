import { useCallback } from 'react';
import RemoteCategoryDataSource from '../../../data/datasources/RemoteCategoryDataSource';
import CategoryRepositoryImpl from '../../../data/repositories/CategoryRepositoryImpl';
import { Success } from '@/app/config/response';
import Category from '@/app/shared/models/Category';

const useFetchCategories = () => {
    return useCallback(async (onSuccess: (categories: Category[]) => void) => {
        const dataSource = new RemoteCategoryDataSource();
        const repository = new CategoryRepositoryImpl(dataSource);

        const result = await repository.fetchCategories();
        if (result instanceof Success) {
            onSuccess(result.value);
        }
    }, []);
};

export default useFetchCategories;
