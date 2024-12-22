using Application.Common;
using Application.DTOs;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Features.Exercise.ExerciseCategory.Commands.Add
{
    public class AddExerciseCategoryRequest : BaseRequest, IRequest<AddExerciseCategoryResponse>
    {
        public ExerciseCategoryDTO ExerciseCategory { get; set; }
    }
}
