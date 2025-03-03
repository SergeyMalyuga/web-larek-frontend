import { createElement } from "../../utils/utils";
import { IEvents } from "../base/events";

export interface IBasket {
	basket: HTMLElement;
	title: HTMLElement;
	basketList: HTMLElement;
	button: HTMLButtonElement;
	basketPrice: HTMLElement;
	basketButton: HTMLButtonElement;
	basketCounter: HTMLElement;
	renderBasketCounter(value: number): void;
	renderTotalProducts(sumAll: number): void;
	render(): HTMLElement;
}

export class Basket implements IBasket {
	basket: HTMLElement;
	title: HTMLElement;
	basketList: HTMLElement;
	button: HTMLButtonElement;
	basketPrice: HTMLElement;
	basketButton: HTMLButtonElement;
	basketCounter: HTMLElement;

	constructor(template: HTMLTemplateElement, protected events: IEvents) {
		this.basket = template.content.querySelector('.basket') as HTMLElement;
		this.title = this.basket.querySelector('.modal__title') as HTMLElement;
		this.basketList = this.basket.querySelector('.basket__list') as HTMLElement;
		this.button = this.basket.querySelector('.basket__button') as HTMLButtonElement;
		this.basketPrice = this.basket.querySelector('.basket__price') as HTMLElement;
		this.basketButton = document.querySelector('.header__basket') as HTMLButtonElement;
		this.basketCounter = document.querySelector('.header__basket-counter') as HTMLElement;

		this.initializeEventListeners();
	}

	private initializeEventListeners(): void {
		this.button.addEventListener('click', () => this.events.emit('order:open'));
		this.basketButton.addEventListener('click', () => this.events.emit('basket:open'));
	}

	set items(items: HTMLElement[]) {
		if (items.length) {
			this.updateBasketList(items);
			this.toggleButtonState(false);
		} else {
			this.toggleButtonState(true);
			this.showEmptyBasketMessage();
		}
	}

	private updateBasketList(items: HTMLElement[]): void {
		this.basketList.replaceChildren(...items);
	}

	private toggleButtonState(isDisabled: boolean): void {
		if (isDisabled) {
			this.button.setAttribute('disabled', 'disabled');
		} else {
			this.button.removeAttribute('disabled');
		}
	}

	private showEmptyBasketMessage(): void {
		this.basketList.replaceChildren(createElement<HTMLParagraphElement>('p', { textContent: 'Корзина пуста' }));
	}

	renderBasketCounter(value: number): void {
		this.basketCounter.textContent = String(value);
	}

	renderTotalProducts(sumAll: number): void {
		this.basketPrice.textContent = `${sumAll} синапсов`;
	}

	render(): HTMLElement {
		return this.basket;
	}
}

