import { Toast } from "@tiendanube/nube-sdk-jsx";
import { formatCurrency } from "../utils";

export type PromoNotificationProps = {
	promoPrice: number;
	cartSubtotal: number;
};

export function PromoNotification({
	promoPrice,
	cartSubtotal,
}: PromoNotificationProps) {
	const value = formatCurrency(promoPrice - cartSubtotal);
	const message = `Para aproveitar a oferta, você precisa adicionar mais produtos ao carrinho. O valor mínimo do carrinho é de R$ 200,00. Faltam ${value} para aproveitar a oferta.`;
	return (
		<Toast.Root variant="warning" duration={10000}>
			<Toast.Title>🔥 Oops!</Toast.Title>
			<Toast.Description>{message}</Toast.Description>
		</Toast.Root>
	);
}
