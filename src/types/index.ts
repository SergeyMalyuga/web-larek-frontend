export interface IDataApi {
	getProducts(): Promise<{ items: IItem[] }>;

	getProduct(id: string): Promise<IItem>;

	postOrder(data: IOrder): Promise<object>;
}

export interface IItem {
	id: string,
	description: string,
	image: string,
	title: string,
	category: string,
	price: number
}

export interface IProductModel {
	items: IItem[];
	getProducts(): IItem[];
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
	fullOrder: IOrder;
	payment: string,
	email: string,
	phone: string,
	address: string,
	total: number,
	items: string[]
}

export interface IBasketModel {
	items: Map<string, number>;

	add(item: string): void;

	remove(item: string): void;

	total: number;
}

export enum PaymentType {
	CASH = 'cash',
	CARD = 'card'
}

// type TItemInfo = Pick<IItem, 'description' | 'price'>;
// type TOrderInfo = Pick<IOrder, 'payment' | 'address'>;
// type IOrderUserInfo = Pick<IOrder, 'email' | 'phone'>;
