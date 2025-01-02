export class Success<T> {
    constructor(public value: T) {}
}

export class Failure {
    constructor(
        public error: Error,
        public errorTitle?: string,
        public errorMessage?: string,
    ) {}
}

export default { Success, Failure };
