import { DataSource } from '@/app/config/base';
import Category from '@/app/shared/models/Category';

abstract class CategoryDataSource implements DataSource {
    abstract fetchCategories(): Promise<Category[]>;
}

export default CategoryDataSource;
