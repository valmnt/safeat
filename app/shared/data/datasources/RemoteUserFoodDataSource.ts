import supabase from '@/app/config/supabase';
import UserFoodStatusDataSource from '../../domain/datasouces/UserFoodStatusDataSource';
import { FoodStatusType } from '../../models/FoodStatus';

class RemoteUserFoodDataSource extends UserFoodStatusDataSource {
    async insertUserFoodStatus(
        foodId: string,
        statusType: FoodStatusType,
    ): Promise<void> {
        const userId = (await supabase.auth.getUser()).data.user?.id;

        const { data: statusData } = await supabase
            .from('status')
            .select('id')
            .eq('type', statusType)
            .single();

        const { data: existingRecord } = await supabase
            .from('user_food_status')
            .select()
            .eq('food_id', foodId)
            .eq('user_id', userId)
            .single();

        if (existingRecord) {
            await supabase
                .from('user_food_status')
                .update({ status_id: statusData?.id })
                .eq('food_id', foodId)
                .eq('user_id', userId);
        } else {
            await supabase.from('user_food_status').insert({
                food_id: foodId,
                user_id: userId,
                status_id: statusData?.id,
            });
        }
    }
}

export default RemoteUserFoodDataSource;
