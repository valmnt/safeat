import { Repository } from '@/app/config/base';
import { Success, Failure } from '@/app/config/response';
import Category from '@/app/shared/models/Category';

abstract class CategoryRepository extends Repository {
    abstract fetchCategories(): Promise<Success<Category[]> | Failure>;
}

export default CategoryRepository;
