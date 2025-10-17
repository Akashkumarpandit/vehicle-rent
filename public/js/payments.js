import { $, api } from './common.js'

function goToVehicles(q = '', type = '') {
  const params = new URLSearchParams()
  if (q) params.set('q', q)
  if (type) params.set('type', type)
  location.href = `/vehicles/?${params.toString()}`
}

function main() {
  document.getElementById('btn-add-card')?.addEventListener('click', async () => {
    const btn = document.getElementById('btn-add-card')
    btn.disabled = true
    btn.textContent = 'Adding...'
    try {
      // Placeholder – you can wire Stripe Elements later
      await api('/api/payments/create-intent', { method: 'POST', body: JSON.stringify({ amount: 1000, currency: 'usd' }) })
      alert('Payment method saved (demo).')
    } catch (e) {
      alert('Failed to add card (demo).')
    } finally {
      btn.disabled = false
      btn.textContent = 'Add Card'
    }
  })

  document.getElementById('global-search-btn')?.addEventListener('click', () => {
    goToVehicles(document.getElementById('global-search').value)
  })
  document.querySelectorAll('.chip[data-type]')?.forEach(chip =>
    chip.addEventListener('click', (e) => { e.preventDefault(); goToVehicles('', chip.dataset.type) })
  )
}

document.addEventListener('DOMContentLoaded', main)
