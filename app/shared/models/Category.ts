import i18n from '@/app/config/i18n';

class Category {
    id: string;
    name: string;
    image: string;

    constructor(id: string, name: string, image: string) {
        this.id = id;
        this.name = name;
        this.image = image;
    }

    static fromJSON(json: any): Category {
        const id = json.id;
        const localeKey = `name_${i18n.locale}`;
        const name = json.name_id?.[localeKey];
        const image = json.image;
        return new Category(id, name, image);
    }
}

export default Category;
