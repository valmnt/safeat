import Category from '@/app/shared/models/Category';
import CategoryRepository from '../../domain/repositories/CategoryRepository';
import CategoryDataSource from '../../domain/datasources/CategoryDataSource';
import { Failure, Success } from '@/app/config/response';

class CategoryRepositoryImpl extends CategoryRepository {
    constructor(dataSource: CategoryDataSource) {
        super(dataSource);
    }

    async fetchCategories(): Promise<Success<Category[]> | Failure> {
        return await (this.dataSource as CategoryDataSource)
            .fetchCategories()
            .then(value => {
                return new Success(value);
            })
            .catch((error: Error) => {
                return new Failure(error);
            });
    }
}

export default CategoryRepositoryImpl;
