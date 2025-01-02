import React, { useEffect, useState, useCallback } from 'react';
import { ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import SignOutButton from '../components/SignOutButton';
import HomeTitle from '../components/HomeTitle';
import InfoBanner from '../components/InfoBanner';
import IllustrationBanner from '../components/IllustrationBanner';
import Categories from '../components/Categories';
import useSignOut from './hooks/useSignOut';
import withRouter from '@/app/shared/hooks/withRouter';
import { Router, useFocusEffect } from 'expo-router';
import useFetchCategories from './hooks/useFetchCategories';
import useFetchFoodsPreview from './hooks/useFetchFoodsPreview';
import useFoodStore from '@/app/shared/stores/foodStore';
import FoodsPreview from '../components/FoodsPreview';
import useCategoryStore from '@/app/shared/stores/categoryStore';

interface HomeScreenProps {
    router: Router;
}

const HomeScreen = ({ router }: HomeScreenProps): React.JSX.Element => {
    const handleSignOut = useSignOut();
    const handleFetchCategories = useFetchCategories();
    const handleFetchFoodsPreview = useFetchFoodsPreview();
    const { foods, setFoods } = useFoodStore();
    const { categories, setCategories } = useCategoryStore();

    const [loadingCategories, setLoadingCategories] = useState(true);
    const [loadingFoods, setLoadingFoods] = useState(true);

    useFocusEffect(
        useCallback(() => {
            setLoadingFoods(true);
            handleFetchFoodsPreview(foods => {
                setFoods(foods);
                setLoadingFoods(false);
            });
        }, []),
    );

    useEffect(() => {
        handleFetchCategories(categories => {
            setCategories(categories);
            setLoadingCategories(false);
        });
    }, []);

    return (
        <SafeAreaView className='flex-1 bg-blue-100'>
            <ScrollView showsVerticalScrollIndicator={false}>
                <SignOutButton
                    onPress={() => {
                        handleSignOut(() => {
                            router.replace(
                                '/features/auth/presentation/screen/AuthScreen',
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
                                '/features/foods/presentation/screen/FoodsScreen',
                            params: { selectedCategory: categoryId },
                        });
                    }}
                />
                <FoodsPreview
                    foods={foods}
                    isLoading={loadingFoods}
                    onPress={() => {
                        router.push(
                            '/features/foods/presentation/screen/FoodsScreen',
                        );
                    }}
                />
            </ScrollView>
        </SafeAreaView>
    );
};

export default withRouter(HomeScreen);
