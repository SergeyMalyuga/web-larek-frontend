import { Card } from "./Card";
import { IActivity, IProduct } from "../../types";
import { IEvents } from "../base/events";

export interface ICard {
	text: HTMLElement;
	button: HTMLElement;
	render(data: IProduct): HTMLElement;
}

export class CardPreview extends Card implements ICard {
	text: HTMLElement;
	button: HTMLElement;

	constructor(template: HTMLTemplateElement, protected events: IEvents, actions?: IActivity) {
		super(template, events, actions);
		this.text = this._cardElement.querySelector('.card__text')!;
		this.button = this._cardElement.querySelector('.card__button')!;
		this.addEventListeners();
	}

	private addEventListeners(): void {
		this.button.addEventListener('click', () => this.events.emit('card:addBasket'));
	}

	private getButtonLabel(data: IProduct): string {
		if (data.price) {
			return 'Купить';
		} else {
			this.button.setAttribute('disabled', 'true');
			return 'Не продается';
		}
	}

	render(data: IProduct): HTMLElement {
		this.cardCategory = data.category;
		this.setText(this._cardTitle, data.title);
		this.setImage(data.image, data.title);
		this._cardPrice.textContent = this.setPrice(data.price);
		this.setText(this.text, data.description);
		this.button.textContent = this.getButtonLabel(data);
		return this._cardElement;
	}
}

