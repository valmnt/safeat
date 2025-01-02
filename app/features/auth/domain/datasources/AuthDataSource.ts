import { DataSource } from '@/app/config/base';

abstract class AuthDataSource implements DataSource {
    abstract signIn(): Promise<boolean>;
}

export default AuthDataSource;
