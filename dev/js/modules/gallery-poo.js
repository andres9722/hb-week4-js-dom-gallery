export class Lightbox {
  constructor(container) {
    this.container = container,
    this.lightbox(container)
  }

  lightbox(container) {
    let images = this.getImages(container),
    larges = this.getLargeImages(images),
    descriptions = this.getDescriptions(images)

    this.openLightBoxEvent(container, images, larges, descriptions)
  }

  getImages(container) {
    return [...container.querySelectorAll('img')]
  }

  getLargeImages(gallery) {
    return gallery.map(el => el.src)
  }

  getDescriptions(gallery) {
    return gallery.map(el => el.alt)
  }

  openLightBoxEvent(container, gallery, larges, descriptions) {
    container.addEventListener('click', e => {
      let el = e.target,
        i = gallery.indexOf(el)

      if (el.tagName === 'IMG') {
        this.openLightBox(gallery, i, larges, descriptions)
      }
    })
  }

  openLightBox(gallery, i, larges, descriptions) {
    let lightboxEl = document.createElement('div')

    let lightBoxContent = `
      <div class="lightbox-overlay">
        <figure class="lightbox-container">
          <div class="close-modal"></div>
          <img src="${larges[i]}" class="lightbox-image">
          <figcaption>
            <p class="lightbox-description">${descriptions[i]}</p>
          <figcaption>
          <nav class="class="lightbox-navigation"">
            <a href="" class="lightbox-navigation__button prev"></a>
            <span class="lightbox-navigation__counter">Imagen ${i + 1} de ${larges.length} </span>
            <a href="" class="lightbox-navigation__button next"></a>
          </nav>
        </figure>
      </div>
    `

    lightboxEl.innerHTML = lightBoxContent

    lightboxEl.id = 'lightbox'

    document.body.appendChild(lightboxEl)

    this.closeModal(lightboxEl)

    this.navigateLightBox(lightboxEl, i, larges, descriptions)
  }

  closeModal(modalEl) {
    let closeModal = modalEl.querySelector('.close-modal')

    closeModal.addEventListener('click', e => {
      e.preventDefault()
      document.body.removeChild(modalEl)
    })
  }

  navigateLightBox(lightboxEl, i, larges, descriptions) {
    let prev = lightboxEl.querySelector('.prev'),
      next = lightboxEl.querySelector('.next'),
      image = lightboxEl.querySelector('img'),
      description = lightboxEl.querySelector('p'),
      counter = lightboxEl.querySelector('span'),
      close = lightboxEl.querySelector('.close-modal')

    window.addEventListener('keyup', e => {
      if (e.key === 'ArrowRight') next.click()
      if (e.key === 'ArrowLeft') prev.click()
      if (e.key === 'Escape') close.click()
    })

    lightboxEl.addEventListener('click', e => {
      e.preventDefault()
      let target = e.target

      if (target === prev) {
        if (i > 0) {
          image.src = larges[i - 1]
          i--
        } else {
          image.src = larges[larges.length - 1]
          i = larges.length - 1
        }

      } else if (target === next) {
        if (i < larges.length - 1) {
          image.src = larges[i + 1]
          i++
        } else {
          image.src = larges[0]
          i = 0
        }

      }

      description.textContent = descriptions[i]
      counter.textContent = `Imagen ${i + 1} de ${larges.length}`
    })
  }
}
