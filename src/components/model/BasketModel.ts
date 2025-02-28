import {IProduct} from "../../types";

export interface IBasketModel {
	basketProducts: IProduct[];
	getCounter: () => number;
	getTotalProducts: () => number;
	setSelectedСard(data: IProduct): void;
	deleteCardFromBasket(item: IProduct): void;
	clearBasket(): void
}

export class BasketModel implements IBasketModel {
	protected _basketProducts: IProduct[];

	constructor() {
		this._basketProducts = [];
	}

	set basketProducts(data: IProduct[]) {
		this._basketProducts = data;
	}

	get basketProducts() {
		return this._basketProducts;
	}

	getCounter() {
		return this.basketProducts.length;
	}

	getTotalProducts() {
		let sum = 0;
		this.basketProducts.forEach(item => {
			sum = sum + item.price;
		});
		return sum;
	}

	setSelectedСard(data: IProduct) {
		this._basketProducts.push(data);
	}

	deleteCardFromBasket(item: IProduct) {
		const index = this._basketProducts.indexOf(item);
		if (index >= 0) {
			this._basketProducts.splice(index, 1);
		}
	}

	clearBasket() {
		this.basketProducts = []
	}
}
