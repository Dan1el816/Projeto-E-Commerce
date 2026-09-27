import React from "react";

/**
 * Dashboard.jsx
 * Reaproveita a identidade visual do design system fornecido:
 * fundo creme, cartões brancos, acento terracota, formas orgânicas,
 * Space Grotesk para títulos/números e DM Sans para o corpo do texto.
 */

const stats = [
  { label: "Receita no mês", value: "R$ 48.320", delta: "+12,4%", up: true },
  { label: "Novos clientes", value: "37", delta: "+5", up: true },
  { label: "Projetos ativos", value: "14", delta: "-2", up: false },
  { label: "Taxa de conversão", value: "3,8%", delta: "+0,6pp", up: true },
];

const chartData = [
  { label: "Seg", value: 38 },
  { label: "Ter", value: 52 },
  { label: "Qua", value: 44 },
  { label: "Qui", value: 68 },
  { label: "Sex", value: 74 },
  { label: "Sáb", value: 40 },
  { label: "Dom", value: 28 },
];

const activity = [
  { name: "Estúdio Cerrado", detail: "Novo projeto criado", time: "há 12 min" },
  { name: "Marina Alves", detail: "Fatura #1042 paga", time: "há 1 h" },
  { name: "Verde Café", detail: "Proposta enviada", time: "há 3 h" },
  { name: "João Petri", detail: "Reunião agendada", time: "ontem" },
];

const nav = [
  { label: "Visão geral", active: true },
  { label: "Projetos" },
  { label: "Clientes" },
  { label: "Relatórios" },
  { label: "Configurações" },
];

export default function Dashboard() {
  const maxValue = Math.max(...chartData.map((d) => d.value));

  return (
    <div className="dash">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;700&family=Space+Grotesk:wght@500;600;700&display=swap');

        :root {
          --ink: #17221d;
          --muted: #66736b;
          --paper: #f5f4ef;
          --card: #ffffff;
          --accent: #e76f51;
          --accent-dark: #bd4f36;
          --line: #dfe4dc;
          --sage: #c9d9c1;
          --mustard: #e9c46a;
        }

        .dash * { box-sizing: border-box; }

        .dash {
          min-height: 100vh;
          color: var(--ink);
          background: var(--paper);
          font-family: 'DM Sans', sans-serif;
          display: grid;
          grid-template-columns: 240px 1fr;
        }

        /* Sidebar */
        .dash-sidebar {
          padding: 28px 22px;
          border-right: 1px solid var(--line);
          display: flex;
          flex-direction: column;
          gap: 36px;
        }

        .dash-brand {
          font-family: 'Space Grotesk', sans-serif;
          font-size: 1.3rem;
          font-weight: 700;
        }

        .dash-nav { display: flex; flex-direction: column; gap: 4px; }

        .dash-nav a {
          padding: 10px 12px;
          color: var(--muted);
          text-decoration: none;
          font-weight: 500;
          border-radius: 6px;
        }

        .dash-nav a.active {
          color: var(--ink);
          background: #ecebe4;
          font-weight: 700;
        }

        .dash-nav a:hover { color: var(--accent-dark); }

        .dash-sidebar-shape {
          margin-top: auto;
          width: 100%;
          aspect-ratio: 1;
          background: var(--sage);
          border-radius: 48% 52% 36% 64% / 42% 38% 62% 58%;
          transform: rotate(-8deg);
          box-shadow: 16px 14px 0 var(--mustard);
        }

        /* Main content */
        .dash-main { padding: 32px 40px 60px; max-width: 1180px; }

        .dash-topbar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 32px;
        }

        .dash-topbar h1 {
          margin: 0;
          font-family: 'Space Grotesk', sans-serif;
          font-size: 1.9rem;
        }

        .dash-search {
          border: 1px solid var(--line);
          background: var(--card);
          padding: 10px 14px;
          font: inherit;
          width: 240px;
        }

        .dash-search:focus { outline: 2px solid var(--accent); outline-offset: 1px; }

        .dash-user {
          width: 38px;
          height: 38px;
          border-radius: 50%;
          background: var(--accent);
          color: #fff;
          display: grid;
          place-items: center;
          font-weight: 700;
          margin-left: 16px;
        }

        .dash-topbar-right { display: flex; align-items: center; }

        /* Stat cards */
        .dash-stats {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 18px;
          margin-bottom: 28px;
        }

        .dash-card {
          background: var(--card);
          padding: 20px;
          box-shadow: 0 10px 30px rgba(23, 34, 29, .06);
        }

        .dash-stat-label {
          margin: 0 0 10px;
          color: var(--muted);
          font-size: .85rem;
        }

        .dash-stat-value {
          font-family: 'Space Grotesk', sans-serif;
          font-size: 1.7rem;
          font-weight: 700;
        }

        .dash-stat-delta {
          margin-top: 8px;
          font-size: .82rem;
          font-weight: 700;
        }

        .dash-stat-delta.up { color: #4a7a5b; }
        .dash-stat-delta.down { color: var(--accent-dark); }

        /* Content grid */
        .dash-grid {
          display: grid;
          grid-template-columns: 1.4fr 1fr;
          gap: 18px;
        }

        .dash-card h2 {
          margin: 0 0 20px;
          font-family: 'Space Grotesk', sans-serif;
          font-size: 1.1rem;
        }

        .dash-chart {
          display: flex;
          align-items: flex-end;
          gap: 14px;
          height: 180px;
        }

        .dash-bar-wrap {
          flex: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 8px;
          height: 100%;
          justify-content: flex-end;
        }

        .dash-bar {
          width: 100%;
          background: var(--accent);
          border-radius: 3px 3px 0 0;
        }

        .dash-bar-label { color: var(--muted); font-size: .78rem; }

        .dash-activity { display: flex; flex-direction: column; gap: 16px; }

        .dash-activity-item {
          display: flex;
          justify-content: space-between;
          gap: 10px;
          padding-bottom: 14px;
          border-bottom: 1px solid var(--line);
        }

        .dash-activity-item:last-child { border-bottom: none; padding-bottom: 0; }

        .dash-activity-name { font-weight: 700; margin: 0; }
        .dash-activity-detail { margin: 2px 0 0; color: var(--muted); font-size: .88rem; }
        .dash-activity-time { color: var(--muted); font-size: .8rem; white-space: nowrap; }

        @media (max-width: 900px) {
          .dash { grid-template-columns: 1fr; }
          .dash-sidebar { flex-direction: row; align-items: center; border-right: none; border-bottom: 1px solid var(--line); }
          .dash-sidebar-shape { display: none; }
          .dash-stats { grid-template-columns: repeat(2, 1fr); }
          .dash-grid { grid-template-columns: 1fr; }
          .dash-main { padding: 24px 20px 48px; }
        }
      `}</style>

      <aside className="dash-sidebar">
        <div className="dash-brand">Meadow</div>
        <nav className="dash-nav">
          {nav.map((item) => (
            <a key={item.label} href="#" className={item.active ? "active" : ""}>
              {item.label}
            </a>
          ))}
        </nav>
        <div className="dash-sidebar-shape" />
      </aside>

      <main className="dash-main">
        <div className="dash-topbar">
          <h1>Visão geral</h1>
          <div className="dash-topbar-right">
            <input className="dash-search" type="text" placeholder="Buscar..." />
            <div className="dash-user">MA</div>
          </div>
        </div>

        <section className="dash-stats">
          {stats.map((s) => (
            <div className="dash-card" key={s.label}>
              <p className="dash-stat-label">{s.label}</p>
              <div className="dash-stat-value">{s.value}</div>
              <div className={`dash-stat-delta ${s.up ? "up" : "down"}`}>{s.delta}</div>
            </div>
          ))}
        </section>

        <section className="dash-grid">
          <div className="dash-card">
            <h2>Movimento na semana</h2>
            <div className="dash-chart">
              {chartData.map((d) => (
                <div className="dash-bar-wrap" key={d.label}>
                  <div
                    className="dash-bar"
                    style={{ height: `${(d.value / maxValue) * 100}%` }}
                  />
                  <span className="dash-bar-label">{d.label}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="dash-card">
            <h2>Atividade recente</h2>
            <div className="dash-activity">
              {activity.map((a) => (
                <div className="dash-activity-item" key={a.name + a.time}>
                  <div>
                    <p className="dash-activity-name">{a.name}</p>
                    <p className="dash-activity-detail">{a.detail}</p>
                  </div>
                  <span className="dash-activity-time">{a.time}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}