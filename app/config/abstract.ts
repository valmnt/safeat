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
export abstract class DataSource {}

export default { UseCase, Repository, DataSource };
