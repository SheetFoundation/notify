import './style.css'

export type Icons = { [key in string]: string }

class Notify {
  private popupMargin = 16
  private topStartingPoint = 0
  private template = `<div data-notify="container" class="fixed mx-3 right-0 z-[9999] notify-container notify-opening">
        <span class="notify-icon"></span>
        <div data-notify="title-message-block">
          <span data-notify="title"></span>
          <span data-notify="message"></span>
        </div>
      </div>`

  private icons: Icons = {
    information: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
      <path stroke-linecap="round" stroke-linejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
    </svg>`,
    danger: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
      <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
    </svg>`
  }
	
	show (options: { [index: string]: string }) : void 
	{
		const templateElem = document.createElement('template')
		const html = this.template.trim() // Never return a text node of whitespace as the result
		templateElem.innerHTML = html

		const template = templateElem.content.firstChild as HTMLElement
    if (!template) return
		
		const icon = options.type && this.icons[options.type] ? this.icons[options.type] : ''
		const title = options.title ?? ''
		const message = options.message ?? ''
		const type = options.type ?? 'information'
		const duration = options.duration ? parseInt(options.duration) : 5000

    if (options.log) console.log(options.log)

    const iconElem = template.querySelector('.notify-icon')
    if (iconElem) iconElem.innerHTML = icon

		const titleElem = template.querySelector('[data-notify=title]')
    if (titleElem) titleElem.innerHTML = title

		const messageElem = template.querySelector('[data-notify=message]')
    if (messageElem) messageElem.innerHTML = message

    const body = document.querySelector('body')
    if (!body) return

    template.id = "notify-" + (Math.random() + 1).toString(36).substring(7)
    template.classList.add('notify-' + type)
    
    let positionTop = this.popupMargin + this.topStartingPoint
    template.style.top = positionTop + 'px'

    body.append(template)
    const insertedTemplate = document.getElementById(template.id)
    if (!insertedTemplate) return

    const rect = insertedTemplate.getBoundingClientRect();
    const blockHeight = rect.bottom - rect.top + this.popupMargin
    this.topStartingPoint += blockHeight

    setTimeout(() => {
        insertedTemplate.classList.remove('notify-opening')
        insertedTemplate.classList.add('notify-closing')
        setTimeout(() => {
          insertedTemplate.remove()
          this.topStartingPoint -= blockHeight

          // Move all popups up
          const popups = document.querySelectorAll(".notify-container")
          popups.forEach(popup => {
            const rect2 = (popup as HTMLElement).getBoundingClientRect();
            (popup as HTMLElement).style.top = rect2.top - blockHeight + "px"
          })
        }, 500)
      }, duration)
	}
}

export const notify = new Notify()