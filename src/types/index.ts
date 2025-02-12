export interface IProduct {
	id: string,
	description: string,
	image: string,
	title: string,
	category: string,
	price: number
}

export interface IProductModel {
	items: IProduct[];
	preview: string | null;
}

export interface IOrder {
	payment: string,
	email: string,
	phone: string,
	address: string,
	total: number,
	items: string[]
}

export interface IOrderModel {
	order: IOrder;
}

export interface IBasketModel {
	items: Map<string, number>;

	add(item: string): void;

	remove(item: string): void;

	total: number;
}

export interface IEventEmitter {
	emit: (event: string, data?: unknown) => void
}

export interface IModalProduct {
	template: HTMLTemplateElement;
}

export interface IModalBasket {
	template: HTMLTemplateElement;
}

export interface IModalOrder {
	valid: boolean;
	template: HTMLTemplateElement;
}

export interface IModalContacts {
	valid: boolean;
	template: HTMLTemplateElement;
}

export interface IModalSuccess {
	template: HTMLTemplateElement;
}

export enum PaymentType {
	CASH = 'cash',
	CARD = 'card'
}

