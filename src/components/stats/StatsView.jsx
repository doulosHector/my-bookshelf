import { useMemo } from "react";
import { StatCard } from "./StatCard";
import { HighlightCard } from "./HighlightCard";
import { BarChart } from "../ui/BarChart";
import { EmptyState } from "../ui/EmptyState";
import { Stars } from "../ui/Stars";
import { useTheme } from "../../hooks/useTheme";
import { spineColor } from "../../utils/spineColor";
import { pluralize } from "../../utils/book";

const gridStyle = (minColumnWidth) => ({
  display: "grid",
  gridTemplateColumns: `repeat(auto-fit, minmax(${minColumnWidth}px, 1fr))`,
  gap: 12,
});

export function StatsView({ stats }) {
  const { t, styles } = useTheme();

  const yearItems = useMemo(
    () => stats.porAnio.map(([year, count]) => ({ label: year, value: count })),
    [stats.porAnio],
  );
  const genreItems = useMemo(
    () => stats.porGenero.map(([genre, count]) => ({
      label: genre,
      value: count,
      color: spineColor(genre),
    })),
    [stats.porGenero],
  );

  if (stats.total === 0) {
    return (
      <EmptyState
        title="Aún no hay datos"
        description="Registra libros y marca algunos como «Leído» para ver tus estadísticas."
      />
    );
  }

  return (
    <div style={{ display: "grid", gap: 14 }}>
      <div style={gridStyle(150)}>
        <StatCard label="Leídos este año" value={stats.esteAnio} />
        <StatCard label="Total leídos" value={stats.totalLeidos} />
        <StatCard label="En el librero" value={stats.total} />
        <StatCard
          label="Ritmo mensual"
          value={stats.ritmo}
          hint={
            stats.proyeccion
              ? `≈ ${stats.proyeccion} al año a este paso`
              : "Sin lecturas este año"
          }
        />
      </div>

      {yearItems.length > 0 && (
        <section style={{ ...styles.card, padding: 20 }}>
          <h3 className="serif" style={{ margin: "0 0 14px", fontSize: 18 }}>
            Libros leídos por año
          </h3>
          <BarChart items={yearItems} />
          <p style={{ fontSize: 12, color: t.muted, margin: "10px 0 0" }}>
            Se cuenta según la fecha de fin de lectura de los libros marcados como «Leído».
          </p>
        </section>
      )}

      {genreItems.length > 0 && (
        <section style={{ ...styles.card, padding: 20 }}>
          <h3 className="serif" style={{ margin: "0 0 14px", fontSize: 18 }}>
            Géneros más leídos
          </h3>
          <BarChart items={genreItems} labelWidth={110} />
        </section>
      )}

      <div style={gridStyle(230)}>
        {stats.generoTop && (
          <HighlightCard
            label="Género favorito"
            title={stats.generoTop[0]}
            titleColor={spineColor(stats.generoTop[0])}
          >
            <div style={{ fontSize: 13, color: t.muted }}>
              {stats.generoTop[1]} {pluralize(stats.generoTop[1], "libro", "libros")}{" "}
              {pluralize(stats.generoTop[1], "leído", "leídos")}
            </div>
          </HighlightCard>
        )}

        {stats.masReleido && (
          <HighlightCard label="Más releído" title={stats.masReleido.titulo}>
            <div style={{ fontSize: 13, color: t.muted }}>
              {stats.masReleido.vecesLeido} lecturas
            </div>
          </HighlightCard>
        )}

        {stats.mejorCalificado && (
          <HighlightCard label="Mejor calificado" title={stats.mejorCalificado.titulo}>
            <Stars value={stats.mejorCalificado.calificacion} size={15} />
          </HighlightCard>
        )}
      </div>
    </div>
  );
}
