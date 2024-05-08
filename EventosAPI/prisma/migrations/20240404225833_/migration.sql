BEGIN TRY

BEGIN TRAN;

-- CreateTable
CREATE TABLE [dbo].[TipoDeUsuario] (
    [IdTipoUsuario] INT NOT NULL IDENTITY(1,1),
    [rol] NVARCHAR(1000) NOT NULL,
    CONSTRAINT [TipoDeUsuario_pkey] PRIMARY KEY CLUSTERED ([IdTipoUsuario])
);

-- CreateTable
CREATE TABLE [dbo].[Usuario] (
    [id] INT NOT NULL IDENTITY(1,1),
    [idTipoUsuario] INT NOT NULL,
    [correo] NVARCHAR(1000) NOT NULL,
    [contrasena] NVARCHAR(1000) NOT NULL,
    CONSTRAINT [Usuario_pkey] PRIMARY KEY CLUSTERED ([id]),
    CONSTRAINT [Usuario_idTipoUsuario_key] UNIQUE NONCLUSTERED ([idTipoUsuario])
);

-- CreateTable
CREATE TABLE [dbo].[Solicitud] (
    [id] INT NOT NULL IDENTITY(1,1),
    [ubicacionId] INT NOT NULL,
    [nombre] NVARCHAR(1000) NOT NULL,
    [descripcion] NVARCHAR(1000) NOT NULL,
    [fecha] DATETIME2 NOT NULL,
    [valorEnCreditos] BIT NOT NULL,
    [horaInicio] DATETIME2 NOT NULL,
    [horaFin] DATETIME2 NOT NULL,
    [totalSellos] INT NOT NULL,
    [modalidad] NVARCHAR(1000) NOT NULL,
    [estado] NVARCHAR(1000) NOT NULL,
    [responsable] INT NOT NULL,
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
    [encargadoId] INT NOT NULL,
    [profesorId] INT NOT NULL,
    [usuarioEventosFavoritosId] INT NOT NULL,
    [usuarioEventosAsistidosId] INT NOT NULL,
    [estado] NVARCHAR(1000) NOT NULL,
    CONSTRAINT [Evento_pkey] PRIMARY KEY CLUSTERED ([id]),
    CONSTRAINT [Evento_solicitudId_key] UNIQUE NONCLUSTERED ([solicitudId])
);

-- AddForeignKey
ALTER TABLE [dbo].[Usuario] ADD CONSTRAINT [Usuario_idTipoUsuario_fkey] FOREIGN KEY ([idTipoUsuario]) REFERENCES [dbo].[TipoDeUsuario]([IdTipoUsuario]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[Solicitud] ADD CONSTRAINT [Solicitud_ubicacionId_fkey] FOREIGN KEY ([ubicacionId]) REFERENCES [dbo].[Ubicacion]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[Evento] ADD CONSTRAINT [Evento_usuarioEventosFavoritosId_fkey] FOREIGN KEY ([usuarioEventosFavoritosId]) REFERENCES [dbo].[Usuario]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[Evento] ADD CONSTRAINT [Evento_usuarioEventosAsistidosId_fkey] FOREIGN KEY ([usuarioEventosAsistidosId]) REFERENCES [dbo].[Usuario]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[Evento] ADD CONSTRAINT [Evento_solicitudId_fkey] FOREIGN KEY ([solicitudId]) REFERENCES [dbo].[Solicitud]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
