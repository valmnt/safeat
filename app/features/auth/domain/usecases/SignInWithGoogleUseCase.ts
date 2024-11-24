import { Success, Failure } from '@/app/config/response';
import AuthRepository from '../repositories/AuthRepository';
import { UseCase } from '@/app/config/abstract';

class SignInWithGoogleUseCase extends UseCase {
    constructor(repository: AuthRepository) {
        super(repository);
    }

    async execute(): Promise<Success<boolean> | Failure> {
        return await (this.repository as AuthRepository).signIn();
    }
}

export default SignInWithGoogleUseCase;
