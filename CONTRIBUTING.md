# Contributing

## Setup

```bash
git clone https://github.com/froggy1014/katok-ui
cd katok-ui
pnpm install
pnpm storybook   # component development
pnpm dev         # demo site
```

## Adding a component

1. Create `components/ui/kakao/your-component.tsx`
2. Add stories in `stories/kakao/` — cover every use case, check light and dark
3. Register in `registry.json`, listing every file the component imports
4. Run `pnpm typecheck && pnpm lint && pnpm test && pnpm test:stories`

## Guidelines

- UI-only — no business logic, no external state
- All values via `--kk-*` tokens (see `DESIGN.md`); every token needs light + dark
- New token values need an evidence grade (O / T / C / M) in `DESIGN.md`
- Device measurements are the most valuable contribution — include a screenshot and KakaoTalk version
- No Kakao logos, Kakao Friends characters, or font files
- Polymorphism via `render` prop

## Pull requests

Open a PR against `main`. Keep each PR focused on one component or fix.
