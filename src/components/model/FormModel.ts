import { IEvents } from '../base/events';
import { FormErrors } from '../../types/index'

export interface IFormModel {
	payment: string;
	email: string;
	phone: string;
	address: string;

	setOrderAddress(field: string, value: string): void
	validateOrder(): boolean;
	setOrderData(field: string, value: string): void
	validateContacts(): boolean;
	getOrderLot(): object;
}

export class FormModel implements IFormModel {
	payment: string;
	email: string;
	phone: string;
	address: string;

	formErrors: FormErrors = {};

	constructor(protected events: IEvents) {
		this.payment = '';
		this.email = '';
		this.phone = '';
		this.address = '';
	}

	setOrderAddress(field: string, value: string) {
		if (field === 'address') {
			this.address = value;
		}

		if (this.validateOrder()) {
			this.events.emit('order:ready', this.getOrderLot());
		}
	}

	validateOrder() {
		const regexp = /^(?:[\u0400-\u04FFa-zA-Z0-9\s/.,-]{7,})$/;
		const errors: typeof this.formErrors = {};

		if (!this.address) {
			errors.address = 'Необходимо указать адрес'
		} else if (!regexp.test(this.address)) {
			errors.address = 'Укажите адрес'
		} else if (!this.payment) {
			errors.payment = 'Выберите способ оплаты'
		}

		this.formErrors = errors;
		this.events.emit('formErrors:address', this.formErrors);
		return Object.keys(errors).length === 0;
	}

	setOrderData(field: string, value: string) {
		if (field === 'email') {
			this.email = value;
		} else if (field === 'phone') {
			this.phone = value;
		}

		if (this.validateContacts()) {
			this.events.emit('order:ready', this.getOrderLot());
		}
	}

	validateContacts() {
		const regexpEmail = /^[\w.-]+@[\w-]+\.[a-zA-Z]{2,4}$/;
		const regexpPhone = /^((8|\+7)[- ]?)?(\(?\d{3}\)?[- ]?)?\d{7}$/;
		const errors: typeof this.formErrors = {};

		if (!this.email) {
			errors.email = 'Необходимо указать email'
		} else if (!regexpEmail.test(this.email)) {
			errors.email = 'Некорректный адрес электронной почты'
		}

		if (this.phone.startsWith('8')) {
			this.phone = '+7' + this.phone.slice(1);
		}

		if (!this.phone) {
			errors.phone = 'Необходимо указать телефон'
		} else if (!regexpPhone.test(this.phone)) {
			errors.phone = 'Некорректный формат номера телефона'
		}

		this.formErrors = errors;
		this.events.emit('formErrors:change', this.formErrors);
		return Object.keys(errors).length === 0;
	}

	static validateForm(inputAll: HTMLInputElement[]): boolean {
		let isValid = true;
		inputAll.forEach(input => {
			if (!input.value) {
				isValid = false;
				input.classList.add('input-error');
			} else {
				input.classList.remove('input-error');
			}
		});
		return isValid;
	}

	getOrderLot() {
		return {
			payment: this.payment,
			email: this.email,
			phone: this.phone,
			address: this.address,
		}
	}
}
