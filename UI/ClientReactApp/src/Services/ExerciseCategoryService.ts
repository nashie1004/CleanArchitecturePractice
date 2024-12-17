import BaseService from "./BaseService";

export default class ExerciseCategoryService extends BaseService {
    constructor() {
        super();
    }

    async submitForm(data: any) {
        const response = await this.basePost("/api/ExerciseCategory/addExerciseCategory", data);
        return response;
    }
}