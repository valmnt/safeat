import FoodStatus, { FoodStatusType } from './FoodStatus';

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

    static from(food: any, locale: string): Food {
        return new Food(
            food.id,
            food.name_id?.[`name_${locale}`],
            food.image,
            new FoodStatus(
                food.user_food_status?.[0]?.status?.type ||
                    FoodStatusType.unknown,
            ),
        );
    }
}

export default Food;
