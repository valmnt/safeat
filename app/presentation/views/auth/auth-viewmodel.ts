import { ViewModel } from '@/app/config/abstract';
import { Success, Failure } from '@/app/config/response';
import GoogleAuthDataSource from '@/app/data/datasources/google-auth';
import GoogleAuthRepositoryImpl from '@/app/data/repositories/google-auth';
import AuthDataSource from '@/app/domain/datasources/auth-datasource';
import AuthRepository from '@/app/domain/repositories/auth-repository';
import AuthWithGoogleUseCase from '@/app/domain/usecases/auth-with-google';
import Toast from 'react-native-toast-message';

abstract class AbstractAuthViewModel implements ViewModel {
    protected authWithGoogleUseCase!: AuthWithGoogleUseCase;
}

class AuthViewModel extends AbstractAuthViewModel {
    constructor() {
        super();
        const datasource = new GoogleAuthDataSource();
        const repository = new GoogleAuthRepositoryImpl(
            datasource as AuthDataSource,
        );
        this.authWithGoogleUseCase = new AuthWithGoogleUseCase(
            repository as AuthRepository,
        );
    }

    async authenticationWithGoogle(): Promise<void> {
        const result = await this.authWithGoogleUseCase.execute();
        if (result instanceof Success) {
            // Handle success authentication
        } else if (result instanceof Failure) {
            Toast.show({
                type: 'error',
                text1: result.errorTitle,
                text2: result.errorMessage,
                position: 'bottom',
            });
        }
    }
}

export default AuthViewModel;
