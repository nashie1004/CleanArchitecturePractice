using Application.Common;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Features.Exercise.ExerciseCategory.Queries.GetDropdown
{
    public class GetDropdownExerciseCategoryRequest : BaseRequestList, IRequest<GetDropdownExerciseCategoryResponse>
    {
    }
}
