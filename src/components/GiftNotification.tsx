import { Toast } from "@tiendanube/nube-sdk-jsx";

/**
 * Notificação de brinde.
 *
 * @description
 * Exibe a notificação de brinde com a cor padrão do tema da loja para mensagens de sucesso.
 *
 * @returns void
 */
export function GiftNotification() {
	return (
		<Toast.Root variant="success" duration={10000}>
			<Toast.Title>🔥 Parabéns!.</Toast.Title>
			<Toast.Description>Você ganhou um brinde exclusivo!</Toast.Description>
		</Toast.Root>
	);
}
