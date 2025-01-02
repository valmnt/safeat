import supabase from '@/app/config/supabase';
import FoodDataSource from '../../domain/datasources/FoodDataSource';
import Food from '../../models/Food';
import i18n from '@/app/config/i18n';

class RemoteFoodDataSource implements FoodDataSource {
    async fetchFoods(
        limit: number,
        search?: string,
        category?: string,
        status?: string,
        offset?: number,
    ): Promise<Food[]> {
        const userId = (await supabase.auth.getUser()).data.user?.id;

        const baseQuery = `
            id,
            image,
            name_id!inner(name_${i18n.locale}),
            category_id,
            user_food_status!left(status!inner(type))
        `;

        let query = supabase
            .from('food')
            .select(baseQuery)
            .eq('user_food_status.user_id', userId);

        if (search && search.trim()) {
            query = query.ilike(`name_id.name_${i18n.locale}`, `${search}%`);
        }

        if (category && category !== 'all') {
            query = query.eq('category_id', category);
        }

        if (status && status !== 'all') {
            query = query
                .not('user_food_status', 'is', null)
                .eq('user_food_status.status.type', status);
        }

        if (offset !== undefined) {
            query = query.range(offset, offset + limit - 1);
        }

        query = query.limit(limit);

        const { data } = (await query) as any;

        return data?.map((item: any) => {
            item.image = supabase.storage
                .from('toler_public')
                .getPublicUrl(item.image).data.publicUrl;
            const food = Food.from(item, i18n.locale);
            return food;
        }) as Food[];
    }
}

export default RemoteFoodDataSource;
