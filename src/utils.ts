import type { Cart, CheckoutPage } from "@tiendanube/nube-sdk-types";
import type { Gift } from "./api";

export const formatCurrency = (value: number) =>
	new Intl.NumberFormat("pt-BR", {
		style: "currency",
		currency: "BRL",
	}).format(value);

export function isCheckout(value: unknown): value is CheckoutPage {
	const page = value as CheckoutPage;
	return page.type === "checkout";
}

export function hasGift(cart: Cart, gift: Gift) {
	return cart.items.some(
		(item) =>
			item.product_id === gift.productId && item.variant_id === gift.variantId,
	);
}
