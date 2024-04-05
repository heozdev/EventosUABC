/*
  Warnings:

  - You are about to drop the column `encargadoId` on the `Evento` table. All the data in the column will be lost.
  - You are about to drop the column `profesorId` on the `Evento` table. All the data in the column will be lost.

*/
BEGIN TRY

BEGIN TRAN;

-- AlterTable
ALTER TABLE [dbo].[Evento] DROP COLUMN [encargadoId],
[profesorId];

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
