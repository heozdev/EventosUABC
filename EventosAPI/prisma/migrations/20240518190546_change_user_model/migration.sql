/*
  Warnings:

  - A unique constraint covering the columns `[matricula]` on the table `Usuario` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `apellidos` to the `Usuario` table without a default value. This is not possible if the table is not empty.
  - Added the required column `carrera` to the `Usuario` table without a default value. This is not possible if the table is not empty.
  - Added the required column `facultad` to the `Usuario` table without a default value. This is not possible if the table is not empty.
  - Added the required column `matricula` to the `Usuario` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nombres` to the `Usuario` table without a default value. This is not possible if the table is not empty.

*/
BEGIN TRY

BEGIN TRAN;

-- AlterTable
ALTER TABLE [dbo].[Usuario] ADD [apellidos] NVARCHAR(1000) NOT NULL,
[carrera] NVARCHAR(1000) NOT NULL,
[facultad] NVARCHAR(1000) NOT NULL,
[matricula] INT NOT NULL,
[nombres] NVARCHAR(1000) NOT NULL;

-- CreateIndex
ALTER TABLE [dbo].[Usuario] ADD CONSTRAINT [Usuario_matricula_key] UNIQUE NONCLUSTERED ([matricula]);

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
