using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Infra.Migrations
{
    /// <inheritdoc />
    public partial class WorkoutDetailOnetoMany : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateIndex(
                name: "IX_WorkoutDetails_ExerciseId",
                table: "WorkoutDetails",
                column: "ExerciseId");

            migrationBuilder.CreateIndex(
                name: "IX_WorkoutDetails_WorkoutHeaderId",
                table: "WorkoutDetails",
                column: "WorkoutHeaderId");

            migrationBuilder.AddForeignKey(
                name: "FK_WorkoutDetails_Exercises_ExerciseId",
                table: "WorkoutDetails",
                column: "ExerciseId",
                principalTable: "Exercises",
                principalColumn: "ExerciseId",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_WorkoutDetails_WorkoutHeaders_WorkoutHeaderId",
                table: "WorkoutDetails",
                column: "WorkoutHeaderId",
                principalTable: "WorkoutHeaders",
                principalColumn: "WorkoutHeaderId",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_WorkoutDetails_Exercises_ExerciseId",
                table: "WorkoutDetails");

            migrationBuilder.DropForeignKey(
                name: "FK_WorkoutDetails_WorkoutHeaders_WorkoutHeaderId",
                table: "WorkoutDetails");

            migrationBuilder.DropIndex(
                name: "IX_WorkoutDetails_ExerciseId",
                table: "WorkoutDetails");

            migrationBuilder.DropIndex(
                name: "IX_WorkoutDetails_WorkoutHeaderId",
                table: "WorkoutDetails");
        }
    }
}
