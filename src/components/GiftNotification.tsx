import { Toast } from "@tiendanube/nube-sdk-jsx";

export function GiftNotification() {
	return (
		<Toast.Root variant="success" duration={10000}>
			<Toast.Title>🔥 Parabéns!.</Toast.Title>
			<Toast.Description>Você ganhou um brinde exclusivo!</Toast.Description>
		</Toast.Root>
	);
}
