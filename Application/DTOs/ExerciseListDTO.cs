using System;

namespace Application.DTOs;

public class ExerciseListDTO
{
    public long ExerciseId { get; set; }
    public string Name { get; set; }
    public string Description { get; set; }
    public bool GeneratedByUser { get; set; }
    public long ExerciseCategoryId { get; set; }
    public string ExerciseCategoryName { get; set; }
}
