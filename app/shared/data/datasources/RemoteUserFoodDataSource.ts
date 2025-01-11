import supabase from '@/app/config/supabase';
import UserFoodStatusDataSource from '../../domain/datasources/UserFoodStatusDataSource';
import { FoodStatusType } from '../../models/FoodStatus';

class RemoteUserFoodDataSource extends UserFoodStatusDataSource {
    async upsertOrDeleteUserFoodStatus(
        foodId: string,
        statusType: FoodStatusType,
    ): Promise<void> {
        const userId = (await supabase.auth.getUser()).data.user?.id;

        if (!userId) {
            throw new Error('user_not_found');
        }

        if (statusType === FoodStatusType.unknown) {
            await this.deleteUserFoodStatus(foodId, userId);
            return;
        }

        const statusId = await this.getStatusId(statusType);
        const existingRecord = await this.getExistingRecord(foodId, userId);

        if (existingRecord) {
            await this.updateUserFoodStatus(foodId, userId, statusId);
        } else {
            await this.insertUserFoodStatus(foodId, userId, statusId);
        }
    }

    private async deleteUserFoodStatus(foodId: string, userId: string) {
        await supabase
            .from('user_food_status')
            .delete()
            .eq('food_id', foodId)
            .eq('user_id', userId);
    }

    private async getStatusId(
        statusType: FoodStatusType,
    ): Promise<string | undefined> {
        const { data: statusData } = await supabase
            .from('status')
            .select('id')
            .eq('type', statusType)
            .single();
        return statusData?.id;
    }

    private async getExistingRecord(foodId: string, userId: string) {
        const { data: existingRecord } = await supabase
            .from('user_food_status')
            .select()
            .eq('food_id', foodId)
            .eq('user_id', userId)
            .single();
        return existingRecord;
    }

    private async updateUserFoodStatus(
        foodId: string,
        userId: string,
        statusId: string | undefined,
    ) {
        await supabase
            .from('user_food_status')
            .update({ status_id: statusId })
            .eq('food_id', foodId)
            .eq('user_id', userId);
    }

    private async insertUserFoodStatus(
        foodId: string,
        userId: string,
        statusId: string | undefined,
    ) {
        await supabase.from('user_food_status').insert({
            food_id: foodId,
            user_id: userId,
            status_id: statusId,
        });
    }
}

export default RemoteUserFoodDataSource;
