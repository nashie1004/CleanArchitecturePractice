using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Infra.Migrations
{
    /// <inheritdoc />
    public partial class AddWorkoutEntities : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Exercises",
                columns: table => new
                {
                    ExerciseId = table.Column<long>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Name = table.Column<string>(type: "TEXT", nullable: false),
                    Description = table.Column<string>(type: "TEXT", nullable: false),
                    ImageUrl = table.Column<string>(type: "TEXT", maxLength: 200, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Exercises", x => x.ExerciseId);
                });

            migrationBuilder.CreateTable(
                name: "WorkoutDetails",
                columns: table => new
                {
                    WorkoutDetailId = table.Column<long>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Sets = table.Column<int>(type: "INTEGER", nullable: false),
                    Reps = table.Column<int>(type: "INTEGER", nullable: false),
                    Weight = table.Column<decimal>(type: "TEXT", nullable: false),
                    WorkoutHeaderId = table.Column<long>(type: "INTEGER", nullable: false),
                    ExerciseId = table.Column<long>(type: "INTEGER", nullable: false),
                    CreatedBy = table.Column<long>(type: "INTEGER", nullable: false),
                    CreatedDate = table.Column<DateTime>(type: "TEXT", nullable: false),
                    LastUpdatedBy = table.Column<long>(type: "INTEGER", nullable: false),
                    LastUpdatedDate = table.Column<DateTime>(type: "TEXT", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_WorkoutDetails", x => x.WorkoutDetailId);
                });

            migrationBuilder.CreateTable(
                name: "WorkoutHeaders",
                columns: table => new
                {
                    WorkoutHeaderId = table.Column<long>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Title = table.Column<string>(type: "TEXT", maxLength: 300, nullable: false),
                    Duration = table.Column<decimal>(type: "TEXT", nullable: false),
                    CreatedBy = table.Column<long>(type: "INTEGER", nullable: false),
                    CreatedDate = table.Column<DateTime>(type: "TEXT", nullable: false),
                    LastUpdatedBy = table.Column<long>(type: "INTEGER", nullable: false),
                    LastUpdatedDate = table.Column<DateTime>(type: "TEXT", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_WorkoutHeaders", x => x.WorkoutHeaderId);
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Exercises");

            migrationBuilder.DropTable(
                name: "WorkoutDetails");

            migrationBuilder.DropTable(
                name: "WorkoutHeaders");
        }
    }
}
