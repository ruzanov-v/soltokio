# Services apps
pnpm --filter @suka-back/balance-service-app run dev & \
pnpm --filter @suka-back/user-auth-service-app run dev & \

# Games apps
pnpm --filter @suka-game/simple-slots-server run dev
