import { useMemo } from "react";
import { StatCard } from "./StatCard";
import { HighlightCard } from "./HighlightCard";
import { ChartSection } from "./ChartSection";
import { TopBooks } from "./TopBooks";
import { PendingPile } from "./PendingPile";
import { EmptyState } from "../ui/EmptyState";
import { useTheme } from "../../hooks/useTheme";
import { spineColor } from "../../utils/spineColor";
import { pluralize } from "../../utils/book";

/**
 * `min(…, 100%)` keeps the column from demanding more room than the screen has:
 * below the minimum the track gives up and becomes one full-width column.
 */
const gridStyle = (minColumnWidth) => ({
  display: "grid",
  gridTemplateColumns: `repeat(auto-fit, minmax(min(${minColumnWidth}px, 100%), 1fr))`,
  gap: 12,
});

/**
 * A single column that ignores how wide its contents would like to be. Without
 * the explicit `minmax(0, …)` the track is `auto`, and one long book title with
 * `white-space: nowrap` inside stretched every card on the tab past the screen.
 */
const columnStyle = { display: "grid", gridTemplateColumns: "minmax(0, 1fr)", gap: 14 };

const note = (...parts) => parts.filter(Boolean).join(" ") || undefined;

export function StatsView({ stats }) {
  const { t } = useTheme();

  const yearItems = useMemo(
    () => stats.porAnio.map(([year, count]) => ({ label: year, value: count })),
    [stats.porAnio],
  );
  const monthItems = useMemo(
    () => stats.porMes.map(([month, count]) => ({ label: month, value: count })),
    [stats.porMes],
  );
  const ratingItems = useMemo(
    () => stats.porCalificacion.map(([stars, count]) => ({ label: "★".repeat(stars), value: count })),
    [stats.porCalificacion],
  );
  const genreItems = useMemo(
    () =>
      stats.porGenero.map(([genre, count]) => ({
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

  const skippedDates =
    stats.sinFecha > 0
      ? `${stats.sinFecha} ${pluralize(stats.sinFecha, "libro leído", "libros leídos")} sin fecha no ${pluralize(stats.sinFecha, "aparece", "aparecen")} aquí.`
      : "";

  return (
    <div style={columnStyle}>
      <div className="stat-grid">
        <StatCard label="Leídos este año" value={stats.esteAnio} />
        <StatCard
          label="Total leídos"
          value={stats.totalLeidos}
          hint={
            stats.lecturas > stats.totalLeidos
              ? `${stats.lecturas} lecturas con las relecturas`
              : undefined
          }
        />
        <StatCard label="En el librero" value={stats.total} />
        <StatCard
          label="Calificación promedio"
          value={stats.promedio > 0 ? stats.promedio.toFixed(1) : "—"}
          hint={
            stats.calificados > 0
              ? `De ${stats.calificados} ${pluralize(stats.calificados, "libro calificado", "libros calificados")}`
              : "Todavía sin calificaciones"
          }
        />
        <StatCard
          label="Ritmo mensual"
          value={stats.ritmo}
          hint={
            stats.ultimos12 > 0
              ? `${stats.ultimos12} en los últimos 12 meses`
              : "Sin lecturas en el último año"
          }
        />
      </div>

      {stats.top.length > 0 && <TopBooks books={stats.top} />}

      {yearItems.length > 0 && (
        <ChartSection
          title="Libros leídos por año"
          items={yearItems}
          note={note(
            "Se cuenta según la fecha de fin de lectura de los libros marcados como «Leído».",
            skippedDates,
          )}
        />
      )}

      {monthItems.some((item) => item.value > 0) && (
        <ChartSection
          title={`Libros leídos en ${stats.anioActual}`}
          items={monthItems}
          note={note("De enero al mes en curso.", skippedDates)}
        />
      )}

      {stats.calificados > 0 && (
        <ChartSection
          title="Cómo calificas"
          items={ratingItems}
          labelWidth={74}
          note={note(
            stats.sinCalificar > 0
              ? `${stats.sinCalificar} ${pluralize(stats.sinCalificar, "libro", "libros")} sin calificar no ${pluralize(stats.sinCalificar, "aparece", "aparecen")} aquí.`
              : "",
          )}
        />
      )}

      {genreItems.length > 0 && (
        <ChartSection
          title="Géneros más leídos"
          items={genreItems}
          labelWidth={110}
          note={note(
            stats.generosOcultos > 0
              ? `Se muestran los ${genreItems.length} primeros de ${genreItems.length + stats.generosOcultos} géneros.`
              : "",
            stats.sinGenero > 0
              ? `${stats.sinGenero} ${pluralize(stats.sinGenero, "libro leído", "libros leídos")} sin género no ${pluralize(stats.sinGenero, "aparece", "aparecen")} aquí.`
              : "",
          )}
        />
      )}

      {stats.pendientes > 0 && (
        <PendingPile
          count={stats.pendientes}
          months={stats.mesesPendientes}
          oldest={stats.pendientesAntiguos}
        />
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

        {stats.abandonados > 0 && (
          <HighlightCard label="Abandonados" title={String(stats.abandonados)}>
            <div style={{ fontSize: 13, color: t.muted }}>
              {Math.round(
                (stats.abandonados / (stats.totalLeidos + stats.abandonados)) * 100,
              )}
              % de los libros que empezaste
            </div>
          </HighlightCard>
        )}
      </div>
    </div>
  );
}
