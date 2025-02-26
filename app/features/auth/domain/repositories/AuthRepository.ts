import { Repository } from '@/app/config/base';
import { Success, Failure } from '@/app/config/response';

abstract class AuthRepository extends Repository {
    abstract signIn(): Promise<Success<boolean> | Failure>;
}

export default AuthRepository;
