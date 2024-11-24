import { UseCase } from '@/app/config/abstract';
import { Success, Failure } from '@/app/config/response';
import CategoryRepository from '../repositories/CategoryRepository';
import Category from '@/app/shared/models/Category';

class FetchCategoriesUseCase extends UseCase {
    constructor(repository: CategoryRepository) {
        super(repository);
    }

    async execute(): Promise<Success<Category[]> | Failure> {
        return await (this.repository as CategoryRepository).fetchCategories();
    }
}

export default FetchCategoriesUseCase;
