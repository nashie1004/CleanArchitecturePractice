import BaseService from "./BaseService";

export default class ExerciseService extends BaseService {
    constructor() {
        super();
    }

    async submitForm(data: any) {
        const response = await this.basePost("/api/Exercise/addExercise", data);
        return response;
    }
}