<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# PROJECT KNOWLEDGE BASE

**Generated:** 2026-04-18
**Commit:** 4facb6b
**Branch:** (current)

## OVERVIEW
Next.js 16.2.4 (App Router) 프로젝트. TypeScript + Tailwind CSS v4.

## STRUCTURE
```
test/
├── app/           # App Router pages
│   ├── layout.tsx # Root layout
│   ├── page.tsx  # Home page
│   └── globals.css
└── public/       # Static assets
```

## WHERE TO LOOK
| Task | Location | Notes |
|------|----------|-------|
| 라우트 추가 | app/page.tsx | App Router |
| 레이아웃 | app/layout.tsx | RootLayout |
| 스타일 | app/globals.css | Tailwind CSS |
| 설정 | next.config.ts | Next.js 설정 |

## CODE MAP
| Symbol | Type | Location | Role |
|--------|------|----------|-------|
| Home | Page | app/page.tsx:3 | 메인 페이지 컴포넌트 |
| RootLayout | Layout | app/layout.tsx:20 | 루트 레이아웃 |
| geistSans | Font | app/layout.tsx:5 | GeistSans 폰트 |
| geistMono | Font | app/layout.tsx:10 | GeistMono 폰트 |

## CONVENTIONS
- App Router 사용 (`app/` 디렉토리)
- Server Components 기본
- Tailwind CSS v4 (postcss.config.mjs)
- 경로 alias: `@/*` → `./*`

## ANTI-PATTERNS (THIS PROJECT)
- `app/` 외부의 페이지 파일은 사용하지 않음
- Pages Router 미사용

## COMMANDS
```bash
npm run dev    # 개발 서버
npm run build  # 프로덕션 빌드
npm run lint   # ESLint
npm run start # 프로덕션 서버 실행
```

## NOTES
- Tailwind CSS v4: postcss.config.mjs 사용 (旧 v3 와 다름)
- Next.js 16.x: App Router 가 표준
- dark 모듈: `dark:` 접두사 사용 (globals.css 에서 정의)