import BaseService from "./BaseService";

export default class WorkoutService extends BaseService{
    constructor(){
        super();
    }

    async submitForm(data: any){
        return await this.basePost("/api/Workout/addWorkoutHeader", data);
    }
}