import { $, api } from './common.js'

function main() {
  document.getElementById('form-login')?.addEventListener('submit', async (e) => {
    e.preventDefault()
    if (!window.FIREBASE_CONFIG) { alert('Auth not configured.'); return }
    const [{ getAuth }, { signInWithEmailAndPassword }] = await Promise.all([
      import('https://www.gstatic.com/firebasejs/10.13.1/firebase-auth.js'),
      import('https://www.gstatic.com/firebasejs/10.13.1/firebase-auth.js')
    ])
    const auth = getAuth()
    const email = document.getElementById('login-email').value
    const password = document.getElementById('login-password').value
    try {
      await signInWithEmailAndPassword(auth, email, password)
      location.href = '/vehicles/'
    } catch (e) { alert(e.message || 'Login failed') }
  })
}

document.addEventListener('DOMContentLoaded', main)
