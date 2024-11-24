import { View, Text, Image, Pressable } from 'react-native';
import Food from '../models/Food';
import { useMemo } from 'react';

interface FoodCardProps {
    food: Food;
}

const FoodCard = ({ food }: FoodCardProps): React.JSX.Element => {
    const colors = ['bg-gray-100', 'bg-beige-100', 'bg-pink-100'];
    const randomColor = useMemo(
        () => colors[Math.floor(Math.random() * colors.length)],
        [],
    );

    const statusColor = useMemo(() => {
        switch (food.status.type) {
            case 'tolerated':
                return 'bg-green-100';
            case 'not_tolerated':
                return 'bg-red-100';
            case 'suspected':
                return 'bg-yellow-100';
            default:
                return 'bg-gray-200';
        }
    }, [food.status.type]);

    return (
        <Pressable
            className={`w-28 ${randomColor} rounded-2xl justify-center items-center`}
        >
            <View className='w-full h-32 justify-center items-center'>
                <Image
                    source={{ uri: food.image }}
                    className='w-20 h-20 mt-2'
                />
                <View className='w-full justify-center items-center'>
                    <Text className='text-black-100 text-md font-medium '>
                        {food.name}
                    </Text>
                </View>
            </View>
            <View
                className={`${statusColor} w-full h-10 rounded-b-xl justify-center items-center`}
            >
                <Text
                    className={`text-sm font-medium ${food.status.type === 'not_tolerated' ? 'text-white-100' : 'text-black-100'}`}
                >
                    {food.status.type}
                </Text>
            </View>
        </Pressable>
    );
};

export default FoodCard;
