import {
    View,
    Image,
    Text,
    ScrollView,
    Pressable,
    ActivityIndicator,
} from 'react-native';
import Category from '../../../../shared/models/Category';

interface CategoriesProps {
    categories: Category[];
    isLoading: boolean;
}

const Categories = ({
    categories,
    isLoading,
}: CategoriesProps): React.JSX.Element => {
    if (isLoading) {
        return <ActivityIndicator size='large' />;
    }

    return (
        <View className='lg:items-center'>
            <ScrollView
                className='w-full lg:w-3/4 h-36'
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{
                    alignItems: 'center',
                    paddingHorizontal: 10,
                }}
            >
                {categories.map((category, index) => (
                    <CategoryCard key={index} category={category} />
                ))}
            </ScrollView>
        </View>
    );
};

interface CategoryCardProps {
    category: Category;
}

const CategoryCard = ({ category }: CategoryCardProps): React.JSX.Element => {
    return (
        <Pressable className='min-w-28 max-w-36 bg-green-300 rounded-2xl justify-center items-center mr-6'>
            <View className='w-full h-3/4 justify-center items-center p-4'>
                <Image
                    className='w-full h-full'
                    source={{ uri: category.image }}
                />
            </View>
            <View className='flex-1 justify-top items-center p-1'>
                <Text className='text-white-100 text-md font-medium'>
                    {category.name}
                </Text>
            </View>
        </Pressable>
    );
};

export default Categories;
