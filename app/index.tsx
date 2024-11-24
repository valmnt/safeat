import { registerRootComponent } from 'expo';
import AuthScreen from './features/auth/presentation/screen/AuthScreen';
import HomeScreen from './features/home/presentation/screen/HomeScreen';
import Toast from 'react-native-toast-message';
import { useEffect, useState } from 'react';
import supabase from './config/supabase';
import { View, ActivityIndicator } from 'react-native';
import React from 'react';

export default function App(): React.JSX.Element {
    const [isAuthenticated, setAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);

    const initializeSession = async () => {
        const { data } = await supabase.auth.getUser();
        setAuthenticated(data.user !== null);
        setLoading(false);
    };

    useEffect(() => {
        initializeSession();
    }, []);

    if (loading) {
        return (
            <View className='flex-1 bg-blue-100 justify-center items-center'>
                <ActivityIndicator size='large' />
            </View>
        );
    }

    return (
        <>
            {isAuthenticated ? <HomeScreen /> : <AuthScreen />}
            <Toast />
        </>
    );
}

registerRootComponent(App);
