import React, { useEffect, useState } from 'react';
import { ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import SignOutButton from '../components/SignOutButton';
import HomeTitle from '../components/HomeTitle';
import InfoBanner from '../components/InfoBanner';
import IllustrationBanner from '../components/IllustrationBanner';
import Categories from '../components/Categories';
import Category from '../../../../shared/models/Category';
import Foods from '../components/Foods';
import Food from '@/app/shared/models/Food';
import useSignOut from './hooks/useSignOut';
import withRouter from '@/app/shared/hooks/withRouter';
import { Router } from 'expo-router';
import useFetchCategories from './hooks/useFetchCategories';
import useFetchFoodPreview from './hooks/useFetchFoodPreview';

interface HomeScreenProps {
    router: Router;
}

const HomeScreen = ({ router }: HomeScreenProps): React.JSX.Element => {
    const handleSignOut = useSignOut();
    const handleFetchCategories = useFetchCategories();
    const handleFetchFoodPreview = useFetchFoodPreview();

    const [loadingCategories, setLoadingCategories] = useState(true);
    const [loadingFoods, setLoadingFoods] = useState(true);
    const [categories, setCategories] = useState<Category[]>([]);
    const [foods, setFoods] = useState<Food[]>([]);

    useEffect(() => {
        const fetchCategories = () => {
            handleFetchCategories().then(categories => {
                setCategories(categories ?? []);
                setLoadingCategories(false);
            });
        };

        const fetchFoods = () => {
            handleFetchFoodPreview().then(foods => {
                setFoods(foods ?? []);
                setLoadingFoods(false);
            });
        };

        fetchCategories();
        fetchFoods();
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
                />
                <Foods foods={foods} isLoading={loadingFoods} />
            </ScrollView>
        </SafeAreaView>
    );
};

export default withRouter(HomeScreen);
