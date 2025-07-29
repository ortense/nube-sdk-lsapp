import type { NubeSDK } from "@tiendanube/nube-sdk-types";
import { Banner } from "./components/Banner";
import { GiftNotification } from "./components/GiftNotification";
import { PromoNotification } from "./components/PromoNotification";

/**
 * Tipo de promoção.
 *
 * @description
 * Representa a configuração da promoção em uma loja.
 */
type Promotion = {
	promoPrice: number;
	gift: {
		productId: number;
		variantId: number;
	};
};

/**
 * Função principal do aplicativo.
 *
 * @description
 * A função App é o ponto de entrada do aplicativo.
 * Será chamada quando o usuário acessa a o checkout ou storefront.
 *
 * @param nube - A instância do Nube SDK.
 * @returns void
 */
export async function App(nube: NubeSDK) {
	// Obtém o estado atual do Nube SDK quando o aplicativo é carregado.
	const state = nube.getState();
	// Obter a promoção ativa, pode ser feito um fetch para uma API externa.
	// exemplo: await fetch(`https://api.nube.com.br/promo/${state.store.id}`);
	const promotion: Promotion = {
		promoPrice: 200,
		gift: {
			productId: 123,
			variantId: 456,
		},
	};

	if (state.location.page.type === "checkout") {
		// Se for checkout, executa a logic do checkout.
		Checkout(nube, promotion);
		return;
	}
	// Se não for checkout, executa a logic do storefront.
	Storefront(nube, promotion);
}

/**
 * Lógica para a página de checkout.
 *
 * @description
 * Na página de checkout, verifica se o brinde está no carrinho.
 * Caso não possua, adiciona o brinde ao carrinho.
 *
 * @param nube - A instância do Nube SDK.
 * @param promotion - A promoção ativa.
 * @returns void
 */
export function Checkout(nube: NubeSDK, promotion: Promotion) {
	const { gift, promoPrice } = promotion;
	const { cart } = nube.getState();

	// Verifica se o carrinho atinge o valor mínimo para ganhar o brinde.
	const hasPromo = cart.prices.subtotal >= promoPrice;

	if (hasPromo) {
		// Verifica se o brinde está no carrinho.
		const hasGift = cart.items.some(
			(item) =>
				item.product_id === gift.productId &&
				item.variant_id === gift.variantId,
		);
		if (hasGift) {
			// Se o brinde está no carrinho e o carrinho atinge o valor mínimo para ganhar o brinde, renderiza a notificação de brinde.
			nube.render("corner_bottom_right", <GiftNotification />);
			return;
		}
		// Se o brinde não está no carrinho, adiciona o brinde ao carrinho.
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
}

/**
 * Lógica para as páginas do storefront.
 *
 * @description
 * Exibe o banner no topo da página e as notificações de promoção e presente sempre que o carrinho é atualizado.
 *
 * @param nube - A instância do Nube SDK.
 * @param promotion - A promoção ativa.
 * @returns void
 */
export function Storefront(nube: NubeSDK, promotion: Promotion) {
	const { promoPrice } = promotion;

	// Renderiza o banner no topo da página.
	nube.render("before_main_content", <Banner promoPrice={promoPrice} />);

	// Escuta o evento de atualização do carrinho.
	nube.on("cart:update", ({ cart }) => {
		// Se o carrinho atinge o valor mínimo, renderiza a notificação de brinde no canto inferior direito.
		if (cart.prices.subtotal >= promoPrice) {
			nube.render("corner_bottom_right", <GiftNotification />);
			return;
		}

		// Se o carrinho não atinge o valor mínimo, renderiza a notificação de promoção no canto inferior direito.
		nube.render(
			"corner_bottom_right",
			<PromoNotification
				promoPrice={promoPrice}
				cartSubtotal={cart.prices.subtotal}
			/>,
		);
	});
}
