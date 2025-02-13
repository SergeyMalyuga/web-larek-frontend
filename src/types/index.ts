export interface IProduct {
	id: string,
	description: string,
	image: string,
	title: string,
	category: string,
	price: number | null
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
	isValid(order: IOrder): boolean;
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

export interface IPage {
	counter: number;
	catalog: HTMLElement[];
}

export interface IModal {
	open(): void;
	close(): void;
	render(): HTMLElement;
}

export interface IProductContent {
	template: HTMLTemplateElement;
	render(product: IProduct): HTMLElement;
}

export interface IBasketContent {
	template: HTMLTemplateElement;
	render(): HTMLElement;
}

export interface IOrderContent {
	valid: boolean;
	template: HTMLTemplateElement;
	render(): HTMLElement;
}

export interface IContactsContent {
	valid: boolean;
	template: HTMLTemplateElement;
	render(): HTMLElement;
}

export interface ISuccessContent {
	template: HTMLTemplateElement;
	render(): HTMLElement;
}

export interface ICard {
	render(data: IProduct): HTMLElement;
}

export enum PaymentType {
	CASH = 'cash',
	CARD = 'card'
}

