import { api, auth } from './common.js'

async function loadProfile() {
  const nameEl = document.getElementById('prof-name')
  const emailEl = document.getElementById('prof-email')
  const inputName = document.getElementById('input-name')
  const inputEmail = document.getElementById('input-email')

  let name = 'John Doe'
  let email = 'john.doe@example.com'
  try {
    // Prefer server profile if auth+DB available
    const res = await api('/api/users/me')
    name = res?.user?.displayName || name
    email = res?.user?.email || email
  } catch {
    // Fallback to client auth
    const u = auth?.currentUser
    if (u) { name = u.displayName || name; email = u.email || email }
  }
  nameEl.textContent = name
  emailEl.textContent = email
  inputName.value = name
  inputEmail.value = email
}

function main() {
  loadProfile()
  document.getElementById('btn-save')?.addEventListener('click', () => {
    alert('Changes saved (demo).')
  })
  document.getElementById('btn-upload')?.addEventListener('click', () => {
    alert('Documents uploaded (demo).')
  })
}

document.addEventListener('DOMContentLoaded', main)
