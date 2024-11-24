import supabase from '@/app/config/supabase';
import FoodDataSource from '../../domain/datasouces/FoodDataSource';
import Food from '../../models/Food';
import i18n from '@/app/config/i18n';

class RemoteFoodDataSource implements FoodDataSource {
    async fetchFoods(limit: number): Promise<Food[]> {
        const userId = (await supabase.auth.getUser()).data.user?.id;

        const { data } = (await supabase
            .from('food')
            .select(
                `
				id,
				image,
				name_id(name_${i18n.locale}),
                user_food_status!left(status!inner(type))
            `,
            )
            .limit(limit)
            .eq('user_food_status.user_id', userId)) as any;

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
