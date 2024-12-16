using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Infra.Migrations
{
    /// <inheritdoc />
    public partial class AddForeignKey : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Exercises_ExerciseCategory_ExerciseCategoryIdCategoryId",
                table: "Exercises");

            migrationBuilder.RenameColumn(
                name: "ExerciseCategoryIdCategoryId",
                table: "Exercises",
                newName: "ExerciseCategoryId");

            migrationBuilder.RenameIndex(
                name: "IX_Exercises_ExerciseCategoryIdCategoryId",
                table: "Exercises",
                newName: "IX_Exercises_ExerciseCategoryId");

            migrationBuilder.AddForeignKey(
                name: "FK_Exercises_ExerciseCategory_ExerciseCategoryId",
                table: "Exercises",
                column: "ExerciseCategoryId",
                principalTable: "ExerciseCategory",
                principalColumn: "CategoryId",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Exercises_ExerciseCategory_ExerciseCategoryId",
                table: "Exercises");

            migrationBuilder.RenameColumn(
                name: "ExerciseCategoryId",
                table: "Exercises",
                newName: "ExerciseCategoryIdCategoryId");

            migrationBuilder.RenameIndex(
                name: "IX_Exercises_ExerciseCategoryId",
                table: "Exercises",
                newName: "IX_Exercises_ExerciseCategoryIdCategoryId");

            migrationBuilder.AddForeignKey(
                name: "FK_Exercises_ExerciseCategory_ExerciseCategoryIdCategoryId",
                table: "Exercises",
                column: "ExerciseCategoryIdCategoryId",
                principalTable: "ExerciseCategory",
                principalColumn: "CategoryId",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
