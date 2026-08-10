import './SportsSection.css'

export default function SportsSection({ intro, items }) {
  return (
    <div className="sports-section">
      <p className="panel-note">{intro}</p>
      <ul className="sports-list">
        {items.map((item) => (
          <li key={item} className="sports-item">
            {item}
          </li>
        ))}
      </ul>
    </div>
  )
}
