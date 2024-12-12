import BaseService, { GenericListRequest } from "./BaseService";

export default class AuditService extends BaseService {
    constructor() {
        super();
    }

    async getMany(listParams: GenericListRequest) {
        return this.baseGetList("/api/Audit/getMany", listParams);
    }
}