/* eslint-disable @typescript-eslint/no-require-imports */
import React from 'react';
import { View, Image, Text, Pressable } from 'react-native';
import i18n from '@/app/config/i18n';
import AuthViewModel from './auth-viewmodel';

const AuthView = (): React.JSX.Element => {
    const viewModel = new AuthViewModel();

    return (
        <View className='bg-blue-100 min-h-screen justify-center'>
            <View className='justify-center items-center'>
                <MainImage />
                <Description />
                <Button
                    onPress={() => {
                        viewModel.authenticationWithGoogle();
                    }}
                />
                <Tip />
            </View>
        </View>
    );
};

const MainImage = (): React.JSX.Element => {
    return (
        <Image
            className='
				sm:w-[65%] md:w-[80%] lg:w-[55%]
				h-[50%] xxl:h-[55%]
				justify-center items-center'
            source={require('@/assets/images/png/food.png')}
        />
    );
};

const Description = (): React.JSX.Element => {
    return (
        <Text
            className='
				w-full mt-10
				text-center text-gray-200
				sm:text-md md:text-lg xl:text-2xl xxl:text-3xl'
        >
            {i18n.t('Auth.description')}
        </Text>
    );
};

interface ButtonProps {
    onPress: () => void;
}

const Button = ({ onPress }: ButtonProps): React.JSX.Element => {
    return (
        <Pressable
            className='
				sm:w-[75%] lg:w-[50%] sm:h-[9%] md:h-[8%] lg:h-[9%] xl:h-[7%] 
				bg-black-100 rounded-xl active:scale-95
				justify-center items-center 
				sm:mt-8 md:mt-10 xl:mt-10 '
            onPress={onPress}
        >
            <Text
                className='
					sm:text-lg md:text-xl xl:text-2xl xxl:text-3xl 
					text-center text-white-100 font-semibold'
            >
                {i18n.t('Auth.googleSignInButton')}
            </Text>
        </Pressable>
    );
};

const Tip = (): React.JSX.Element => {
    return (
        <Text
            className='
				sm:text-sm md:text-md lg:text-xl 
				text-center text-gray-200
				sm:mt-4 md:mt-7'
        >
            {i18n.t('Auth.noAccountInfo')}
        </Text>
    );
};

export default AuthView;
