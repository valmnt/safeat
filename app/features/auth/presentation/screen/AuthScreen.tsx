import React from 'react';
import { View } from 'react-native';
import withRouter from '@/app/shared/hooks/withRouter';
import { Router } from 'expo-router';
import useGoogleSignIn from './hooks/useGoogleSignIn';
import AuthIllustration from '../components/AutIllustration';
import AuthTitle from '../components/AuthTitle';
import SignInWithGoogleButton from '../components/SignInWithGoogleButton';
import AuthSubtitle from '../components/AuthSubtitle';

interface AuthScreenProps {
    router: Router;
}

const AuthScreen = ({ router }: AuthScreenProps): React.JSX.Element => {
    const signInWithGoogle = useGoogleSignIn();

    return (
        <View className='bg-blue-100 min-h-screen justify-center'>
            <View className='justify-center items-center'>
                <AuthIllustration />
                <AuthTitle />
                <SignInWithGoogleButton
                    onPress={() => {
                        signInWithGoogle(() => {
                            router.replace(
                                '/features/home/presentation/screen/HomeScreen',
                            );
                        });
                    }}
                />
                <AuthSubtitle />
            </View>
        </View>
    );
};

export default withRouter(AuthScreen);
