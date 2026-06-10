# Web APP — Project Structure

---

## Directory Tree

```
eyangwa-web/
├── .env                          # Environment variables
├── .env.example                  # Example Environment variables
├── .github/workflows/main.yml    # CI/CD (currently dummy)
├── .prettierrc.json              # semicolons, double quotes, 4-space tabs, 140 width
├── Dockerfile                    # node:20-alpine build → nginx:1.27.1-alpine serve
├── index.html                    # SPA entry — "Biometrics Identifier System"
├── nginx.conf                    # gzip, SPA fallback, caching policies
├── package.json                  # pnpm 8.4.0
├── pnpm-lock.yaml
├── public/
│   └── favicon.ico
├── src/
│   ├── App.tsx                   # Root — BrowserRouter, Routes, Auth guard
│   ├── main.tsx                  # Entry — Providers: MUI → PhotoProvider
│   ├── env.ts                    # Type-safe environment config reader
│   ├── index.css                 # Global CSS variables + utility classes
│   ├── types.d.ts                # All TypeScript type definitions
|   ├── theme.ts                    # MUI theme & palette
│   ├── assets/
│   │   ├── css/spinner.css
│   │   └── images/               # Fingerprint images, logos, placeholders
│   ├── components/
│   │   ├── AutoLogout.tsx        # Periodic JWT expiry check (30 min)
│   │   ├── ButtonCapture.tsx     # Floating camera capture button
│   │   ├── CopyBtn.tsx           # Clipboard copy button
│   │   ├── Footer.tsx
│   │   ├── ImageBrowser.tsx      # Image gallery/selector
│   │   ├── ImageCropper.tsx      # ReactCrop wrapper
│   │   ├── ListenMqEvent.tsx     # MQTT fingerprint event listener
│   │   ├── Paginater.tsx         # Pagination
│   │   ├── PersonPlaceholder.tsx # Avatar placeholder
│   │   ├── SelectCamera.tsx      # Webcam selector dropdown
│   │   ├── SignatureComponent.tsx# Signature pad wrapper
│   │   ├── Spinner.tsx
│   │   └── XButton.tsx           # Close/dismiss button
│   ├── layouts/
│   │   ├── Sidebar/            # App shell — drawer sidebar + app bar
│   │   │   ├── index.tsx
│   │   │   ├── Menu.tsx          # Sidebar navigation items
│   │   │   └── sx.ts             # MUI sx style variants
│   │   └── Navbar.tsx            # Simple top navbar with back button
│   ├── middleware/
│   │   └── Auth.tsx              # JWT route guard → redirect /login
│   ├── models/
│   │   └── person.ts             # Person model initializers & constants
│   ├── pages/
│   │   ├── About/index.tsx
│   │   ├── Contact/
│   │   │   ├── index.tsx
│   │   │   ├── Info.tsx
│   │   │   ├── RepotrProblem.tsx # Note: filename typo "Repotr"
│   │   │   └── Terms.tsx
│   │   ├── CreateProfile/        # 4-step registration wizard
│   │   │   ├── index.tsx         # Stepper: PersonalInfo → FAP60 → Photo → Signature
│   │   │   └── components/
│   │   │       ├── FAP60.tsx     # Fingerprint capture (FAP60 scanner)
│   │   │       ├── FingerPrint.tsx
│   │   │       ├── PersonalInfo.tsx
│   │   │       ├── Signature.tsx
│   │   │       └── TakePhoto.tsx
│   │   ├── EditProfile/
│   │   │   ├── index.tsx
│   │   │   └── components/
│   │   │       ├── FingerPrint.tsx
│   │   │       ├── PersonalInfo.tsx
│   │   │       ├── Signature.tsx
│   │   │       └── TakePhoto.tsx
│   │   ├── History/
│   │   │   ├── index.tsx         # Paginated table + filters
│   │   │   ├── FilterForm.tsx
│   │   │   ├── ViewProfile.tsx   # Profile detail modal
│   │   │   └── ViewProfileQs.tsx # Quick questionnaire view
│   │   ├── Home/index.tsx        # Dashboard — registration counts
│   │   ├── Login/
│   │   │   ├── index.tsx
│   │   │   └── sx.ts
│   │   ├── Review/index.tsx      # Final review before submission
│   │   ├── Security/             # Identity verification (tabs)
│   │   │   ├── index.tsx         # Tab: Fingerprint / Face
│   │   │   ├── FaceRecognize.tsx
│   │   │   ├── FAP20.tsx         # FAP20 fingerprint verification
│   │   │   └── FingerPrintVerify.tsx
│   │   ├── Setting/
│   │   │   ├── index.tsx
│   │   │   └── GeneralTab.tsx
│   │   ├── SignatureMobile/index.tsx
│   │   └── Verify/               # Token-based verification
│   │       ├── index.tsx
│   │       └── Spinner.tsx
│   ├── services/
│   │   ├── api.ts               # REST API client (all endpoints)
│   │   ├── cookies.ts            # Cookie storage (PERSON_ID, 3-day expiry)
│   │   ├── localStorage.ts       # Typed localStorage wrapper
│   │   ├── sessionStorage.ts     # Typed sessionStorage wrapper
│   └── utils/
│       ├── alerts.ts             # SweetAlert2 wrappers
│       ├── functions.ts          # JWT extraction utility
│       ├── imgPreview.ts         # Canvas image preview utilities
│       ├── mqclient.ts           # MQTT client singleton
│       └── http_client.ts        # Reusable fetch instance + auth interceptor
├── tsconfig.json                 # Project references root
├── tsconfig.app.json             # ES2020, React JSX, bundler module resolution
└── tsconfig.node.json            # For vite.config.ts
```

---

## Routing

| Path | Page | Auth |
|------|------|------|
| `/login` | Login | — |
| `/verify/:token` | Token verification | — |
| `/signature-mobile` | Signature capture | — |
| `/app` | Dashboard (Home) | ✓ |
| `/app/history` | Registration history | ✓ |
| `/app/setting` | Settings | ✓ |
| `/app/about` | About | ✓ |
| `/app/contact` | Contact | ✓ |
| `/app/create-profile` | Registration wizard | ✓ |
| `/app/edit-profile` | Edit profile | ✓ |
| `/app/review` | Review profile | ✓ |
| `/app/security` | Identity verification | ✓ |
| `*` | Redirect → `/app` | — |

---

## Architecture Notes

- **Entry point** (`src/main.tsx`): React.StrictMode → MUI ThemeProvider → PhotoProvider → App
- **Auth**: JWT in `localStorage("ACCESS_TOKEN")`. `Auth` middleware checks `exp` claim. `AutoLogout` polls every 30 min.
- **State**: No global store — local `useState` + typed `localStorage`/`sessionStorage`/`cookies` services.
- **API**: Axios instance with auto `Authorization` header. All endpoints in `src/services/rest.ts`. Public PDV data via raw `fetch`.
- **Real-time**: MQTT client singleton (`mqclient.ts`) connects to `wss://mqtt.laogw.la:8084/mqtt`. Topic: `fingerprint`. Local WebSocket bridges on ports 7001 (FAP20) and 7002 (FAP60) for attached scanners.
- **Biometrics**: Face detection via face-api.js. Fingerprint capture via FAP20/FAP60 WebSocket protocols. Signature via `signature_pad`.
- **Docker**: Multi-stage build (node → nginx alpine). Environment variables baked at build time. nginx configured for SPA fallback, gzip, and caching.
- **Build modes**: `dev`, `build:dev`, `build:stag` (default), `build:prod`.

---

## Environment Variables (`.env`)

| Variable | Value |
|----------|-------|
| `VITE_APP_REST_API_URL` | `https://bis.laogw.la:8443` |
| `VITE_APP_REST_API_BASE_PATH` | `api` |
| `VITE_APP_REST_API_VERSION` | `v1` |
| `VITE_APP_MQTT_HOST` | `mqtt.laogw.la` |
| `VITE_APP_MQTT_PORT` | `8084` |
| `VITE_APP_MQTT_PROTOCOL` | `wss` |
| `VITE_APP_MQTT_USER` | `evisa` |
| `VITE_APP_MQTT_PASSWORD` | `Abc@2022` |
| `VITE_APP_MQTT_PATH` | `mqtt` |
| `VITE_APP_MQTT_TOPIC` | `fingerprint` |
| `VITE_APP_LIMIT_FILE_SIZE` | `10` (MB) |
