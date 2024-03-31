using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace EventosUABC.Models;

public partial class EventosUabcContext : DbContext
{
    public EventosUabcContext()
    {
    }

    public EventosUabcContext(DbContextOptions<EventosUabcContext> options)
        : base(options)
    {
    }

    public virtual DbSet<Evento> Eventos { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        if (!optionsBuilder.IsConfigured)
        {
        }
        //#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see https://go.microsoft.com/fwlink/?LinkId=723263.
        //        => optionsBuilder.UseSqlServer("server=YAYODIAZ\SQLEXPRESS; database=EventosUABC; integrated security=true; TrustServerCertificate=Yes");
    }
    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Evento>(entity =>
        {
            entity.HasKey(e => e.IdEvento);

            entity.Property(e => e.IdEvento)
                .ValueGeneratedNever()
                .HasColumnName("idEvento");
            entity.Property(e => e.Nombre)
                .HasMaxLength(30)
                .IsUnicode(false);
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
