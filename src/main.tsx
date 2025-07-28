import type { NubeSDK } from "@tiendanube/nube-sdk-types";
import { getPromo } from "./api";
import { Banner } from "./components/Banner";
import { GiftNotification } from "./components/GiftNotification";
import { PromoNotification } from "./components/PromoNotification";
import { hasGift, isCheckout } from "./utils";

export async function App(nube: NubeSDK) {
	const { store, location, cart } = nube.getState();
	const { promoPrice, gift } = await getPromo(store);

	nube.on("cart:update", ({ cart }) => {
		if (cart.prices.subtotal >= promoPrice) {
			nube.render("corner_bottom_right", <GiftNotification />);
			return;
		}
		nube.render(
			"corner_bottom_right",
			<PromoNotification
				promoPrice={promoPrice}
				cartSubtotal={cart.prices.subtotal}
			/>,
		);
	});

	if (isCheckout(location.page)) {
		if (hasGift(cart, gift)) {
			nube.render("corner_bottom_right", <GiftNotification />);
		} else {
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
	} else {
		nube.render("before_main_content", <Banner promoPrice={promoPrice} />);
	}
}
