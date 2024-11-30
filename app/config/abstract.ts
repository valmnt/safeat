/* eslint-disable @typescript-eslint/no-empty-object-type */
export abstract class UseCase {
    protected repository: Repository;

    constructor(repository: Repository) {
        this.repository = repository;
    }

    abstract execute(): unknown;
}

export abstract class Repository {
    protected dataSource: DataSource;

    constructor(dataSource: DataSource) {
        this.dataSource = dataSource;
    }
}
export interface DataSource {}
export interface ViewModel {}
