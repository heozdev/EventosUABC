BEGIN TRY

BEGIN TRAN;

-- CreateTable
CREATE TABLE [dbo].[Asistencia] (
    [id] INT NOT NULL IDENTITY(1,1),
    [eventoId] INT NOT NULL,
    [usuarioId] INT NOT NULL,
    CONSTRAINT [Asistencia_pkey] PRIMARY KEY CLUSTERED ([id]),
    CONSTRAINT [Asistencia_eventoId_key] UNIQUE NONCLUSTERED ([eventoId]),
    CONSTRAINT [Asistencia_usuarioId_key] UNIQUE NONCLUSTERED ([usuarioId]),
    CONSTRAINT [Asistencia_eventoId_usuarioId_key] UNIQUE NONCLUSTERED ([eventoId],[usuarioId])
);

-- AddForeignKey
ALTER TABLE [dbo].[Asistencia] ADD CONSTRAINT [Asistencia_eventoId_fkey] FOREIGN KEY ([eventoId]) REFERENCES [dbo].[Evento]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[Asistencia] ADD CONSTRAINT [Asistencia_usuarioId_fkey] FOREIGN KEY ([usuarioId]) REFERENCES [dbo].[Usuario]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
