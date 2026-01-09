# PathForge

**Discover Your Cybersecurity Career Path**

PathForge is an interactive career pathway platform that helps IT & Cybersecurity students discover best-fit roles and receive a clear, actionable 90-day learning roadmap in under 3 minutes.

## Features

- **Location Selection**: Choose your region for localized salary data and job market insights
- **Guided Questionnaire**: Answer 6 simple questions about your interests, skills, and goals
- **Intelligent Matching**: Rule-based scoring system matches you with the best-fit career roles
- **AI-Powered Insights**: Gemini AI provides location-specific salary ranges, top employers, and job market trends
- **Personalized Results**: Get detailed role information including skills, tools, and certifications
- **90-Day Roadmap**: Structured learning path divided into three focused months

## Supported Locations

- United Arab Emirates 🇦🇪
- United States 🇺🇸
- United Kingdom 🇬🇧
- India 🇮🇳
- Singapore 🇸🇬
- Australia 🇦🇺
- Canada 🇨🇦
- Germany 🇩🇪
- Saudi Arabia 🇸🇦

## Tech Stack

- **React 19** with TypeScript
- **Vite** for fast development and builds
- **CSS Modules** for scoped styling
- **Google Gemini AI** for location-specific insights
- No backend - pure frontend application

## Project Structure

```
src/
├── components/          # Reusable UI components
│   └── Roadmap.tsx     # 90-day roadmap display
├── data/               # Static data (roles, questions, locations)
│   ├── roles.ts        # Career role definitions
│   ├── questions.ts    # Quiz questions with scoring weights
│   └── locations.ts    # Supported regions and currencies
├── engine/             # Business logic
│   └── scoring.ts      # Decision engine for role matching
├── hooks/              # Custom React hooks
│   └── useQuiz.ts      # Quiz state management
├── pages/              # Page components
│   ├── Landing.tsx     # Home page with CTA
│   ├── LocationSelector.tsx  # Region selection
│   ├── Quiz.tsx        # Question display
│   └── Results.tsx     # Results and role details
├── services/           # External API integrations
│   └── gemini.ts       # Gemini AI service
├── styles/             # Global styles
│   └── global.css      # Design system and CSS variables
└── types/              # TypeScript definitions
    └── index.ts        # All type interfaces
```

## Getting Started

```bash
# Install dependencies
npm install

# Copy environment template
cp .env.example .env

# Add your Gemini API key to .env (optional - fallback data available)
# Get your key from: https://makersuite.google.com/app/apikey

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `VITE_GEMINI_API_KEY` | Google Gemini API key for AI-powered insights | Optional |

> Note: The app works without a Gemini API key using fallback data for salary ranges and employers.

## Extending the Project

### Adding a New Career Role

1. Add the role ID to `RoleId` type in `src/types/index.ts`
2. Create a new role object in `src/data/roles.ts` following the `CareerRole` interface
3. Update question weights in `src/data/questions.ts` to include scoring for the new role

### Adding a New Location

1. Add the location ID to `LocationId` type in `src/types/index.ts`
2. Create a new location object in `src/data/locations.ts`
3. Add fallback employer data in `src/services/gemini.ts`

### Adding a New Question

1. Add a new question object to the `QUESTIONS` array in `src/data/questions.ts`
2. Each answer must include weights for all role IDs
3. Weights can range from -2 to +3

### Customizing the Scoring

The scoring logic is in `src/engine/scoring.ts`. Key functions:
- `calculateScores()`: Aggregates answer weights into role scores
- `getTopRoles()`: Returns the top N matching roles
- `generateResult()`: Creates the complete quiz result

## Gemini AI Integration

The `src/services/gemini.ts` service provides:
- **Location-specific salary ranges** in local currency
- **Regional demand levels** for each role
- **Top employers** in the selected country
- **Job market trends** analysis
- **Local tips** for job seekers
- **Work permit information** for international candidates

If no API key is configured, the app uses comprehensive fallback data.

## Design System

CSS variables are defined in `src/styles/global.css`:

- Colors: Dark theme with purple accent
- Typography: Inter font family
- Spacing: 4px base unit
- Animations: Smooth transitions and fade effects

## Career Roles Included

1. **SOC Analyst** - Security Operations Center defense
2. **Penetration Tester** - Ethical hacking and vulnerability assessment
3. **Cloud Security Engineer** - AWS/Azure/GCP security
4. **Security Engineer** - Security infrastructure and automation
5. **Network Security Engineer** - Network infrastructure protection
6. **DevSecOps Engineer** - Security in CI/CD pipelines

## License

MIT
