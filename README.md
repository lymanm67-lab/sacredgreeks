# Sacred Greeks Decision Guide

A production-ready web application that helps Christians in Black Greek Letter Organizations process difficult decisions and pressure using the P.R.O.O.F. framework from "Sacred, Not Sinful."

## Features

- **Three Guided Scenarios**: Clip/sermon response, pressure to denounce, or planning faith-based events
- **Multi-Step Assessment**: Role identification, emotional state, and scenario-specific questions
- **P.R.O.O.F. Framework Results**: Personalized guidance using Process, Rituals, Oaths, Obscurity, and Founding
- **5 Persona Types Integration**: Link to external assessment for understanding pressure responses
- **Email Capture**: Users can receive their reflection via email
- **Mobile Responsive**: Clean, calm design optimized for all devices
- **Admin Dashboard**: Simple password-protected view of submissions

## Tech Stack

- **Frontend**: React 18 + TypeScript + Vite
- **Styling**: Tailwind CSS with custom design system
- **Backend**: Supabase (via Lovable Cloud)
- **Routing**: React Router v6
- **UI Components**: Shadcn UI + Radix UI primitives

## Local Development

### Prerequisites

- Node.js 18+ or Bun
- Supabase account (provided via Lovable Cloud)

### Installation

```bash
# Install dependencies
npm install
# or
bun install

# Start development server
npm run dev
# or
bun dev
```

The app will be available at `http://localhost:5173`

### Environment Variables

Environment variables are automatically configured via Lovable Cloud:
- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_PUBLISHABLE_KEY`

## Project Structure

```
src/
├── components/
│   ├── sacred-greeks/
│   │   ├── SacredGreeksStep1.tsx    # Scenario selection
│   │   ├── SacredGreeksStep2.tsx    # Questions and emotions
│   │   └── SacredGreeksResults.tsx  # P.R.O.O.F. framework results
│   └── ui/                          # Reusable UI components
├── lib/
│   └── scoring.ts                   # Scoring logic and result determination
├── pages/
│   ├── Index.tsx                    # Landing page with scenario cards
│   ├── Guide.tsx                    # Main assessment flow
│   └── Admin.tsx                    # Admin dashboard
├── types/
│   └── assessment.ts                # TypeScript interfaces
└── integrations/
    └── supabase/                    # Auto-generated Supabase client
```

## Customization Guide

### Updating Questions

**Step 2 Common Questions** (all scenarios):
Edit `src/components/sacred-greeks/SacredGreeksStep2.tsx`:
- Lines 11-18: `roles` array
- Lines 20-30: `emotions` array

**Scenario-Specific Questions**:
Same file, lines 137-243:
- Lines 137-169: "clip" scenario questions
- Lines 171-209: "pressure" scenario questions  
- Lines 211-243: "event" scenario questions

### Adjusting Scoring Logic

Edit `src/lib/scoring.ts`, function `calculateSacredGreeksScores`:

**Internal Scores** (lines 103-109):
- `biblicalClarity`: 1-5, higher = clearer biblical understanding
- `consciencePeace`: 1-5, higher = more peace
- `relationalRisk`: 1-5, higher = more relational pressure
- `symbolRisk`: 1-5, higher = more concern about symbols/rituals
- `emotionalPressure`: 1-5, higher = more emotional stress

**Scoring Rules** (lines 112-144):
- Lines 112-128: Emotion-based scoring
- Lines 131-144: Scenario-specific adjustments

**Result Type Thresholds** (lines 152-160):
```typescript
if (scores.emotionalPressure >= 4 || scores.relationalRisk >= 4) {
  resultType = 'high_pressure';
} else if (answers.scenario === 'event') {
  resultType = 'ministry_idea';
} else {
  resultType = 'steady_language';
}
```

### Updating Result Page Content

Edit `src/components/sacred-greeks/SacredGreeksResults.tsx`:

**Intro Text** (lines 15-24):
```typescript
const getIntro = () => {
  switch (resultType) {
    case 'high_pressure': return "Your message here...";
    case 'ministry_idea': return "Your message here...";
    default: return "Your message here...";
  }
};
```

**P.R.O.O.F. Section Content** (lines 26-61):
Each section has:
- `title`: The P.R.O.O.F. principle
- `content`: Conditional content based on `resultType`

**External Links** (lines 90-140):
- Line 102: Visit Sacred Greeks
- Line 112: Start Here anchor
- Line 122: Sacred, Not Sinful book
- Line 132: Study Guide
- Line 142: Podcast (placeholder)

### Changing Colors and Branding

**Primary Colors** (`src/index.css`):
```css
--primary: 221 83% 53%;           /* Royal Blue */
--primary-foreground: 0 0% 100%;  /* White text on blue */
--sacred: 221 83% 53%;            /* Same as primary */
--sacred-foreground: 0 0% 100%;   /* White text */
```

**Tailwind Config** (`tailwind.config.ts`):
```typescript
sacred: {
  DEFAULT: "hsl(var(--sacred))",
  foreground: "hsl(var(--sacred-foreground))",
},
```

### Admin Access

**Password Protection** (`src/pages/Admin.tsx`, line 12):
```typescript
const ADMIN_PASSWORD = "admin123"; // Change this!
```

For production, use environment variables:
```typescript
const ADMIN_PASSWORD = import.meta.env.VITE_ADMIN_PASSWORD;
```

## Database Schema

Table: `assessment_submissions`

| Column | Type | Description |
|--------|------|-------------|
| id | uuid | Primary key |
| track | text | Always "sacred_greeks" |
| scenario | text | "clip", "pressure", or "event" |
| answers_json | jsonb | All user responses |
| scores_json | jsonb | Internal scoring values |
| result_type | text | "steady_language", "high_pressure", or "ministry_idea" |
| email | text | Optional email for follow-up |
| consent_to_contact | boolean | Email opt-in status |
| created_at | timestamp | Submission timestamp |
| updated_at | timestamp | Last modified timestamp |

## Deployment

This app is designed to be deployed via Lovable:

1. Click **Publish** in the Lovable interface
2. Your app is automatically deployed with backend infrastructure
3. Database migrations run automatically
4. No additional configuration needed

## External Integrations

- **Sacred Greeks Website**: https://sacredgreeks.com/
- **5 Persona Types Assessment**: https://drlymanmontgomery.involve.me/fmmpa
- **Study Guide**: https://gamma.app/docs/Christian-Greek-Life-Study-Guide-ihr8fq0g089n32t

## Future Enhancements

- [ ] Implement email sending for result delivery
- [ ] Add user authentication for saved assessments
- [ ] PDF export of results
- [ ] Analytics dashboard for admin
- [ ] Multilingual support

## License

Proprietary - All rights reserved

## Support

For questions or support, visit [SacredGreeks.com](https://sacredgreeks.com/)
