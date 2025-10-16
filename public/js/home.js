import { api } from './common.js'

function goToVehicles(q = '', type = '') {
  const params = new URLSearchParams()
  if (q) params.set('q', q)
  if (type) params.set('type', type)
  location.href = `/vehicles/?${params.toString()}`
}

function card(v) {
  const el = document.createElement('div')
  el.className = 'card vehicle-card'
  const img = `https://source.unsplash.com/800x600/?${encodeURIComponent(`${v.make} ${v.model} ${(v.type||'car').toLowerCase()}`)}`
  el.innerHTML = `
    <img src="${img}" alt="${v.make} ${v.model}" />
    <div class="title">${v.year || ''} ${v.make} ${v.model}</div>
    <div class="meta">${v.type} • $${v.pricePerDay || '--'}/day</div>
    <div style="margin-top:.5rem"><a class="btn primary" href="/vehicles/">Explore</a></div>
  `
  return el
}

async function main() {
  document.getElementById('hero-search').addEventListener('click', () => {
    const q = document.getElementById('hero-q').value
    goToVehicles(q)
  })

  document.querySelectorAll('.chip[data-type]').forEach(chip =>
    chip.addEventListener('click', (e) => { e.preventDefault(); goToVehicles('', chip.dataset.type) })
  )

  const grid = document.getElementById('featured-grid')
  try {
    const items = await api('/api/vehicles')
    grid.innerHTML = ''
    ;(items || []).slice(0, 8).forEach(v => grid.appendChild(card(v)))
  } catch {
    grid.innerHTML = ''
  }
}

document.addEventListener('DOMContentLoaded', main)
