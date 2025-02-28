import { IEvents } from '../base/events';

export interface IModal {
	open(): void;

	close(): void;

	render(): HTMLElement;
}

export class Modal implements IModal {
	protected modalContainer: HTMLElement;
	protected closeButton: HTMLButtonElement;
	protected _content: HTMLElement;
	protected _pageWrapper: HTMLElement;

	constructor(modalContainer: HTMLElement, protected events: IEvents) {
		this.modalContainer = modalContainer;
		this.closeButton = modalContainer.querySelector(
			'.modal__close'
		) as HTMLButtonElement;
		this._content = modalContainer.querySelector(
			'.modal__content'
		) as HTMLElement;
		this._pageWrapper = document.querySelector('.page__wrapper') as HTMLElement;

		this.initEventListeners();
	}

	private initEventListeners(): void {
		this.closeButton.addEventListener('click', this.close.bind(this));
		this.modalContainer.addEventListener('click', this.close.bind(this));
		this.modalContainer
			.querySelector('.modal__container')
			?.addEventListener('click', (event) => event.stopPropagation());
	}

	set content(value: HTMLElement | null) {
		this._content.replaceChildren(value);
	}

	open(): void {
		this.modalContainer.classList.add('modal_active');
		this.events.emit('modal:open');
	}

	close(): void {
		this.modalContainer.classList.remove('modal_active');
		this.content = null; // очистка контента в модальном окне
		this.events.emit('modal:close');
	}

	set locked(value: boolean) {
		this._pageWrapper.classList.toggle('page__wrapper_locked', value);
	}

	render(): HTMLElement {
		this.open();
		return this.modalContainer;
	}
}
