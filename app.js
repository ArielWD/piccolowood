const preload = document.getElementById('preload')
if (preload) {
  document.body.style.overflowY = 'hidden'

  setTimeout(() => {
    preload.classList.add('load')
    preload.classList.remove('loading')
    document.body.style.overflowY = 'auto'
  }, 1000)
}

const menu = document.querySelector('.menu')

menu.addEventListener('click', openMenu)

function openMenu () {
  document.body.classList.toggle('open')
  menu.setAttribute('aria-expanded', document.body.classList.contains('open'))
  if (document.body.classList.contains('open')) {
    document.body.style.overflow = 'hidden'
  } else {
    document.body.style.overflow = 'auto'
  }
}
