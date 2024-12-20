import BaseService from "./BaseService";

export default class ExerciseService extends BaseService {
    constructor() {
        super();
    }

    async submitForm(data: any) {
        const response = await this.basePost("/api/Exercise/addExercise", data);
        return response;
    }

    async getDropdown(){
        const response = await this.baseGetList("/api/Exercise/getDropdown", {
            pageSize: 0,
            pageNumber: 0,
            sortBy: "",
            filters: ""
        });
        return response;
    }
}