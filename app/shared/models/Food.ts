import FoodStatus from './FoodStatus';

class Food {
    id: string;
    name: string;
    image: string;
    status: FoodStatus;

    constructor(id: string, name: string, image: string, status: FoodStatus) {
        this.id = id;
        this.name = name;
        this.image = image;
        this.status = status;
    }

    static fromDatabase(food: any, locale: string): Food {
        return new Food(
            food.id,
            food.name_id?.[`name_${locale}`],
            food.image,
            FoodStatus.withName(
                food.user_food_status?.[0]?.status?.name || 'unknown',
            ),
        );
    }
}

export default Food;
