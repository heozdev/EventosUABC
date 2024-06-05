/*
  Warnings:

  - You are about to drop the column `responsable` on the `Solicitud` table. All the data in the column will be lost.
  - Added the required column `responsableId` to the `Solicitud` table without a default value. This is not possible if the table is not empty.

*/
BEGIN TRY

BEGIN TRAN;

-- AlterTable
ALTER TABLE [dbo].[Solicitud] DROP COLUMN [responsable];
ALTER TABLE [dbo].[Solicitud] ADD [responsableId] INT NOT NULL;

-- AddForeignKey
ALTER TABLE [dbo].[Solicitud] ADD CONSTRAINT [Solicitud_responsableId_fkey] FOREIGN KEY ([responsableId]) REFERENCES [dbo].[Usuario]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
