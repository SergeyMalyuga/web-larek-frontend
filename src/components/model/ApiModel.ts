import { ApiListResponse, Api } from '../base/api'
import { IOrderLot, IOrderResult, IProduct } from '../../types';

export interface IApiModel {
	cdn: string;
	items: IProduct[];
	getProductCards: () => Promise<IProduct[]>;
	postOrder: (order: IOrderLot) => Promise<IOrderResult>;
}

export class ApiModel extends Api implements IApiModel{
	readonly cdn: string;
	items: IProduct[];

	constructor(cdn: string, baseUrl: string, options?: RequestInit) {
		super(baseUrl, options);
		this.cdn = cdn;
	}

	getProductCards(): Promise<IProduct[]> {
		return this.get('/product').then((data: ApiListResponse<IProduct>) =>
			data.items.map((item) => ({
				...item,
				image: this.cdn + item.image,
			}))
		);
	}

	postOrder(order: IOrderLot): Promise<IOrderResult> {
		return this.post(`/order`, order).then((data: IOrderResult) => data);
	}
}
