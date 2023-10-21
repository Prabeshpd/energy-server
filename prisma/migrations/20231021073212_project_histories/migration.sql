-- CreateTable
CREATE TABLE "project_histories" (
    "user_id" UUID NOT NULL,
    "project_id" UUID NOT NULL,
    "energy_consuption" INTEGER NOT NULL,
    "time" TIMESTAMP(3) NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "project_histories_project_id_time_key" ON "project_histories"("project_id", "time");
