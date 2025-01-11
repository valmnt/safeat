import supabase from '@/app/config/supabase';
import FoodDataSource from '../../domain/datasources/FoodDataSource';
import Food from '../../models/Food';
import i18n from '@/app/config/i18n';
import { FoodStatusType } from '../../models/FoodStatus';

class RemoteFoodDataSource implements FoodDataSource {
    async fetchFoods(
        limit: number,
        search?: string,
        category?: string,
        status?: string,
        offset?: number,
    ): Promise<Food[]> {
        const userId = (await supabase.auth.getUser()).data.user?.id;

        const query = this.buildQuery(
            userId,
            limit,
            search,
            category,
            status,
            offset,
        );

        const { data } = (await query) as any;

        return this.transformData(data);
    }

    private buildQuery(
        userId: string | undefined,
        limit: number,
        search?: string,
        category?: string,
        status?: string,
        offset?: number,
    ) {
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
            if (status === FoodStatusType.unknown) {
                query = query.is('user_food_status', null);
            } else {
                query = query
                    .not('user_food_status', 'is', null)
                    .eq('user_food_status.status.type', status);
            }
        }

        if (offset !== undefined) {
            query = query.range(offset, offset + limit - 1);
        }

        return query.limit(limit);
    }

    private transformData(data: any): Food[] {
        return data?.map((item: any) => {
            item.image = supabase.storage
                .from('safeat_public')
                .getPublicUrl(item.image).data.publicUrl;
            return Food.from(item, i18n.locale);
        }) as Food[];
    }
}

export default RemoteFoodDataSource;
