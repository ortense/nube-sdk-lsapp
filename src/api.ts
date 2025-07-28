import type { Store } from "@tiendanube/nube-sdk-types";

export type Gift = {
	productId: number;
	variantId: number;
};

export type Promotion = {
	promoPrice: number;
	gift: Gift;
};

export async function getPromo(_: Store): Promise<Promotion> {
	// mock api call
	return Promise.resolve({
		promoPrice: 200,
		gift: {
			productId: 123,
			variantId: 456,
		},
	});
}
