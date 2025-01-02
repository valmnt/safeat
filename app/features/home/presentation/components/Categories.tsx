import {
    View,
    Image,
    Text,
    ScrollView,
    Pressable,
    ActivityIndicator,
} from 'react-native';
import Category from '@/app/shared/models/Category';

interface CategoriesProps {
    categories: Category[];
    isLoading: boolean;
    onPress: (categoryId: string) => void;
}

const Categories = ({
    categories,
    isLoading,
    onPress,
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
                    <CategoryCard
                        key={index}
                        category={category}
                        onPress={onPress}
                    />
                ))}
            </ScrollView>
        </View>
    );
};

interface CategoryCardProps {
    category: Category;
    onPress: (categoryId: string) => void;
}

const CategoryCard = ({
    category,
    onPress,
}: CategoryCardProps): React.JSX.Element => {
    return (
        <Pressable
            className='w-28 bg-green-300 rounded-2xl justify-center items-center mr-6'
            onPress={() => onPress(category.id)}
        >
            <View className='w-full h-3/4 justify-center items-center p-4'>
                <Image
                    className='w-full h-full'
                    source={{ uri: category.image }}
                />
            </View>
            <View className='flex-1'>
                <Text
                    className='text-white-100 text-md font-medium'
                    numberOfLines={1}
                    ellipsizeMode='tail'
                >
                    {category.name}
                </Text>
            </View>
        </Pressable>
    );
};

export default Categories;
