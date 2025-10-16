import { $, api } from './common.js'

// Hand-picked suggestions (cars, bikes, scooters) – shown if API is empty and mixed in for variety
const SUGGESTIONS = [
  // Cars
  { make: 'BMW', model: '3 Series', year: 2022, type: 'Car', pricePerDay: 95 },
  { make: 'Mercedes-Benz', model: 'C-Class', year: 2021, type: 'Car', pricePerDay: 110 },
  { make: 'Audi', model: 'A4', year: 2020, type: 'Car', pricePerDay: 99 },
  { make: 'Tesla', model: 'Model 3', year: 2022, type: 'Car', pricePerDay: 130 },
  { make: 'Toyota', model: 'Camry', year: 2021, type: 'Car', pricePerDay: 70 },
  // Bikes
  { make: 'Kawasaki', model: 'Ninja 400', year: 2021, type: 'Bike', pricePerDay: 65 },
  { make: 'Suzuki', model: 'Hayabusa', year: 2022, type: 'Bike', pricePerDay: 120 },
  { make: 'Royal Enfield', model: 'Classic 350', year: 2022, type: 'Bike', pricePerDay: 45 },
  { make: 'Yamaha', model: 'R15 V4', year: 2022, type: 'Bike', pricePerDay: 55 },
  // Scooters
  { make: 'Honda', model: 'Activa 6G', year: 2022, type: 'Scooter', pricePerDay: 20 },
  { make: 'Ola', model: 'S1 Pro', year: 2023, type: 'Scooter', pricePerDay: 25 },
  { make: 'TVS', model: 'Jupiter', year: 2021, type: 'Scooter', pricePerDay: 18 },
  { make: 'Bajaj', model: 'Chetak', year: 2023, type: 'Scooter', pricePerDay: 24 }
]

const LUXURY = [
  { make: 'Rolls‑Royce', model: 'Phantom', year: 2022, type: 'Luxury', pricePerDay: 800, imageUrl: 'https://images.unsplash.com/photo-1563720223185-11003d516935?q=80&w=1600&auto=format&fit=crop' },
  { make: 'Lamborghini', model: 'Aventador', year: 2021, type: 'Luxury', pricePerDay: 900, imageUrl: 'https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?q=80&w=1600&auto=format&fit=crop' },
  { make: 'Porsche', model: '911 Carrera', year: 2022, type: 'Luxury', pricePerDay: 650, imageUrl: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=1600&auto=format&fit=crop' },
  { make: 'Ferrari', model: '488 GTB', year: 2020, type: 'Luxury', pricePerDay: 950, imageUrl: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?q=80&w=1600&auto=format&fit=crop' },
  { make: 'Pagani', model: 'Huayra', year: 2019, type: 'Luxury', pricePerDay: 1500, imageUrl: 'https://images.unsplash.com/photo-1616353077842-8a2f6b2f25e6?q=80&w=1600&auto=format&fit=crop' },
  { make: 'Bentley', model: 'Continental GT', year: 2021, type: 'Luxury', pricePerDay: 700, imageUrl: 'https://images.unsplash.com/photo-1542282088-fe8426682b8f?q=80&w=1600&auto=format&fit=crop' },
  { make: 'Land Rover', model: 'Defender', year: 2023, type: 'Luxury', pricePerDay: 400, imageUrl: 'https://images.unsplash.com/photo-1610460688666-1e0f1d233a7a?q=80&w=1600&auto=format&fit=crop' }
]

function shuffle(arr) {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

const CURATED_IMAGES = {
  'bmw 3 series car': 'photo-1619767886558-efdc259cde1a',
  'mercedes-benz c-class car': 'photo-1549924231-f129b911e442',
  'audi a4 car': 'photo-1511919884226-fd3cad34687c',
  'tesla model 3 car': 'photo-1511391405990-2598c2fe917b',
  'toyota camry car': 'photo-1517677208171-0bc6725a3e60',
  'kawasaki ninja 400 motorcycle': 'photo-1518655048521-f130df041f66',
  'suzuki hayabusa motorcycle': 'photo-1503376780353-7e6692767b70',
  'royal enfield classic 350 motorcycle': 'photo-1542362567-b07e54358753',
  'yamaha r15 v4 motorcycle': 'photo-1558981806-ec527fa84c39',
  'honda activa 6g scooter': 'photo-1518128959339-72e8f0f12f39',
  'ola s1 pro scooter': 'photo-1606216794074-735e7b2f52ce',
  'tvs jupiter scooter': 'photo-1606216794640-2dfdcc3eaad2',
  'bajaj chetak scooter': 'photo-1585386959984-a4155223168f'
}

function getImage(v) {
  const typeKey = (v.type || '').toLowerCase()
  const kind = typeKey.includes('bike') ? 'motorcycle' : typeKey.includes('scooter') ? 'scooter' : 'car'
  const key = `${(v.make||'').toLowerCase()} ${(v.model||'').toLowerCase()} ${kind}`.replace(/\s+/g,' ').trim()
  const photoId = CURATED_IMAGES[key]
  if (photoId) return `https://images.unsplash.com/${photoId}?q=80&w=1600&auto=format&fit=crop`
  const q = encodeURIComponent(`${v.make || ''} ${v.model || ''} ${kind}`.trim())
  return `https://source.unsplash.com/800x600/?${q}`
}

function cardHtml(v, premium = false) {
  const img = getImage(v)
  return `
    <div class="card vehicle-card">
      ${premium ? '<span class="badge premium" style="position:absolute;top:10px;left:10px">Premium</span>' : ''}
      <img src="${img}" alt="${v.make || ''} ${v.model || ''}" />
      <span class="img-title">${v.make || ''} ${v.model || ''}</span>
      <div class="title">${v.year || ''} ${v.make || ''} ${v.model || ''}</div>
      <div class="meta">${v.type || 'Vehicle'} • ${(v.features || []).slice(0,3).join(' · ')}</div>
      <div class="price">$${v.pricePerDay || '--'}/day</div>
      <div style="margin-top:.5rem"><a class="btn primary" href="/payments/">Select</a></div>
    </div>`
}

function renderLuxury() {
  const grid = document.getElementById('luxury-grid')
  if (!grid) return
  grid.innerHTML = ''
  shuffle(LUXURY).slice(0, 8).forEach(v => {
    const wrapper = document.createElement('div')
    wrapper.innerHTML = cardHtml(v, true)
    grid.appendChild(wrapper.firstElementChild)
  })
}

async function renderVehicles() {
  const grid = document.getElementById('vehicles-grid')
  grid.innerHTML = 'Loading vehicles...'
  try {
    let data = []
    try { data = await api('/api/vehicles') } catch {}

    const merged = shuffle([
      ...SUGGESTIONS,
      ...(Array.isArray(data) ? data : [])
    ])

    const q = (document.getElementById('search').value || '').toLowerCase()
    const filtered = merged.filter((v) =>
      [v.make, v.model, v.type, ...(v.features || [])]
        .filter(Boolean)
        .join(' ')
        .toLowerCase()
        .includes(q)
    )
    grid.innerHTML = ''
    filtered.slice(0, 24).forEach(v => {
      const wrapper = document.createElement('div')
      wrapper.innerHTML = cardHtml(v)
      grid.appendChild(wrapper.firstElementChild)
    })
    if (!filtered.length) grid.innerHTML = '<div class="card">No vehicles found.</div>'
  } catch (e) {
    grid.innerHTML = `<div class="card">Failed to load vehicles.</div>`
  }
}

function main() {
  document.getElementById('search')?.addEventListener('input', renderVehicles)
  renderLuxury()
  renderVehicles()
}

document.addEventListener('DOMContentLoaded', main)
