using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Infra.Migrations
{
    /// <inheritdoc />
    public partial class OneToManyExercise : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<long>(
                name: "ExerciseCategoryIdCategoryId",
                table: "Exercises",
                type: "INTEGER",
                nullable: false,
                defaultValue: 0L);

            migrationBuilder.CreateTable(
                name: "ExerciseCategory",
                columns: table => new
                {
                    CategoryId = table.Column<long>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Name = table.Column<string>(type: "TEXT", maxLength: 100, nullable: false),
                    Description = table.Column<string>(type: "TEXT", maxLength: 300, nullable: true),
                    CreatedBy = table.Column<long>(type: "INTEGER", nullable: false),
                    CreatedDate = table.Column<DateTime>(type: "TEXT", nullable: false),
                    LastUpdatedBy = table.Column<long>(type: "INTEGER", nullable: true),
                    LastUpdatedDate = table.Column<DateTime>(type: "TEXT", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ExerciseCategory", x => x.CategoryId);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Exercises_ExerciseCategoryIdCategoryId",
                table: "Exercises",
                column: "ExerciseCategoryIdCategoryId");

            migrationBuilder.AddForeignKey(
                name: "FK_Exercises_ExerciseCategory_ExerciseCategoryIdCategoryId",
                table: "Exercises",
                column: "ExerciseCategoryIdCategoryId",
                principalTable: "ExerciseCategory",
                principalColumn: "CategoryId",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Exercises_ExerciseCategory_ExerciseCategoryIdCategoryId",
                table: "Exercises");

            migrationBuilder.DropTable(
                name: "ExerciseCategory");

            migrationBuilder.DropIndex(
                name: "IX_Exercises_ExerciseCategoryIdCategoryId",
                table: "Exercises");

            migrationBuilder.DropColumn(
                name: "ExerciseCategoryIdCategoryId",
                table: "Exercises");
        }
    }
}
