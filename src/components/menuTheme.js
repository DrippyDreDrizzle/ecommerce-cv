export const MENU_THEMES = {
  profile: { color: '#b58aff', motif: 'portrait' },
  skills: { color: '#6ee7ed', motif: 'radar' },
  record: { color: '#79aaff', motif: 'chart' },
  equipment: { color: '#a5b8ff', motif: 'tools' },
  travel: { color: '#68dfb1', motif: 'mountain' },
  hobbies: { color: '#f58bc7', motif: 'eyes' },
  awards: { color: '#ffbd6b', motif: 'star' },
  education: { color: '#e9d58b', motif: 'book' },
  contact: { color: '#d2b0ff', motif: 'letter' },
}
export const menuTheme = (id) => MENU_THEMES[id] || MENU_THEMES.profile
