export const ELEMENTS = [
  { id: 'fire', name: 'Fire', ja: '炎', symbol: '火', color: '#ff9752', description: 'Leave a little heat behind.', jaDescription: '炎の軌跡を描こう。' },
  { id: 'wind', name: 'Wind', ja: '風', symbol: '風', color: '#a4efd0', description: 'Move like a passing breeze.', jaDescription: 'そよ風のように。' },
  { id: 'water', name: 'Water', ja: '水', symbol: '水', color: '#6bc9ff', description: 'Find your own flow.', jaDescription: '自分だけの流れを。' },
  { id: 'lightning', name: 'Lightning', ja: '雷', symbol: '雷', color: '#e5c6ff', description: 'A spark with every move.', jaDescription: '動くたびに、ひらめきを。' },
  { id: 'ice', name: 'Ice', ja: '氷', symbol: '氷', color: '#bbf2ff', description: 'Leave a trail of frost.', jaDescription: '氷のきらめきを残そう。' },
  { id: 'earth', name: 'Earth', ja: '大地', symbol: '土', color: '#d6af7a', description: 'A little force of nature.', jaDescription: '大地の力を、その手に。' },
]
export const ELEMENT_STORAGE_KEY = 'andre-cursor-element-v1'
export function readElement() {
  try {
    const saved = localStorage.getItem(ELEMENT_STORAGE_KEY)
    if (saved === 'off' || ELEMENTS.some(item => item.id === saved)) return saved
  } catch { /* Storage may be disabled; the selector still works. */ }
  return 'fire'
}
