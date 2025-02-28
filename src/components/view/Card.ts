import { IActivity, IProduct } from "../../types";
import { IEvents } from "../base/events";

export interface ICard {
	render(data: IProduct): HTMLElement;
}

export class Card implements ICard {
	protected _cardElement: HTMLElement;
	protected _cardCategory: HTMLElement;
	protected _cardTitle: HTMLElement;
	protected _cardImage: HTMLImageElement;
	protected _cardPrice: HTMLElement;
	protected _categories: Record<string, string> = {
		"дополнительное": "additional",
		"софт-скил": "soft",
		"кнопка": "button",
		"хард-скил": "hard",
		"другое": "other",
	};

	constructor(template: HTMLTemplateElement, protected events: IEvents, actions?: IActivity) {
		this._cardElement = template.content.querySelector('.card')!.cloneNode(true) as HTMLElement;
		this._cardCategory = this._cardElement.querySelector('.card__category')!;
		this._cardTitle = this._cardElement.querySelector('.card__title')!;
		this._cardImage = this._cardElement.querySelector('.card__image') as HTMLImageElement;
		this._cardPrice = this._cardElement.querySelector('.card__price')!;

		if (actions?.onClick) {
			this.addEventListener(this._cardElement, 'click', actions.onClick);
		}
	}

	private addEventListener(element: HTMLElement, event: string, handler: EventListener): void {
		element.addEventListener(event, handler);
	}

	set cardCategory(value: string) {
		this.setText(this._cardCategory, value);
		this._cardCategory.className = `card__category card__category_${this._categories[value] || 'default'}`;
	}

	protected setPrice(value: number | null): string {
		return value === null ? 'Бесценно' : `${value} синапсов`;
	}

	protected setText(element: HTMLElement, value: unknown): string {
		return element ? element.textContent = String(value) : '';
	}

	protected setImage(src: string, alt: string): void {
		this._cardImage.src = src;
		this._cardImage.alt = alt;
	}

	render(data: IProduct): HTMLElement {
		this.cardCategory = data.category;
		this.setText(this._cardTitle, data.title);
		this.setImage(data.image, data.title);
		this._cardPrice.textContent = this.setPrice(data.price);
		return this._cardElement;
	}
}

