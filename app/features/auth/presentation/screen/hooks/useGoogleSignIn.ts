import { useCallback } from 'react';
import { Success } from '@/app/config/response';
import GoogleAuthDataSource from '@/app/features/auth/data/datasources/GoogleAuthDataSource';
import GoogleAuthRepositoryImpl from '@/app/features/auth/data/repositories/GoogleAuthRepositoryImpl';
import SignInWithGoogleUseCase from '@/app/features/auth/domain/usecases/SignInWithGoogleUseCase';
import Toast from 'react-native-toast-message';

const useGoogleSignIn = (): ((onSuccess: () => void) => Promise<void>) => {
    const signInWithGoogle = useCallback(async (onSuccess: () => void) => {
        const dataSource = new GoogleAuthDataSource();
        const repository = new GoogleAuthRepositoryImpl(dataSource);
        const useCase = new SignInWithGoogleUseCase(repository);

        const result = await useCase.execute();
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

    return signInWithGoogle;
};

export default useGoogleSignIn;
