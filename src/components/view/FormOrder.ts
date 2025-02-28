import { IEvents } from "../base/events";

export interface IOrder {
	formOrder: HTMLFormElement;
	paymentButtons: HTMLButtonElement[];
	paymentSelection: string;
	formErrors: HTMLElement;
	render(): HTMLElement;
}

export class Order implements IOrder {
	formOrder: HTMLFormElement;
	paymentButtons: HTMLButtonElement[];
	buttonSubmit: HTMLButtonElement;
	formErrors: HTMLElement;

	constructor(template: HTMLTemplateElement, protected events: IEvents) {
		this.formOrder = template.content
			.querySelector('.form')
			.cloneNode(true) as HTMLFormElement;
		this.paymentButtons = Array.from(this.formOrder.querySelectorAll('.button_alt'));
		this.buttonSubmit = this.formOrder.querySelector('.order__button');
		this.formErrors = this.formOrder.querySelector('.form__errors');

		this.paymentButtons.forEach((item) => {
			item.addEventListener('click', (event) => {
				this.paymentSelection = item.name;
				events.emit('order:paymentSelection', item);
				this.changeAddress(event)
			});
		});

		this.formOrder.addEventListener('input', (event: Event) => {
			this.changeAddress(event)
		});

		this.formOrder.addEventListener('submit', (event: Event) => {
			event.preventDefault();
			this.events.emit('contacts:open');
		});
	}

	set paymentSelection(paymentMethod: string) {
		this.paymentButtons.forEach((item) => {
			item.classList.toggle('button_alt-active', item.name === paymentMethod);
		});
	}

	set valid(value: boolean) {
		this.buttonSubmit.disabled = !value;
	}

	render() {
		return this.formOrder;
	}

	private changeAddress(event: Event) {
		const target = event.target as HTMLInputElement;
		const field = target.name;
		const value = target.value;
		this.events.emit(`order:changeAddress`, { field, value });
	}
}
