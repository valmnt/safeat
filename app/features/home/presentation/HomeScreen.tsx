import React, { useEffect, useState, useCallback, useRef } from 'react';
import { ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import SignOutButton from './components/SignOutButton';
import HomeTitle from './components/HomeTitle';
import InfoBanner from './components/InfoBanner';
import IllustrationBanner from './components/IllustrationBanner';
import Categories from './components/Categories';
import useSignOut from '../hooks/useSignOut';
import withRouter from '@/app/shared/hooks/withRouter';
import { Router, useFocusEffect } from 'expo-router';
import useFetchCategories from '../hooks/useFetchCategories';
import useFetchFoodsPreview from '../hooks/useFetchFoodsPreview';
import useFoodStore from '@/app/shared/stores/foodStore';
import FoodsPreview from './components/FoodsPreview';
import useCategoryStore from '@/app/shared/stores/categoryStore';
import FoodBottomSheet from '@/app/shared/components/FoodBottomSheet';
import useBottomSheetStore from '@/app/shared/stores/bottomSheetStore';
import BottomSheet from '@gorhom/bottom-sheet';
import Food from '@/app/shared/models/Food';

interface HomeScreenProps {
    router: Router;
}

const HomeScreen = ({ router }: HomeScreenProps): React.JSX.Element => {
    const signOut = useSignOut();
    const fetchCategories = useFetchCategories();
    const fetchFoodsPreview = useFetchFoodsPreview();
    const { foods, setFoods, setSelectedFood } = useFoodStore();
    const { categories, setCategories } = useCategoryStore();

    const bottomSheetRef = useRef<BottomSheet>(null);
    const { setBottomSheet, openBottomSheet } = useBottomSheetStore();

    const [loadingCategories, setLoadingCategories] = useState(true);
    const [loadingFoods, setLoadingFoods] = useState(true);

    useFocusEffect(
        useCallback(() => {
            setLoadingFoods(true);
            fetchFoodsPreview(foods => {
                setFoods(foods);
                setLoadingFoods(false);
            });
        }, []),
    );

    useEffect(() => {
        setBottomSheet(bottomSheetRef);
        fetchCategories(categories => {
            setCategories(categories);
            setLoadingCategories(false);
        });
    }, []);

    const handlePressFood = (food: Food) => {
        setSelectedFood(food);
        openBottomSheet();
    };

    return (
        <SafeAreaView className='flex-1 bg-blue-100'>
            <ScrollView showsVerticalScrollIndicator={false}>
                <SignOutButton
                    onPress={() => {
                        signOut(() => {
                            router.replace(
                                '/features/auth/presentation/AuthScreen',
                            );
                        });
                    }}
                />
                <HomeTitle />
                <InfoBanner />
                <IllustrationBanner />
                <Categories
                    categories={categories}
                    isLoading={loadingCategories}
                    onPress={(categoryId: string) => {
                        router.push({
                            pathname:
                                '/features/foods/presentation/FoodsScreen',
                            params: { selectedCategory: categoryId },
                        });
                    }}
                />
                <FoodsPreview
                    foods={foods}
                    isLoading={loadingFoods}
                    onPress={() => {
                        router.push('/features/foods/presentation/FoodsScreen');
                    }}
                    onPressFood={(food: Food) => {
                        handlePressFood(food);
                    }}
                />
            </ScrollView>
            <FoodBottomSheet />
        </SafeAreaView>
    );
};

export default withRouter(HomeScreen);
