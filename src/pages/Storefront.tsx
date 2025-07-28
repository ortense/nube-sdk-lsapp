import type { NubeSDK } from "@tiendanube/nube-sdk-types";
import type { Promotion } from "../api";
import { Banner } from "../components/Banner";
import { GiftNotification } from "../components/GiftNotification";
import { PromoNotification } from "../components/PromoNotification";

export function Storefront(nube: NubeSDK, promotion: Promotion) {
	const { promoPrice } = promotion;

	nube.render("before_main_content", <Banner promoPrice={promoPrice} />);

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
}
