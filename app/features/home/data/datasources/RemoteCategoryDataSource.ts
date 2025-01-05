import Category from '@/app/shared/models/Category';
import CategoryDataSource from '../../domain/datasources/CategoryDataSource';
import supabase from '@/app/config/supabase';
import i18n from '@/app/config/i18n';

class RemoteCategoryDataSource implements CategoryDataSource {
    async fetchCategories(): Promise<Category[]> {
        const response = await supabase
            .from('category')
            .select(`*, name_id(name_${i18n.locale})`);
        const categories =
            response.data?.map(item => {
                const category = Category.fromJSON(item);
                category.image = supabase.storage
                    .from('safeat_public')
                    .getPublicUrl(category.image).data.publicUrl;

                return category;
            }) ?? [];
        return categories;
    }
}

export default RemoteCategoryDataSource;
