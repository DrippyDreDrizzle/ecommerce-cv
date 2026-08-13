import './MBTIBadge.css'

export default function MBTIBadge({ type = 'INTJ' }) {
  return (
    <div className="mbti-badge">
      <span className="mbti-badge-label">MBTI</span>
      <span className="mbti-badge-type">{type}</span>
    </div>
  )
}
