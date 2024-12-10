import BaseService from "./BaseService";

export default class AuditService extends BaseService {
    constructor() {
        super();
    }

    async getMany() {
        return this.baseGet("/api/Audit/getMany");
    }
}