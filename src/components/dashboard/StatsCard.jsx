import '../../styles/dashboard/StatsCard.css'

// Mini sparkline using SVG
function Sparkline({ color = '#16a34a', up = true }) {
  const points = up
    ? '0,20 15,16 30,18 45,10 60,12 75,6 90,8 105,2'
    : '0,4 15,8 30,6 45,12 60,10 75,16 90,14 105,20'

  return (
    <svg width="105" height="24" viewBox="0 0 105 24" fill="none" className="sparkline">
      <polyline
        points={points}
        stroke={color}
        strokeWidth="1.8"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function StatsCard({ icon, label, value, subtitle, trend, trendLabel }) {
  const isPositive = trend >= 0
  const trendColor = isPositive ? '#16a34a' : '#dc2626'

  return (
    <div className="stats-card">
      <div className="stats-card__top">
        <span className="stats-card__label">{label}</span>
        <div className="stats-card__icon-wrap">{icon}</div>
      </div>

      <div className="stats-card__mid">
        <p className="stats-card__value">{value}</p>
        <Sparkline color={trendColor} up={isPositive} />
      </div>

      <div className="stats-card__bottom">
        <span
          className={`stats-card__trend ${isPositive ? 'stats-card__trend--up' : 'stats-card__trend--down'}`}
        >
          {isPositive ? '↑' : '↓'} {Math.abs(trend)}%
        </span>
        <span className="stats-card__period">{subtitle}</span>
      </div>
    </div>
  )
}

export default StatsCard