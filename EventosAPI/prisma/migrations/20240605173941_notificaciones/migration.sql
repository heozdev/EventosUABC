BEGIN TRY

BEGIN TRAN;

-- CreateTable
CREATE TABLE [dbo].[Notificacion] (
    [id] INT NOT NULL IDENTITY(1,1),
    [usuarioId] INT NOT NULL,
    [mensaje] NVARCHAR(1000) NOT NULL,
    [leida] BIT NOT NULL,
    CONSTRAINT [Notificacion_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- AddForeignKey
ALTER TABLE [dbo].[Notificacion] ADD CONSTRAINT [Notificacion_usuarioId_fkey] FOREIGN KEY ([usuarioId]) REFERENCES [dbo].[Usuario]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
