import i18n from '@/app/config/i18n';
import { Success, Failure } from '@/app/config/response';
import AuthDataSource from '@/app/features/auth/domain/datasources/AuthDataSource';
import AuthRepository from '@/app/features/auth/domain/repositories/AuthRepository';

class GoogleAuthRepositoryImpl extends AuthRepository {
    constructor(dataSource: AuthDataSource) {
        super(dataSource);
    }

    async signIn(): Promise<Success<boolean> | Failure> {
        return await (this.dataSource as AuthDataSource)
            .signIn()
            .then(value => {
                return new Success(value);
            })
            .catch((error: Error) => {
                return new Failure(
                    error,
                    i18n.t('Auth.error.title'),
                    i18n.t('Auth.error.message'),
                );
            });
    }
}

export default GoogleAuthRepositoryImpl;
