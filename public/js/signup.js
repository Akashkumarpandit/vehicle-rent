import { $, api } from './common.js'

function main() {
  document.getElementById('form-signup')?.addEventListener('submit', async (e) => {
    e.preventDefault()
    if (!window.FIREBASE_CONFIG) { alert('Auth not configured.'); return }
    const [{ getAuth }, { createUserWithEmailAndPassword }] = await Promise.all([
      import('https://www.gstatic.com/firebasejs/10.13.1/firebase-auth.js'),
      import('https://www.gstatic.com/firebasejs/10.13.1/firebase-auth.js')
    ])
    const auth = getAuth()
    const email = document.getElementById('signup-email').value
    const password = document.getElementById('signup-password').value
    try {
      await createUserWithEmailAndPassword(auth, email, password)
      location.href = '/vehicles/'
    } catch (e) { alert(e.message || 'Sign up failed') }
  })
}

document.addEventListener('DOMContentLoaded', main)