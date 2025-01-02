export abstract class Repository {
    protected dataSource: DataSource;

    constructor(dataSource: DataSource) {
        this.dataSource = dataSource;
    }
}
export abstract class DataSource {}

export default { Repository, DataSource };
