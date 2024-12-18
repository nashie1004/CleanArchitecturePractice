import BaseService, { GenericListRequest } from "./BaseService";

export default class ExerciseCategoryService extends BaseService {
    constructor() {
        super();
    }

    async submitForm(data: any) {
        const response = await this.basePost("/api/ExerciseCategory/addExerciseCategory", data);
        return response;
    }

    async getMany(listParams: GenericListRequest) {
        const response = await this.baseGetList("/api/ExerciseCategory/getMany", listParams);
        return response;
    }
}