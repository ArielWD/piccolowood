const scrolling = document.querySelector('body')
const portafolio = document.querySelector('.portafolio')

if (portafolio) {
  let proyectoSelect = []
  getProjects()
  scrolling.onscroll = () => {
    if (window.scrollY > 950) {
      portafolio.classList.add('active')
      setTimeout(() => {
        portafolio.classList.remove('active')
      }, 300)
    }
  }
  async function getProjects () {
    await fetch('projects.json')
      .then(res => res.json())
      .then(datos => {
        showProjects(datos)
      })
  }

  function showProjects (datos) {
    for (const valor of datos) {
      const project = document.createElement('DIV')
      project.classList.add('portafolio__project')
      project.dataset.idProyecto = valor.id
      project.innerHTML += `
        <h2>${valor.nombre}</h2>
        <img loading="lazy" src="${valor.imgs[0]}.webp" alt="${valor.nombre}">
      `
      project.addEventListener('click', getProject)
      portafolio.appendChild(project)
    }
  }

  async function getProject (e) {
    try {
      const respuesta = await fetch('projects.json')
      const resultado = await respuesta.json()
      proyectoSelect = resultado[e.target.parentElement.dataset.idProyecto]
    } catch (error) {
      console.log('error')
    }
    createModal(proyectoSelect)
  }
}

function createModal (project) {
  const modal = document.createElement('div')
  modal.classList.add('modal')
  const descripcion = project.descripcion.replace(/;/gi, '</br>')
  const images = Object.values(project.imgs)
  modal.innerHTML = `      
    <span class="modal__close">&times;</span>
    <div class="modal__content">
      <div class="modal__info">
        <h3 class="modal__titulo">${project.nombre}</h3>
        ${project.ubicacion
          ? `<div class="modal__ubicacion">
            <h4>Ubicacion</h4>
            <p>${project.ubicacion}</p>
          </div>`
        : ''}
        <div class="modal__fecha">
          <h4>Fecha</h4>
          <p>${project.fecha}</p>
        </div>
        <div class="modal__tipo">
          <h4>Tipo de Proyecto</h4>
          <p>${project.tipo}</p>
        </div>
      </div>
          <div class="modal__imgs slide">
          <a class="slide__prev" >❮</a>
          <a class="slide__next" >❯</a>
          </div>
      <div class="modal__descripcion">
      ${project.titulo
        ? `<h4>${project.titulo}</h4>`
        : ''}
         <p>${descripcion}</p>
      </div>
    </div>
  `
  const boxImg = modal.querySelector('.modal__imgs')
  console.log(boxImg)
  for (const valor of images) {
    const slide = document.createElement('div')
    slide.classList.add('slide__div')
    slide.classList.add('slide__fade')
    const img = document.createElement('IMG')
    img.src = valor + '.webp'
    img.alt = project.nombre
    img.classList.add('modal__img')
    slide.appendChild(img)
    boxImg.appendChild(slide)
  }
  window.document.body.appendChild(modal)
  window.document.body.style.overflowY = 'hidden'

  const closeModal = document.querySelector('.modal__close')
  closeModal.addEventListener('click', () => {
    modal.remove()
    window.document.body.style.overflowY = 'auto'
  })

  const left = modal.querySelector('.slide__prev')
  const right = modal.querySelector('.slide__next')
  let slideIndex = 1
  showSlides(slideIndex)
  left.addEventListener('click', () => {
    showSlides(slideIndex -= 1)
  })
  right.addEventListener('click', () => {
    showSlides(slideIndex += 1)
  })
  function showSlides (n) {
    let i
    const slides = modal.getElementsByClassName('slide__div')
    if (n > slides.length) { slideIndex = 1 }
    if (n < 1) { slideIndex = slides.length }
    for (i = 0; i < slides.length; i++) {
      slides[i].style.display = 'none'
    }
    slides[slideIndex - 1].style.display = 'block'
  }
}
