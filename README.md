# Example of a Promotion app

Este é um exemplo de aplicação de promoção desenvolvida com a **Nube SDK** da Tiendanube. A aplicação demonstra como criar uma promoção automática que oferece um brinde exclusivo quando o carrinho atinge um valor mínimo.

## Funcionalidades

### 🎁 Sistema de Brinde Automático
- **Banner Promocional**: Exibe uma mensagem atrativa na página principal informando sobre a promoção
- **Notificação de Progresso**: Mostra quanto falta para atingir o valor mínimo do carrinho
- **Adição Automática**: Adiciona automaticamente o brinde quando o valor mínimo é atingido
- **Notificação de Sucesso**: Confirma quando o brinde foi adicionado com sucesso

### 🔄 Comportamento Dinâmico
- **Monitoramento do Carrinho**: Acompanha mudanças no carrinho em tempo real
- **Renderização Condicional**: Exibe diferentes componentes baseado no estado atual
- **Integração com Checkout**: Funciona tanto na página principal quanto no checkout

## Arquitetura

A aplicação utiliza a **Nube SDK** que roda em um ambiente seguro dentro de WebWorkers, garantindo isolamento entre aplicações. A comunicação é feita 100% através de eventos:

- **Eventos de Entrada**: `cart:update` - recebe atualizações do carrinho
- **Eventos de Saída**: `cart:add` - adiciona produtos ao carrinho
- **Renderização**: Utiliza slots específicos como `corner_bottom_right` e `before_main_content`

## Componentes

- **Banner**: Exibe a promoção na página principal
- **PromoNotification**: Notifica sobre o progresso para atingir o valor mínimo
- **GiftNotification**: Confirma quando o brinde foi adicionado

## Configuração

O valor mínimo da promoção e o brinde são configurados no arquivo `api.ts`:
- Valor mínimo: R$ 200,00
- Produto brinde: ID 123, Variante 456

## Available Scripts

### Development

- `npm run dev` - Starts local development server
- `npm run build` - Builds the project using tsup
- `npm test` - Runs unit tests
- `npm run test:watch` - Runs tests in watch mode (automatically re-runs when changes are detected)
- `npm run test:coverage` - Runs tests and generates a coverage report

### Code Quality

- `npm run format` - Formats all project files using Biome
- `npm run lint` - Runs linting on all project files using Biome

## Technologies Used

- [TypeScript](https://www.typescriptlang.org/)
- [Vitest](https://vitest.dev/) for testing
- [Biome](https://biomejs.dev/) for formatting and linting
- [tsup](https://tsup.egoist.dev/) for building
