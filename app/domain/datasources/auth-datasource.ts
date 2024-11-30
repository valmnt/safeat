import { DataSource } from '@/app/config/abstract';

interface AuthDataSource extends DataSource {
    authenticate(): Promise<boolean>;
}

export default AuthDataSource;
