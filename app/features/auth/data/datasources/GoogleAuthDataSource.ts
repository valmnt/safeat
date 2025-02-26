import supabase from '@/app/config/supabase';
import AuthDataSource from '@/app/features/auth/domain/datasources/AuthDataSource';
import { GoogleSignin } from '@react-native-google-signin/google-signin';

class GoogleAuthDataSource implements AuthDataSource {
    async signIn(): Promise<boolean> {
        GoogleSignin.configure({
            scopes: [],
            webClientId: process.env.EXPO_PUBLIC_GOOGLE_ID_WEB,
            iosClientId: process.env.EXPO_PUBLIC_GOOGLE_ID_IOS,
        });

        try {
            await GoogleSignin.hasPlayServices();
            const userInfo = await GoogleSignin.signIn();
            if (userInfo.data && userInfo.data.idToken) {
                await supabase.auth.signInWithIdToken({
                    provider: 'google',
                    token: userInfo.data?.idToken,
                });
                return true; // Returns true if everything went perfectly
            }
            return false; // Returns false if the user has canceled
        } catch (error: any) {
            throw error;
        }
    }
}

export default GoogleAuthDataSource;
