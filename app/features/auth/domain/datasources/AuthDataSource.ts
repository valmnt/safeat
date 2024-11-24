import { DataSource } from '@/app/config/abstract';

abstract class AuthDataSource implements DataSource {
    abstract signIn(): Promise<boolean>;
}

export default AuthDataSource;
