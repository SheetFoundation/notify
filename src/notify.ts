import './style.css'

export enum NotifyType {
  information = 'information',
  success = 'success',
  warning = 'warning',
  danger = 'danger',
}

export type NotifyIcons = { [key in NotifyType]: string }

class Notify {
  private popupMargin = 16
  private topStartingPoint = 0
  private template = `<div data-notify="container" class="notify-container notify-opening">
        <span class="notify-icon"></span>
        <div data-notify="title-message-block">
          <span data-notify="title"></span>
          <span data-notify="message"></span>
        </div>
      </div>`

  private icons: NotifyIcons = {
    information: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" style="width: 1.5rem; height: 1.5rem; position: relative; top: .15rem">
      <path fill="none" stroke-linecap="round" stroke-linejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
    </svg>`,
    success: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" style="width: 1.5rem; height: 1.5rem; position: relative; top: .15rem">
      <path fill="none" stroke-linecap="round" stroke-linejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
    </svg>`,
    warning: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" style="width: 1.5rem; height: 1.5rem; position: relative; top: .15rem">
      <path fill="none" stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z" />
    </svg>`,
    danger: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" style="width: 1.5rem; height: 1.5rem; position: relative; top: .15rem">
      <path fill="none" stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
    </svg>`
  }

  private showIcon = true
  private duration = 5000

  setDefaultSettings(settings: {
      showIcon?: boolean,
      duration?: number,
      popupMargin?: number,
      topStartingPoint?: number,
      template?: string
    }): any {

    if (typeof settings.showIcon !== "undefined") this.showIcon = settings.showIcon
    if (settings.duration) this.duration = settings.duration
    if (settings.topStartingPoint) this.topStartingPoint = settings.topStartingPoint
    if (settings.template) this.template = settings.template
  }

  getIcon(type: NotifyType) {
    return this.icons[type]
  }

  setIcon(type: NotifyType, template: string) {
    this.icons[type] = template
  }

  getIcons() {
    return this.icons
  }

  setIcons(icons: NotifyIcons) {
    this.icons = icons
  }
	
	show (options: {
    title?: string,
    message?: string,
    type?: NotifyType,
    log?: string,
    icon?: string,
    showIcon?: boolean,
    duration?: number,
  }) : void 
	{
		const templateElem = document.createElement('template')
		const html = this.template.trim() // Never return a text node of whitespace as the result
		templateElem.innerHTML = html

		const template = templateElem.content.firstChild as HTMLElement
    if (!template) return
		
		const icon = options.icon ?? (options.type && this.icons[options.type] ? this.icons[options.type] : '')
		const title = options.title ?? ''
		const message = options.message ?? ''
		const type = options.type ?? 'information'
		const showIcon = options.showIcon ?? this.showIcon
		const duration = options.duration ?? this.duration

    if (options.log) console.log(options.log)

    const iconElem = template.querySelector('.notify-icon')
    if (iconElem && showIcon) iconElem.innerHTML = icon

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