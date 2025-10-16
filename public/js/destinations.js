import { $, api } from './common.js'

function card(title, desc) {
  const el = document.createElement('div')
  el.className = 'card'
  el.innerHTML = `<div class="title">${title}</div><div class="meta">${desc || ''}</div>`
  return el
}

function main() {
  document.getElementById('form-suggest')?.addEventListener('submit', async (e) => {
    e.preventDefault()
    const loc = document.getElementById('location').value
    const month = document.getElementById('month').value
    const weather = document.getElementById('weather').value
    const interests = document.getElementById('interests').value
    const grid = document.getElementById('suggestions')
    grid.innerHTML = 'Fetching suggestions...'
    try {
      const [lat, lng] = (loc || '').split(',')
      const res = await api(`/api/suggestions?lat=${lat||''}&lng=${lng||''}&month=${encodeURIComponent(month)}&interests=${encodeURIComponent(interests)}&weather=${encodeURIComponent(weather)}`)
      grid.innerHTML = ''
      ;(res?.suggestions || []).forEach((s) => grid.appendChild(card(s.title || 'Suggestion', s.detail || s)))
      if (!grid.children.length) grid.appendChild(card('No suggestions', 'Try different inputs.'))
    } catch (e) {
      grid.innerHTML = ''
      grid.appendChild(card('Failed to get suggestions', 'Please try again.'))
    }
  })
}

document.addEventListener('DOMContentLoaded', main)
