// Only the selected card is composited at large scale. The full menu and the
// destination's DOM never change while this transform animation is running.
export const afterPaint = () => new Promise(resolve => {
  requestAnimationFrame(() => requestAnimationFrame(resolve))
})

export function createMenuFlight(shell, card, returning) {
  const bounds = shell.getBoundingClientRect()
  const rect = card.getBoundingClientRect()
  const overlay = document.createElement('div')
  overlay.className = `menu-flight${card.parentElement?.classList.contains('menu-card-wide') ? ' menu-card-wide' : ''}`
  overlay.setAttribute('aria-hidden', 'true')
  overlay.inert = true
  const copy = card.cloneNode(true)
  copy.removeAttribute('data-menu-id')
  copy.removeAttribute('id')
  copy.tabIndex = -1
  copy.classList.add('menu-flight-card')
  const left = rect.left - bounds.left
  const top = rect.top - bounds.top
  const scale = Math.max(bounds.width / rect.width, bounds.height / rect.height) * 1.2
  const near = `translate3d(${bounds.width / 2 - left - rect.width / 2}px, ${bounds.height / 2 - top - rect.height / 2}px, 0) scale(${scale})`
  const far = 'translate3d(0px, 0px, 0px) scale(1)'
  Object.assign(copy.style, {
    left: `${left}px`, top: `${top}px`, width: `${rect.width}px`, height: `${rect.height}px`,
    transform: returning ? near : far,
  })
  overlay.style.opacity = returning ? '0' : '1'
  overlay.append(copy)
  shell.append(overlay)
  const animations = new Set()
  const play = async (element, frames, options) => {
    const animation = element.animate(frames, { ...options, fill: 'forwards' })
    animations.add(animation)
    try {
      await animation.finished
      // Preserve the exact endpoint before releasing the animation's fill.
      Object.assign(element.style, frames[frames.length - 1])
    } finally {
      animation.cancel()
      animations.delete(animation)
    }
  }
  return {
    zoom: () => play(copy, [
      { transform: returning ? near : far },
      { transform: returning ? far : near },
    ], { duration: 820, easing: 'cubic-bezier(.45, 0, .2, 1)' }),
    reveal: () => play(overlay, [{ opacity: '0' }, { opacity: '1' }], { duration: 120, easing: 'ease-out' }),
    dissolve: () => play(overlay, [{ opacity: '1' }, { opacity: '0' }], { duration: 180, easing: 'ease-out' }),
    remove: () => {
      animations.forEach(animation => animation.cancel())
      animations.clear()
      overlay.remove()
    },
  }
}
