import { Box, Text } from "@tiendanube/nube-sdk-jsx";
import { styled } from "@tiendanube/nube-sdk-ui";
import { formatCurrency } from "../utils";

const Container = styled(Box)`
	background: #f8fafc;
	border: 1px solid #e2e8f0;
	border-radius: 8px;
	padding: 24px;
	margin: 16px;
`;

const Card = styled(Box)`
	background: white;
	border: 1px solid #e2e8f0;
	border-radius: 8px;
	padding: 32px;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	width: 100%;
	text-align: center;
`;

const Title = styled(Text)`
	color: #1a202c;
	font-size: 24px;
	font-weight: 600;
	margin-bottom: 8px;
`;

const Subtitle = styled(Text)`
	color: #4a5568;
	font-size: 16px;
	margin-bottom: 24px;
`;

const PromoText = styled(Text)`
	color: #4a5568;
	font-size: 16px;
	margin-bottom: 8px;
`;

const PromoPrice = styled(Text)`
	background: linear-gradient(135deg, #e53e3e 0%, #ff6b6b 50%, #e77d7d 100%);
	-webkit-background-clip: text;
	-webkit-text-fill-color: transparent;
	background-clip: text;
	font-size: 42px;
	font-weight: 700;
`;

export type BannerProps = {
	promoPrice: number;
};

export function Banner({ promoPrice }: BannerProps) {
	const title = `Compre acima de ${formatCurrency(promoPrice)} e ganhe um brinde especial`;
	return (
		<Container>
			<Card>
				<Title>🎁 Brinde Exclusivo</Title>
				<Subtitle>{title}</Subtitle>
				<PromoText>Valor mínimo do carrinho:</PromoText>
				<PromoPrice>{formatCurrency(promoPrice)}</PromoPrice>
				<Text color="secondary" style={{ marginTop: "16px", fontSize: "14px" }}>
					Adicione produtos ao carrinho e receba seu brinde automaticamente
				</Text>
			</Card>
		</Container>
	);
}
