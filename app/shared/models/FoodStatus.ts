export enum FoodStatusType {
    tolerated = 'tolerated',
    not_tolerated = 'not_tolerated',
    suspected = 'suspected',
    unknown = 'unknown',
}

class FoodStatus {
    type: FoodStatusType;

    constructor(type: FoodStatusType) {
        this.type = type;
    }
}

export default FoodStatus;
