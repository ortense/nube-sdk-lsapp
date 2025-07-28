import type { NubeSDK } from "@tiendanube/nube-sdk-types";
import { getPromo } from "./api";
import { Checkout } from "./pages/Checkout";
import { Storefront } from "./pages/Storefront";
import { isCheckout } from "./utils";

export async function App(nube: NubeSDK) {
	const { store, location } = nube.getState();
	const promotion = await getPromo(store);

	if (isCheckout(location.page)) {
		Checkout(nube, promotion);
		return;
	}

	Storefront(nube, promotion);
}
