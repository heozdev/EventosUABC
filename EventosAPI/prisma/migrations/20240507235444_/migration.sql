BEGIN TRY

BEGIN TRAN;

-- DropForeignKey
ALTER TABLE [dbo].[Evento] DROP CONSTRAINT [Evento_usuarioEventosAsistidosId_fkey];

-- DropForeignKey
ALTER TABLE [dbo].[Evento] DROP CONSTRAINT [Evento_usuarioEventosFavoritosId_fkey];

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
