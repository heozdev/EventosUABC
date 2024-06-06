BEGIN TRY

BEGIN TRAN;

-- CreateTable
CREATE TABLE [dbo].[Asistencia] (
    [id] INT NOT NULL IDENTITY(1,1),
    [usuarioId] INT NOT NULL,
    [eventoId] INT NOT NULL,
    [fechaRegistro] DATETIME2 NOT NULL CONSTRAINT [Asistencia_fechaRegistro_df] DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT [Asistencia_pkey] PRIMARY KEY CLUSTERED ([id]),
    CONSTRAINT [Asistencia_usuarioId_eventoId_key] UNIQUE NONCLUSTERED ([usuarioId],[eventoId])
);

-- AddForeignKey
ALTER TABLE [dbo].[Asistencia] ADD CONSTRAINT [Asistencia_usuarioId_fkey] FOREIGN KEY ([usuarioId]) REFERENCES [dbo].[Usuario]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[Asistencia] ADD CONSTRAINT [Asistencia_eventoId_fkey] FOREIGN KEY ([eventoId]) REFERENCES [dbo].[Evento]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
