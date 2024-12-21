using System;

namespace Application.DTOs;

public class ExerciseDTO
{
    public long ExerciseId { get; set; }
    public string Name { get; set; }
    public string Description { get; set; }
    public bool GeneratedByUser { get; set; }
}
