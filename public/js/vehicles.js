import { $, api } from './common.js'

// Hand-picked suggestions (cars and bikes)
const SUGGESTIONS = [
  { make: 'BMW', model: '3 Series', year: 2022, type: 'Car', pricePerDay: 95, imageUrl: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=400&h=300&fit=crop' },
  { make: 'Mercedes-Benz', model: 'C-Class', year: 2021, type: 'Car', pricePerDay: 110, imageUrl: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=400&h=300&fit=crop' },
  { make: 'Audi', model: 'A4', year: 2020, type: 'Car', pricePerDay: 99, imageUrl: 'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=400&h=300&fit=crop' },
  { make: 'Tesla', model: 'Model 3', year: 2022, type: 'Car', pricePerDay: 130, imageUrl: 'https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=400&h=300&fit=crop' },
  { make: 'Toyota', model: 'Camry', year: 2021, type: 'Car', pricePerDay: 70, imageUrl: 'https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=400&h=300&fit=crop' },
  { make: 'Ford', model: 'Mustang', year: 2023, type: 'Car', pricePerDay: 120, imageUrl: 'https://cdn.pixabay.com/photo/2018/11/17/18/58/shelby-3821716_1280.jpg' },
  // Affordable bikes
  { make: 'Honda', model: 'CBR500R', year: 2023, type: 'Bike', pricePerDay: 45, imageUrl: 'https://images.unsplash.com/photo-1558981806-ec527fa84c39?w=400&h=300&fit=crop' },
  { make: 'Yamaha', model: 'MT-07', year: 2022, type: 'Bike', pricePerDay: 50, imageUrl: 'https://cdn.pixabay.com/photo/2021/01/06/12/32/yamaha-5894293_1280.jpg' },
  { make: 'Kawasaki', model: 'Z400', year: 2023, type: 'Bike', pricePerDay: 70, imageUrl: 'https://cdn.pixabay.com/photo/2017/10/05/14/38/motorcycle-2819604_1280.jpg' },
  { make: 'BMW', model: 'G310R', year: 2022, type: 'Bike', pricePerDay: 42, imageUrl: 'https://cdn.pixabay.com/photo/2017/08/21/15/47/bike-2665810_960_720.jpg' }
]

const LUXURY = [
  { make: 'Rolls-Royce', model: 'Phantom', year: 2022, type: 'Luxury', pricePerDay: 800, imageUrl: 'https://images.unsplash.com/photo-1631295868223-63265b40d9e4?w=400&h=300&fit=crop' },
  { make: 'Lamborghini', model: 'Aventador', year: 2021, type: 'Luxury', pricePerDay: 900, imageUrl: 'https://images.unsplash.com/photo-1621135802920-133df287f89c?w=400&h=300&fit=crop' },
  { make: 'Porsche', model: '911 Carrera', year: 2022, type: 'Luxury', pricePerDay: 650, imageUrl: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=400&h=300&fit=crop' },
  { make: 'Ferrari', model: '488 GTB', year: 2020, type: 'Luxury', pricePerDay: 950, imageUrl: 'https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=400&h=300&fit=crop' },
  { make: 'bugatti ', model: 'cheron', year: 2019, type: 'Luxury', pricePerDay: 1500, imageUrl: 'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=400&h=300&fit=crop' },
  { make: 'Bentley', model: 'Continental GT', year: 2021, type: 'Luxury', pricePerDay: 700, imageUrl: 'https://cdn.pixabay.com/photo/2014/11/24/23/48/bentley-544739_1280.jpg' },
  { make: 'Land Rover', model: 'Defender', year: 2023, type: 'Luxury', pricePerDay: 400, imageUrl: 'https://cdn.pixabay.com/photo/2017/04/20/10/37/range-rover-2245376_1280.jpg' },
  // Luxury bikes
  { make: 'Kawasaki', model: 'Ninja H2', year: 2023, type: 'Luxury Bike', pricePerDay: 250, imageUrl: 'https://cdn.pixabay.com/photo/2021/04/19/05/12/kawasaki-ninja-h2r-6190256_1280.jpg' },
  { make: 'Suzuki', model: 'Hayabusa', year: 2022, type: 'Luxury Bike', pricePerDay: 220, imageUrl: 'https://cdn.pixabay.com/photo/2015/03/15/05/28/suzuki-674060_1280.jpg' },
  { make: 'BMW', model: 'S1000RR', year: 2023, type: 'Luxury Bike', pricePerDay: 280, imageUrl: 'https://cdn.pixabay.com/photo/2017/07/09/12/03/bmw-2486777_1280.jpg' },
  { make: 'Ducati', model: 'Panigale V4', year: 2023, type: 'Luxury Bike', pricePerDay: 300, imageUrl: 'https://cdn.pixabay.com/photo/2017/04/19/14/35/ducati-2242487_1280.jpg' },
  { make: 'Yamaha', model: 'YZF-R1', year: 2022, type: 'Luxury Bike', pricePerDay: 240, imageUrl: 'https://cdn.pixabay.com/photo/2020/04/10/14/58/motorcycle-5026152_1280.jpg' }
]

function shuffle(arr) {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

function cardHtml(v, premium = false) {
  const img = v.imageUrl || 'https://via.placeholder.com/400x300/333/fff?text=Vehicle'
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

function getParams() {
  const u = new URL(location.href)
  return {
    q: (u.searchParams.get('q') || '').toLowerCase(),
    type: (u.searchParams.get('type') || '').toLowerCase()
  }
}

async function renderVehicles() {
  const grid = document.getElementById('vehicles-grid')
  grid.innerHTML = 'Loading vehicles...'
  try {
    let data = []
    try { data = await api('/api/vehicles') } catch {}

    // If data from API doesn't have imageUrl, add placeholder
    const normalized = (Array.isArray(data) ? data : []).map(v => ({
      ...v,
      imageUrl: v.imageUrl || 'https://via.placeholder.com/400x300/333/fff?text=Vehicle'
    }))

    const merged = shuffle([
      ...SUGGESTIONS,
      ...normalized
    ])

    const { q, type } = getParams()
    if (q) document.getElementById('search').value = q

    const filtered = merged.filter((v) => {
      const text = [v.make, v.model, v.type, ...(v.features || [])]
        .filter(Boolean)
        .join(' ')
        .toLowerCase()
      const okQ = !q || text.includes(q)
      const okType = !type || (v.type || '').toLowerCase().includes(type)
      return okQ && okType
    })

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
  const doSearch = () => renderVehicles()
  document.getElementById('search')?.addEventListener('input', doSearch)
  document.getElementById('btn-search')?.addEventListener('click', doSearch)
  renderLuxury()
  renderVehicles()
}

document.addEventListener('DOMContentLoaded', main)

