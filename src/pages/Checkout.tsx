import type { NubeSDK } from "@tiendanube/nube-sdk-types";
import type { Promotion } from "../api";
import { GiftNotification } from "../components/GiftNotification";
import { hasGift } from "../utils";

export function Checkout(nube: NubeSDK, promotion: Promotion) {
	const { gift } = promotion;
	const { cart } = nube.getState();

	if (hasGift(cart, gift)) {
		nube.render("corner_bottom_right", <GiftNotification />);
		return;
	}
	nube.send("cart:add", () => ({
		cart: {
			items: [
				{
					product_id: gift.productId,
					variant_id: gift.variantId,
					quantity: 1,
				},
			],
		},
	}));
}
