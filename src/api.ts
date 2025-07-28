import type { Store } from "@tiendanube/nube-sdk-types";

export type Gift = {
	productId: number;
	variantId: number;
};

export type Promo = {
	promoPrice: number;
	gift: Gift;
};

export async function getPromo(_: Store): Promise<Promo> {
	// mock api call
	return Promise.resolve({
		promoPrice: 200,
		gift: {
			productId: 123,
			variantId: 456,
		},
	});
}
