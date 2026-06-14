# Country Search

[Countries GraphQL API](https://countries.trevorblades.com/)를 사용해 국가를 검색하고 상세 정보를 확인하는 Next.js 앱입니다.

**Live Demo:** [https://assash17.github.io/country/](https://assash17.github.io/country/)

## 기능

- 국가 이름으로 실시간 검색 (정규식 기반, 대소문자 무시)
- 국가 목록 카드 UI (국기, 수도 표시)
- 국가 상세 페이지 (`/country/[code]`) — 코드, 수도, 통화, 전화 코드, 대륙, AWS 리전, 사용 언어 등

## 기술 스택

- [Next.js 16](https://nextjs.org) (App Router)
- React 19
- TypeScript
- Tailwind CSS v4
- [graphql-request](https://github.com/jasonkuhrt/graphql-request)

## 프로젝트 구조

```
test/
├── app/
│   ├── layout.tsx              # 루트 레이아웃
│   ├── page.tsx                # 홈 — 국가 검색 및 목록
│   ├── globals.css
│   └── country/[code]/
│       ├── page.tsx            # 국가 상세 (정적 생성)
│       └── CountryDetail.tsx   # 국가 상세 클라이언트 컴포넌트
├── lib/
│   └── graphql.ts              # GraphQL 클라이언트 및 쿼리
├── public/                     # 정적 에셋
└── .github/workflows/
    └── deploy.yml              # GitHub Pages 배포
```

## 시작하기

의존성 설치:

```bash
npm install
```

개발 서버 실행:

```bash
npm run dev
```

브라우저에서 [http://localhost:3000](http://localhost:3000)을 열어 확인합니다.

## 스크립트

| 명령어 | 설명 |
|--------|------|
| `npm run dev` | 개발 서버 실행 |
| `npm run build` | 정적 사이트 빌드 (`out/` 생성) |
| `npm run start` | Next.js 서버 실행 (정적 export 빌드에는 `npx serve out` 사용) |
| `npm run lint` | ESLint 실행 |

## 데이터 소스

국가 데이터는 [https://countries.trevorblades.com/graphql](https://countries.trevorblades.com/graphql)에서 가져옵니다. 국기 이미지는 [flagcdn.com](https://flagcdn.com)을 사용합니다.

GraphQL 관련 로직은 `lib/graphql.ts`에 정의되어 있습니다.

- `getAllCountries()` — 전체 국가 목록 조회
- `getCountryByCode(code)` — 국가 코드로 상세 정보 조회
- `filterCountriesByName(countries, searchTerm)` — 이름으로 필터링

## 라우트

| 경로 | 설명 |
|------|------|
| `/` | 국가 검색 및 목록 |
| `/country/[code]` | 국가 상세 (예: `/country/KR`) |

## GitHub Pages 배포

이 프로젝트는 Next.js 정적 export(`output: "export"`)로 GitHub Pages에 배포할 수 있습니다.

### 자동 배포 (GitHub Actions)

1. GitHub 저장소에 코드를 push합니다.
2. 저장소 **Settings → Pages → Build and deployment**에서 Source를 **GitHub Actions**로 설정합니다.
3. `main`(또는 `master`) 브랜치에 push하면 `.github/workflows/deploy.yml` 워크플로가 빌드 후 자동 배포합니다.

배포 URL: [https://assash17.github.io/country/](https://assash17.github.io/country/)

### 로컬에서 정적 빌드 확인

GitHub Pages와 동일한 base path로 빌드하려면:

```bash
# Windows (PowerShell)
$env:NEXT_PUBLIC_BASE_PATH="/country"; npm run build

# macOS / Linux
NEXT_PUBLIC_BASE_PATH=/country npm run build
```

빌드 결과는 `out/` 디렉터리에 생성됩니다. 로컬에서 확인하려면 정적 서버로 `out/`을 서빙하면 됩니다.

```bash
npx serve out
```
