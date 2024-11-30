import i18n from '@/app/config/i18n';
import { Success, Failure } from '@/app/config/response';
import AuthDataSource from '@/app/domain/datasources/auth-datasource';
import AuthRepository from '@/app/domain/repositories/auth-repository';

class GoogleAuthRepositoryImpl extends AuthRepository {
    constructor(dataSource: AuthDataSource) {
        super(dataSource);
    }

    async authenticate(): Promise<Success<boolean> | Failure> {
        return await (this.dataSource as AuthDataSource)
            .authenticate()
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
