// ── Sample Data ──────────────────────────────────────────────
const games = [
  { home: 'BOS', homeName: 'Celtics',  homeScore: 112,
    away: 'NYK', awayName: 'Knicks',   awayScore: 108,
    status: 'FINAL', quarter: '' },
  { home: 'LAL', homeName: 'Lakers',   homeScore: 97,
    away: 'GSW', awayName: 'Warriors', awayScore: 94,
    status: 'LIVE', quarter: 'Q3 4:22' },
  { home: 'MIA', homeName: 'Heat',     homeScore: 85,
    away: 'CHI', awayName: 'Bulls',    awayScore: 81,
    status: 'LIVE', quarter: 'Q2 1:55' },
  { home: 'DEN', homeName: 'Nuggets',  homeScore: 0,
    away: 'PHX', awayName: 'Suns',     awayScore: 0,
    status: '7:30 PM', quarter: '' },
  { home: 'MIL', homeName: 'Bucks',    homeScore: 0,
    away: 'PHI', awayName: '76ers',    awayScore: 0,
    status: '8:00 PM', quarter: '' },
  { home: 'SAC', homeName: 'Kings',    homeScore: 120,
    away: 'POR', awayName: 'Blazers',  awayScore: 115,
    status: 'FINAL', quarter: '' },
];

const eastStandings = [
  { team: 'Boston Celtics',         w: 52, l: 14 },
  { team: 'Milwaukee Bucks',        w: 46, l: 20 },
  { team: 'Philadelphia 76ers',     w: 44, l: 22 },
  { team: 'New York Knicks',        w: 42, l: 24 },
  { team: 'Cleveland Cavaliers',    w: 40, l: 26 },
  { team: 'Miami Heat',             w: 38, l: 28 },
  { team: 'Indiana Pacers',         w: 36, l: 30 },
  { team: 'Chicago Bulls',          w: 32, l: 34 },
  { team: 'Atlanta Hawks',          w: 28, l: 38 },
  { team: 'Charlotte Hornets',      w: 18, l: 48 },
];

const westStandings = [
  { team: 'Oklahoma City Thunder',  w: 54, l: 12 },
  { team: 'Denver Nuggets',         w: 48, l: 18 },
  { team: 'Minnesota Timberwolves', w: 46, l: 20 },
  { team: 'LA Clippers',            w: 42, l: 24 },
  { team: 'Phoenix Suns',           w: 40, l: 26 },
  { team: 'Dallas Mavericks',       w: 38, l: 28 },
  { team: 'Sacramento Kings',       w: 36, l: 30 },
  { team: 'Golden State Warriors',  w: 34, l: 32 },
  { team: 'LA Lakers',              w: 30, l: 36 },
  { team: 'Utah Jazz',              w: 14, l: 52 },
];

const players = [
  { name: 'Jayson Tatum',   team: 'BOS', pts: 28.4, reb: 8.1, ast: 4.7, emoji: '🏀' },
  { name: 'Nikola Jokić',   team: 'DEN', pts: 26.1, reb: 12.3, ast: 9.2, emoji: '🌟' },
  { name: 'Giannis A.',     team: 'MIL', pts: 31.2, reb: 11.8, ast: 5.9, emoji: '🦌' },
  { name: 'LeBron James',   team: 'LAL', pts: 24.8, reb: 7.4, ast: 8.3, emoji: '👑' },
  { name: 'Shai G.-A.',     team: 'OKC', pts: 30.1, reb: 5.5, ast: 6.4, emoji: '⚡' },
  { name: 'Joel Embiid',    team: 'PHI', pts: 34.7, reb: 11.0, ast: 5.6, emoji: '💪' },
  { name: 'Luka Dončić',    team: 'DAL', pts: 33.9, reb: 9.2, ast: 9.8, emoji: '🎯' },
  { name: 'Steph Curry',    team: 'GSW', pts: 27.0, reb: 4.5, ast: 6.3, emoji: '🔥' },
];

// ── Renderers ─────────────────────────────────────────────────
function renderScores() {
  const grid = document.getElementById('scores-grid');
  grid.innerHTML = games.map(g => {
    const isLive  = g.status === 'LIVE';
    const isFinal = g.status === 'FINAL';
    const showScore = isLive || isFinal;

    return `
      <div class="score-card">
        <div class="score-status${isLive ? ' live' : ''}">${g.status}</div>
        <div class="score-matchup">
          <div class="team">
            <span class="team-abbr">${g.away}</span>
            <span class="team-name">${g.awayName}</span>
          </div>
          <div class="score-divider">
            ${showScore
              ? `<div class="score-nums">
                   <span class="score-num">${g.awayScore}</span>
                   <span class="score-sep">–</span>
                   <span class="score-num">${g.homeScore}</span>
                 </div>
                 <div class="score-quarter">${g.quarter}</div>`
              : `<div style="color:#666;font-size:1.5rem;padding:.25rem 0">vs</div>`
            }
          </div>
          <div class="team">
            <span class="team-abbr">${g.home}</span>
            <span class="team-name">${g.homeName}</span>
          </div>
        </div>
      </div>`;
  }).join('');
}

function pct(w, l) { return (w / (w + l)).toFixed(3).replace(/^0/, ''); }

function renderStandings(data, tbodyId) {
  const tbody = document.getElementById(tbodyId);
  const playoffCutoff = 6; // top 6 make playoffs directly

  tbody.innerHTML = data.map((t, i) => {
    const cutClass = i === playoffCutoff ? 'playoff-cut' : '';
    return `
      <tr class="${cutClass}">
        <td>
          <div class="team-cell">
            <span class="rank">${i + 1}</span>
            ${t.team}
          </div>
        </td>
        <td><strong>${t.w}</strong></td>
        <td>${t.l}</td>
        <td class="pct">${pct(t.w, t.l)}</td>
      </tr>`;
  }).join('');
}

function renderPlayers() {
  const grid = document.getElementById('players-grid');
  grid.innerHTML = players.map(p => `
    <div class="player-card">
      <div class="player-avatar">${p.emoji}</div>
      <div class="player-name">${p.name}</div>
      <div class="player-team">${p.team}</div>
      <div class="player-stats">
        <div class="stat">
          <span class="stat-value">${p.pts}</span>
          <span class="stat-label">PTS</span>
        </div>
        <div class="stat">
          <span class="stat-value">${p.reb}</span>
          <span class="stat-label">REB</span>
        </div>
        <div class="stat">
          <span class="stat-value">${p.ast}</span>
          <span class="stat-label">AST</span>
        </div>
      </div>
    </div>`).join('');
}

// ── Init ───────────────────────────────────────────────────────
renderScores();
renderStandings(eastStandings, 'east-standings');
renderStandings(westStandings, 'west-standings');
renderPlayers();
