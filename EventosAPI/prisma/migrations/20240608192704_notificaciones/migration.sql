BEGIN TRY

BEGIN TRAN;

-- CreateTable
CREATE TABLE [dbo].[TipoDeUsuario] (
    [IdTipoUsuario] INT NOT NULL IDENTITY(1,1),
    [rol] NVARCHAR(1000) NOT NULL,
    CONSTRAINT [TipoDeUsuario_pkey] PRIMARY KEY CLUSTERED ([IdTipoUsuario])
);

-- CreateTable
CREATE TABLE [dbo].[TipoDeNotificacion] (
    [id] INT NOT NULL IDENTITY(1,1),
    [tipoDeNotificacion] NVARCHAR(1000) NOT NULL,
    CONSTRAINT [TipoDeNotificacion_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[Notificacion] (
    [id] INT NOT NULL IDENTITY(1,1),
    [tipoDeNotificacionId] INT NOT NULL,
    [usuarioId] INT NOT NULL,
    [mensaje] NVARCHAR(1000) NOT NULL,
    [leida] BIT NOT NULL,
    CONSTRAINT [Notificacion_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[Usuario] (
    [id] INT NOT NULL IDENTITY(1,1),
    [idTipoUsuario] INT NOT NULL,
    [correo] NVARCHAR(1000) NOT NULL,
    [contrasena] NVARCHAR(1000) NOT NULL,
    [matricula] INT NOT NULL,
    [nombres] NVARCHAR(1000) NOT NULL,
    [apellidos] NVARCHAR(1000) NOT NULL,
    [carrera] NVARCHAR(1000) NOT NULL,
    [facultad] NVARCHAR(1000) NOT NULL,
    CONSTRAINT [Usuario_pkey] PRIMARY KEY CLUSTERED ([id]),
    CONSTRAINT [Usuario_idTipoUsuario_key] UNIQUE NONCLUSTERED ([idTipoUsuario]),
    CONSTRAINT [Usuario_correo_key] UNIQUE NONCLUSTERED ([correo]),
    CONSTRAINT [Usuario_matricula_key] UNIQUE NONCLUSTERED ([matricula])
);

-- CreateTable
CREATE TABLE [dbo].[Solicitud] (
    [id] INT NOT NULL IDENTITY(1,1),
    [ubicacionId] INT NOT NULL,
    [responsableId] INT NOT NULL,
    [nombreResponsable] NVARCHAR(1000) NOT NULL,
    [nombre] NVARCHAR(1000) NOT NULL,
    [descripcion] NVARCHAR(1000) NOT NULL,
    [fecha] NVARCHAR(1000) NOT NULL,
    [valorEnCreditos] BIT NOT NULL,
    [horaInicio] NVARCHAR(1000) NOT NULL,
    [horaFin] NVARCHAR(1000) NOT NULL,
    [totalSellos] INT NOT NULL,
    [modalidad] NVARCHAR(1000) NOT NULL,
    [estado] NVARCHAR(1000) NOT NULL,
    [capacidad] INT NOT NULL,
    [fechaCreacion] DATETIME2 NOT NULL CONSTRAINT [Solicitud_fechaCreacion_df] DEFAULT CURRENT_TIMESTAMP,
    [notas] NVARCHAR(1000),
    [mensaje] NVARCHAR(1000),
    [recordatorio] INT NOT NULL CONSTRAINT [Solicitud_recordatorio_df] DEFAULT 0,
    CONSTRAINT [Solicitud_pkey] PRIMARY KEY CLUSTERED ([id]),
    CONSTRAINT [Solicitud_ubicacionId_key] UNIQUE NONCLUSTERED ([ubicacionId])
);

-- CreateTable
CREATE TABLE [dbo].[Ubicacion] (
    [id] INT NOT NULL IDENTITY(1,1),
    [facultad] NVARCHAR(1000) NOT NULL,
    [estado] NVARCHAR(1000) NOT NULL,
    [campus] NVARCHAR(1000) NOT NULL,
    [ciudad] NVARCHAR(1000) NOT NULL,
    [direccion] NVARCHAR(1000) NOT NULL,
    [aula] NVARCHAR(1000) NOT NULL,
    CONSTRAINT [Ubicacion_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[Evento] (
    [id] INT NOT NULL IDENTITY(1,1),
    [solicitudId] INT NOT NULL,
    [estado] NVARCHAR(1000) NOT NULL,
    CONSTRAINT [Evento_pkey] PRIMARY KEY CLUSTERED ([id]),
    CONSTRAINT [Evento_solicitudId_key] UNIQUE NONCLUSTERED ([solicitudId])
);

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
ALTER TABLE [dbo].[Notificacion] ADD CONSTRAINT [Notificacion_tipoDeNotificacionId_fkey] FOREIGN KEY ([tipoDeNotificacionId]) REFERENCES [dbo].[TipoDeNotificacion]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[Notificacion] ADD CONSTRAINT [Notificacion_usuarioId_fkey] FOREIGN KEY ([usuarioId]) REFERENCES [dbo].[Usuario]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[Usuario] ADD CONSTRAINT [Usuario_idTipoUsuario_fkey] FOREIGN KEY ([idTipoUsuario]) REFERENCES [dbo].[TipoDeUsuario]([IdTipoUsuario]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[Solicitud] ADD CONSTRAINT [Solicitud_responsableId_fkey] FOREIGN KEY ([responsableId]) REFERENCES [dbo].[Usuario]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[Solicitud] ADD CONSTRAINT [Solicitud_ubicacionId_fkey] FOREIGN KEY ([ubicacionId]) REFERENCES [dbo].[Ubicacion]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[Evento] ADD CONSTRAINT [Evento_solicitudId_fkey] FOREIGN KEY ([solicitudId]) REFERENCES [dbo].[Solicitud]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

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
