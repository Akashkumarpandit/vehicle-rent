/* Common client-side JS: auth (optional) + navbar state + helpers */
import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.13.1/firebase-app.js'
import { getAuth, onAuthStateChanged, signOut, getIdToken } from 'https://www.gstatic.com/firebasejs/10.13.1/firebase-auth.js'

export const $ = (s) => document.querySelector(s)
export const $$ = (s) => Array.from(document.querySelectorAll(s))

let authEnabled = false
export let auth

if (window.FIREBASE_CONFIG) {
  const app = initializeApp(window.FIREBASE_CONFIG)
  auth = getAuth(app)
  authEnabled = true
}

export async function api(path, opts = {}) {
  const headers = { 'Content-Type': 'application/json', ...(opts.headers || {}) }
  if (authEnabled && auth?.currentUser) {
    try { headers['Authorization'] = `Bearer ${await getIdToken(auth.currentUser, true)}` } catch {}
  }
  const res = await fetch(path, { ...opts, headers })
  if (!res.ok) throw new Error(await res.text())
  return res.json()
}

function updateNav(user) {
  const login = $('#nav-login')
  const signup = $('#nav-signup')
  const logout = $('#btn-logout')
  if (user) {
    login?.classList.add('hidden'); signup?.classList.add('hidden'); logout?.style.setProperty('display','')
  } else {
    login?.classList.remove('hidden'); signup?.classList.remove('hidden'); logout?.style.setProperty('display','none')
  }
}

$('#btn-logout')?.addEventListener('click', async () => {
  try { if (authEnabled) await signOut(auth) } catch {}
  location.href = '/login/'
})

// Mark active nav link
const path = location.pathname.replace(/\/$/, '/')
$$('.links a').forEach(a => { if (a.getAttribute('href') === path) a.classList.add('active') })

if (authEnabled) onAuthStateChanged(auth, updateNav)
