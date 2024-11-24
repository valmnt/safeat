import { View, Text, Image, Pressable } from 'react-native';
import Food from '../models/Food';

interface FoodCardProps {
    food: Food;
}

const FoodCard = ({ food }: FoodCardProps): React.JSX.Element => {
    const colors = ['bg-gray-100', 'bg-beige-100', 'bg-pink-100'];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];

    const statusColor = (): string => {
        switch (food.status.name) {
            case 'tolerated':
                return 'bg-green-100';
            case 'not_tolerated':
                return 'bg-red-100';
            case 'suspect':
                return 'bg-yellow-100';
            default:
                return 'bg-gray-200';
        }
    };

    return (
        <Pressable
            className={`w-32 ${randomColor} rounded-2xl justify-center items-center`}
        >
            <View className='w-full h-36 justify-center items-center'>
                <Image
                    source={{ uri: food.image }}
                    className='w-20 h-20 mt-2'
                />
                <View className='w-full justify-center items-center mt-4'>
                    <Text className='text-black-100 text-md font-medium '>
                        {food.name}
                    </Text>
                </View>
            </View>
            <View
                className={`${statusColor()} w-full h-10 rounded-b-xl justify-center items-center`}
            >
                <Text
                    className={`text-md font-medium ${food.status.name === 'not_tolerated' ? 'text-white-100' : 'text-black-100'}`}
                >
                    {food.status.name}
                </Text>
            </View>
        </Pressable>
    );
};

export default FoodCard;
