# Video Production Guide for Sacred Greeks Onboarding

## Quick Start (30 Minutes to Record)

### Prerequisites
1. **Clean Test Account**: Create a fresh account with sample data
2. **Screen Recorder**: Install [Loom](https://loom.com) (free, easy) or [Screen Studio](https://screen.studio) (paid, polished)
3. **Script**: Review `ONBOARDING_VIDEO_SCRIPT.md`

### Recording Steps

#### 1. Prepare Your Screen (5 minutes)
- [ ] Close all unnecessary apps and tabs
- [ ] Set browser window to exactly 1920x1080 or 16:9 ratio
- [ ] Log into test account at Sacred Greeks app
- [ ] Have these pages ready in tabs:
  - Dashboard
  - Devotional page
  - Prayer Wall
  - Progress page
  - P.R.O.O.F. assessment

#### 2. Practice Run (5 minutes)
- [ ] Do a dry run without recording
- [ ] Time yourself - aim for 28-32 seconds
- [ ] Practice smooth scrolling and transitions
- [ ] Mark where you'll pause for voice-over

#### 3. Record Screen (10 minutes)
**Loom Instructions**:
1. Click Loom extension → "Screen Only"
2. Select "Current Tab" or "Entire Screen"
3. Click "Start Recording"
4. Navigate through features smoothly:
   - Dashboard overview (2 sec hold)
   - Scroll to daily devotional (2 sec)
   - Click to Prayer Wall (2 sec hold)
   - Show Bible study interface (2 sec)
   - View Progress dashboard (2 sec)
   - Show P.R.O.O.F. assessment (2 sec)
   - Return to dashboard (2 sec)
5. Click "Stop" when done

**Pro Tips**:
- Use smooth, deliberate mouse movements
- Pause briefly on each feature (2 seconds)
- Avoid rapid clicking or scrolling
- If you mess up, just restart - it's quick!

#### 4. Add Voice-Over (10 minutes)
**Option A: Loom Built-in**
1. Click "Edit" on your video
2. Record voice-over while watching
3. Match timing to script

**Option B: External Audio**
1. Use Voice Memos (Mac) or Voice Recorder (Windows)
2. Record script with phone or mic
3. Upload to video editing software
4. Sync audio with video

**Voice Recording Tips**:
- Record in a quiet room
- Speak clearly and confidently
- Smile while talking (it comes through!)
- Do 2-3 takes and pick the best

#### 5. Final Polish (5 minutes)
- [ ] Add title card: "Welcome to Sacred Greeks"
- [ ] Add end card: "Let's Get Started!"
- [ ] Add subtle background music (optional)
- [ ] Export as MP4 (1080p)

---

## Hosting Your Video

### Option 1: YouTube (Recommended for MVP)
1. Upload to YouTube as "Unlisted"
2. Copy embed code
3. Update `OnboardingVideoPlayer.tsx`:
   ```typescript
   const videoUrl = "https://www.youtube.com/embed/YOUR_VIDEO_ID";
   const hasVideo = true;
   ```

### Option 2: Direct Upload to Supabase
1. Go to Supabase dashboard → Storage
2. Create bucket: `onboarding-videos` (public)
3. Upload MP4 file
4. Get public URL
5. Update component with direct video URL

### Option 3: Vimeo (Professional)
1. Upload to Vimeo
2. Enable privacy settings (require password or domain whitelist)
3. Copy embed code
4. Update component with Vimeo embed URL

---

## Alternative: AI Video Generation

If you don't want to record yourself:

### Using Synthesia or D-ID
1. Write script from `ONBOARDING_VIDEO_SCRIPT.md`
2. Upload screenshots of each feature
3. Select AI avatar and voice
4. Generate video (takes 5-10 minutes)
5. Download and upload to hosting

**Pros**: Professional, quick, consistent
**Cons**: Less authentic, costs $30-50/month

### Using Loom AI
1. Record screen only
2. Use Loom's AI to generate voice-over from text
3. Much cheaper than Synthesia
4. Still feels authentic

---

## Testing Checklist

Before deploying to production:

- [ ] Video plays smoothly on desktop
- [ ] Video plays on mobile devices
- [ ] Video is under 30 seconds
- [ ] Audio is clear and audible
- [ ] No sensitive data visible (emails, passwords, etc.)
- [ ] All features shown match current app
- [ ] Skip button works
- [ ] Video doesn't slow down onboarding flow
- [ ] Subtitles/captions added for accessibility

---

## Quick Alternative: No Video Yet

The component gracefully handles having no video:
- Shows beautiful feature preview instead
- Displays coming soon message
- Allows users to continue onboarding
- No broken experience

Just deploy as-is and add video later when ready!

---

## Need Help?

- **Screen Recording Issues**: Try [OBS Studio](https://obsproject.com) (free, powerful)
- **Audio Problems**: Use [Audacity](https://www.audacityteam.org) to clean up audio
- **Editing**: [DaVinci Resolve](https://www.blackmagicdesign.com/products/davinciresolve) is free and professional
- **Quick & Easy**: Just use Loom - seriously, it's the fastest way!

---

## Pro Version (Future Enhancement)

Consider these additions later:
- Interactive hotspots (click to learn more)
- Multiple language versions
- A/B test different video lengths
- Analytics on video completion rates
- User-specific personalization ("Hi [Name]!")
