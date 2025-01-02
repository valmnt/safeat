import { useCallback } from 'react';
import { Success } from '@/app/config/response';
import GoogleAuthDataSource from '@/app/features/auth/data/datasources/GoogleAuthDataSource';
import GoogleAuthRepositoryImpl from '@/app/features/auth/data/repositories/GoogleAuthRepositoryImpl';
import Toast from 'react-native-toast-message';

const useGoogleSignIn = () => {
    return useCallback(async (onSuccess: () => void) => {
        const dataSource = new GoogleAuthDataSource();
        const repository = new GoogleAuthRepositoryImpl(dataSource);

        const result = await repository.signIn();
        if (result instanceof Success) {
            if (result.value) {
                onSuccess();
            }
        } else {
            Toast.show({
                type: 'error',
                text1: result.errorTitle,
                text2: result.errorMessage,
                position: 'top',
            });
        }
    }, []);
};

export default useGoogleSignIn;
