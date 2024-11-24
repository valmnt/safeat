export class FoodStatus {
    id: string;
    name: string;

    constructor(id: string, name: string) {
        this.id = id;
        this.name = name;
    }

    static withName(name: string): FoodStatus {
        return new FoodStatus('', name);
    }
}

export default FoodStatus;
