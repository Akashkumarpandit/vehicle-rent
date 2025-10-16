// Simple SPA for login, signup, and vehicle selection
import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.13.1/firebase-app.js'
import { getAuth, onAuthStateChanged, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, getIdToken } from 'https://www.gstatic.com/firebasejs/10.13.1/firebase-auth.js'

const $ = (sel) => document.querySelector(sel)
const show = (el) => (el.style.display = '')
const hide = (el) => (el.style.display = 'none')
const views = ['vehicles', 'login', 'signup']

let authEnabled = false
let auth

function initAuth() {
  if (window.FIREBASE_CONFIG) {
    const app = initializeApp(window.FIREBASE_CONFIG)
    auth = getAuth(app)
    authEnabled = true
  }
}

function setBanner(msg) {
  const banner = $('#banner')
  if (!msg) return hide(banner)
  banner.textContent = msg
  show(banner)
}

async function api(path, opts = {}) {
  const headers = { 'Content-Type': 'application/json', ...(opts.headers || {}) }
  if (authEnabled && auth?.currentUser) {
    try {
      const token = await getIdToken(auth.currentUser, true)
      headers['Authorization'] = `Bearer ${token}`
    } catch {}
  }
  const res = await fetch(path, { ...opts, headers })
  if (!res.ok) throw new Error(`Request failed: ${res.status}`)
  return res.json()
}

async function renderVehicles() {
  const grid = $('#vehicles-grid')
  grid.innerHTML = 'Loading vehicles...'
  try {
    const data = await api('/vehicles')
    const q = ($('#search').value || '').toLowerCase()
    const filtered = data.filter((v) =>
      [v.make, v.model, v.type, ...(v.features || [])]
        .filter(Boolean)
        .join(' ')
        .toLowerCase()
        .includes(q)
    )
    grid.innerHTML = ''
    for (const v of filtered) {
      const card = document.createElement('div')
      card.className = 'card vehicle-card'
      card.innerHTML = `
        <img src="${v.imageUrl || 'https://images.unsplash.com/photo-1549923746-c502d488b3ea?w=1200&q=80&auto=format&fit=crop'}" alt="${v.make || ''} ${v.model || ''}" />
        <div class="title">${v.year || ''} ${v.make || ''} ${v.model || ''}</div>
        <div class="meta">${v.type || 'Vehicle'} • ${(v.features || []).slice(0,3).join(' · ')}</div>
        <div class="price">$${v.pricePerDay || '--'}/day</div>
        <div style="margin-top:.5rem"><button class="btn">Select</button></div>
      `
      grid.appendChild(card)
    }
    if (!filtered.length) grid.innerHTML = '<div class="card">No vehicles found.</div>'
  } catch (e) {
    grid.innerHTML = `<div class="card">Failed to load vehicles.</div>`
  }
}

function updateNav(user) {
  const navLogin = $('#nav-login')
  const navSignup = $('#nav-signup')
  const btnLogout = $('#btn-logout')
  if (user) {
    hide(navLogin)
    hide(navSignup)
    show(btnLogout)
  } else {
    show(navLogin)
    show(navSignup)
    hide(btnLogout)
  }
}

function route() {
  const hash = location.hash.replace('#/', '') || 'vehicles'
  for (const v of views) hide(document.getElementById(`view-${v}`))
  const active = document.getElementById(`view-${hash}`)
  if (active) show(active)
  if (hash === 'vehicles') renderVehicles()
}

function bindAuthUI() {
  $('#form-login')?.addEventListener('submit', async (e) => {
    e.preventDefault()
    const email = $('#login-email').value
    const password = $('#login-password').value
    try {
      if (!authEnabled) throw new Error('Auth not configured')
      await signInWithEmailAndPassword(auth, email, password)
      location.hash = '#/vehicles'
    } catch (err) {
      setBanner(err.message || 'Login failed')
    }
  })

  $('#form-signup')?.addEventListener('submit', async (e) => {
    e.preventDefault()
    const email = $('#signup-email').value
    const password = $('#signup-password').value
    try {
      if (!authEnabled) throw new Error('Auth not configured')
      await createUserWithEmailAndPassword(auth, email, password)
      location.hash = '#/vehicles'
    } catch (err) {
      setBanner(err.message || 'Sign up failed')
    }
  })

  $('#btn-logout')?.addEventListener('click', async () => {
    try {
      if (authEnabled) await signOut(auth)
    } catch {}
  })
}

function main() {
  initAuth()
  bindAuthUI()

  window.addEventListener('hashchange', route)
  $('#search')?.addEventListener('input', () => renderVehicles())

  if (authEnabled) onAuthStateChanged(auth, (user) => updateNav(user))
  route()
}

document.addEventListener('DOMContentLoaded', main)
