import i18n from '@/app/config/i18n';
import FoodCard from '@/app/shared/components/FoodCard';
import Food from '@/app/shared/models/Food';
import React from 'react';
import {
    View,
    Text,
    ScrollView,
    Pressable,
    ActivityIndicator,
} from 'react-native';
import { Feather } from '@expo/vector-icons';

interface FoodsPreviewProps {
    foods: Food[];
    isLoading: boolean;
    onPress: () => void;
    onPressFood: (food: Food) => void;
}

const FoodsPreview = ({
    foods,
    isLoading,
    onPress,
    onPressFood,
}: FoodsPreviewProps): React.JSX.Element => {
    return (
        <View className='items-center mt-4'>
            <View className='w-11/12 lg:w-3/4 h-12 flex-row'>
                <View className='flex-1 justify-center items-start'>
                    <Text className='text-gray-300 text-xl font-semibold'>
                        {i18n.t('Home.foodsPreview')}
                    </Text>
                </View>
                <View className='flex-1 justify-center items-end mr-2'>
                    <Pressable
                        className='flex-row items-center'
                        onPress={onPress}
                    >
                        <Text className='text-black-100 text-xl font-bold underline mr-1'>
                            {i18n.t('Common.actions.seeMore')}
                        </Text>
                        <Feather name='arrow-right' size={21} color='#333' />
                    </Pressable>
                </View>
            </View>
            {isLoading ? (
                <View className='w-full lg:w-3/4 h-56 justify-center items-center'>
                    <ActivityIndicator size='large' />
                </View>
            ) : (
                <ScrollView
                    className='w-full lg:w-3/4 h-56'
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={{
                        alignItems: 'center',
                        paddingHorizontal: 10,
                    }}
                >
                    {foods.map((food, index) => (
                        <View key={index} className='mr-6'>
                            <FoodCard
                                key={index}
                                food={food}
                                onPress={() => onPressFood(food)}
                            />
                        </View>
                    ))}
                </ScrollView>
            )}
        </View>
    );
};

export default FoodsPreview;
