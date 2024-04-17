/*
  Warnings:

  - Added the required column `capacidad` to the `Solicitud` table without a default value. This is not possible if the table is not empty.

*/
BEGIN TRY

BEGIN TRAN;

-- AlterTable
ALTER TABLE [dbo].[Solicitud] ALTER COLUMN [responsable] NVARCHAR(1000) NOT NULL;
ALTER TABLE [dbo].[Solicitud] ADD [capacidad] INT NOT NULL;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
