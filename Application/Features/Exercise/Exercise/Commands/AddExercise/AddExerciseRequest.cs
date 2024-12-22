using Application.DTOs;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Features.Exercise.Exercise.Commands.AddExercise
{
    public class AddExerciseRequest : IRequest<AddExerciseResponse>
    {
        public ExerciseDTO Exercise { get; set; }
    }
}
