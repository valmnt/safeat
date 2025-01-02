import { View, Text, Image, Pressable } from 'react-native';
import Food from '../models/Food';
import { useMemo } from 'react';
import i18n from '@/app/config/i18n';
import { FoodStatusType } from '../models/FoodStatus';

interface FoodCardProps {
    food: Food;
    isSelected?: boolean;
    onPress: () => void;
}

const FoodCard = ({
    food,
    isSelected = false,
    onPress,
}: FoodCardProps): React.JSX.Element => {
    const colors = ['bg-gray-100', 'bg-beige-100', 'bg-pink-100'];
    const randomColor = useMemo(
        () => colors[Math.floor(Math.random() * colors.length)],
        [],
    );

    const statusColor = useMemo(() => {
        switch (food.status.type) {
            case FoodStatusType.tolerated:
                return 'bg-green-100';
            case FoodStatusType.not_tolerated:
                return 'bg-red-100';
            case FoodStatusType.suspected:
                return 'bg-yellow-100';
            default:
                return 'bg-gray-200';
        }
    }, [food.status.type]);

    const borderColor = useMemo(() => {
        if (!isSelected) return '';
        switch (food.status.type) {
            case FoodStatusType.tolerated:
                return 'border-4 border-green-100';
            case FoodStatusType.not_tolerated:
                return 'border-4 border-red-100';
            case FoodStatusType.suspected:
                return 'border-4 border-yellow-100';
            default:
                return 'border-4 border-gray-200';
        }
    }, [isSelected]);

    return (
        <Pressable
            className={`w-28 ${randomColor} ${borderColor} rounded-2xl justify-center items-center`}
            onPress={onPress}
        >
            <View className='w-full h-32 justify-center items-center'>
                <Image
                    source={{ uri: food.image }}
                    className='w-20 h-20 mt-2'
                    resizeMode='contain'
                />
                <View className='w-full justify-center items-center'>
                    <Text
                        className='text-black-100 text-md font-medium'
                        numberOfLines={1}
                        ellipsizeMode='tail'
                    >
                        {food.name}
                    </Text>
                </View>
            </View>
            <View
                className={`${statusColor} w-full h-10 rounded-b-xl justify-center items-center`}
            >
                <Text
                    className={`text-sm font-medium ${
                        food.status.type === 'not_tolerated'
                            ? 'text-white-100'
                            : 'text-black-100'
                    }`}
                >
                    {i18n.t(`Foods.status.${food.status.type}`)}
                </Text>
            </View>
        </Pressable>
    );
};

export default FoodCard;
