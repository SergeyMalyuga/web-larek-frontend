import { IEvents } from "../base/events";
import {FormModel} from '../model/FormModel';

export interface IContacts {
	formContacts: HTMLFormElement;
	inputAll: HTMLInputElement[];
	buttonSubmit: HTMLButtonElement;
	formErrors: HTMLElement;
	render(): HTMLElement;
}

export class Contacts implements IContacts {
	readonly formContacts: HTMLFormElement;
		readonly inputAll: HTMLInputElement[];
	readonly buttonSubmit: HTMLButtonElement;
	readonly formErrors: HTMLElement;

	constructor(template: HTMLTemplateElement, protected events: IEvents) {
		this.formContacts = template.content.querySelector('.form').cloneNode(true) as HTMLFormElement;
		this.inputAll = Array.from(this.formContacts.querySelectorAll('.form__input')) as HTMLInputElement[];
		this.buttonSubmit = this.formContacts.querySelector('.button');
		this.formErrors = this.formContacts.querySelector('.form__errors');

		this.addEventListeners();
	}

	private addEventListeners(): void {
		this.inputAll.forEach(input => {
			input.addEventListener('input', this.handleInputChange.bind(this));
		});

		this.formContacts.addEventListener('submit', this.handleSubmit.bind(this));
	}

	private handleInputChange(event: Event): void {
		const target = event.target as HTMLInputElement;
		const field = target.name;
		const value = target.value;
		this.events.emit(`contacts:changeInput`, { field, value });
	}

	private handleSubmit(event: Event): void {
		event.preventDefault();
		if (FormModel.validateForm(this.inputAll)) {
			this.events.emit('order:sending');
		} else {
			this.displayErrors();
		}
	}

	private displayErrors(): void {
		this.formErrors.textContent = 'Необходимо заполнить все поля.';
	}

	set valid(value: boolean) {
		this.buttonSubmit.disabled = !value;
	}

	render(): HTMLElement {
		return this.formContacts;
	}
}
