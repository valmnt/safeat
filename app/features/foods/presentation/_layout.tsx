/* eslint-disable react-hooks/rules-of-hooks */
import { Stack } from 'expo-router';
import { TouchableOpacity, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import i18n from '@/app/config/i18n';
import FoodBottomSheet from '@/app/shared/components/FoodBottomSheet';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import Toast from 'react-native-toast-message';

export default function Layout() {
    return (
        <GestureHandlerRootView>
            <Stack
                screenOptions={{
                    headerShown: true,
                    headerTitle: '',
                    headerStyle: {
                        backgroundColor: '#F3F6FC',
                    },
                    headerLeft: ({ canGoBack }) => {
                        const router = useRouter();

                        return canGoBack ? (
                            <TouchableOpacity
                                onPress={() => router.back()}
                                className='flex-row items-center ml-2'
                            >
                                <Ionicons
                                    name='chevron-back'
                                    size={24}
                                    color='#333333'
                                />
                                <Text className='ml-2 text-black-100 font-medium'>
                                    {i18n.t('Navigation.back')}
                                </Text>
                            </TouchableOpacity>
                        ) : null;
                    },
                }}
            />
            <FoodBottomSheet />
            <Toast />
        </GestureHandlerRootView>
    );
}
