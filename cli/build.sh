pnpm --filter @sukacripta/tsup-config run build
pnpm --filter @sukacripta/math-bigint run build
pnpm --filter @sukacripta/server-bridge run build

pnpm --filter @suka-game/simple-slots-promo run build 

pnpm --filter @suka-back/user-auth-service-middleware run build

# Services apps
pnpm --filter @suka-back/balance-service-app run build
pnpm --filter @suka-back/user-auth-service-app run build

# Games apps
pnpm --filter @suka-game/simple-slots-server run build
