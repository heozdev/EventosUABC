/*
  Warnings:

  - You are about to drop the column `usuarioEventosAsistidosId` on the `Evento` table. All the data in the column will be lost.
  - You are about to drop the column `usuarioEventosFavoritosId` on the `Evento` table. All the data in the column will be lost.

*/
BEGIN TRY

BEGIN TRAN;

-- AlterTable
ALTER TABLE [dbo].[Evento] DROP COLUMN [usuarioEventosAsistidosId],
[usuarioEventosFavoritosId];

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH