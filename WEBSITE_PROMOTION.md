# Sacred Greeks Life App - Website Promotion Guide

## 🎉 Your App is Ready to Share!

Your app is now live at: **https://www.sacredgreekslife.com**

Below are ready-to-use code snippets you can add to **www.sacredgreeks.com** to promote the app.

---

## Option 1: Smart Banner (Top of Page)

**Best for:** Prominent visibility without being intrusive  
**Location:** Add this code right after your `<body>` tag

```html
<!-- Sacred Greeks Life App Banner -->
<style>
  .sacred-app-banner {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    background: linear-gradient(135deg, #2563eb 0%, #7c3aed 100%);
    color: white;
    padding: 12px 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    z-index: 9999;
    box-shadow: 0 2px 8px rgba(0,0,0,0.15);
    font-family: system-ui, -apple-system, sans-serif;
  }
  .sacred-app-banner-content {
    display: flex;
    align-items: center;
    gap: 16px;
  }
  .sacred-app-banner-icon {
    font-size: 24px;
  }
  .sacred-app-banner-text h3 {
    margin: 0;
    font-size: 16px;
    font-weight: 600;
  }
  .sacred-app-banner-text p {
    margin: 0;
    font-size: 13px;
    opacity: 0.9;
  }
  .sacred-app-banner-btn {
    background: white;
    color: #2563eb;
    padding: 10px 24px;
    border-radius: 8px;
    text-decoration: none;
    font-weight: 600;
    font-size: 14px;
    transition: transform 0.2s;
  }
  .sacred-app-banner-btn:hover {
    transform: scale(1.05);
  }
  .sacred-app-banner-close {
    background: rgba(255,255,255,0.2);
    border: none;
    color: white;
    width: 32px;
    height: 32px;
    border-radius: 50%;
    cursor: pointer;
    font-size: 20px;
    margin-left: 16px;
  }
  @media (max-width: 768px) {
    .sacred-app-banner {
      flex-direction: column;
      gap: 12px;
      padding: 16px;
    }
    .sacred-app-banner-text p {
      display: none;
    }
  }
</style>

<div id="sacred-app-banner" class="sacred-app-banner" style="display: none;">
  <div class="sacred-app-banner-content">
    <span class="sacred-app-banner-icon">📱</span>
    <div class="sacred-app-banner-text">
      <h3>Get the Sacred Greeks Life App</h3>
      <p>Daily devotionals, progress tracking, and community support</p>
    </div>
  </div>
  <div style="display: flex; align-items: center; gap: 12px;">
    <a href="https://www.sacredgreekslife.com" class="sacred-app-banner-btn">
      Open App
    </a>
    <button class="sacred-app-banner-close" onclick="closeSacredBanner()">×</button>
  </div>
</div>

<script>
  function closeSacredBanner() {
    document.getElementById('sacred-app-banner').style.display = 'none';
    localStorage.setItem('sacred-app-banner-closed', 'true');
  }
  
  // Show banner if not previously closed
  if (!localStorage.getItem('sacred-app-banner-closed')) {
    document.getElementById('sacred-app-banner').style.display = 'flex';
  }
</script>
```

---

## Option 2: Floating Button (Bottom Right)

**Best for:** Always visible without blocking content  
**Location:** Add this code before your closing `</body>` tag

```html
<!-- Sacred Greeks Life Floating Button -->
<style>
  .sacred-app-float {
    position: fixed;
    bottom: 24px;
    right: 24px;
    z-index: 9999;
  }
  .sacred-app-float-btn {
    background: linear-gradient(135deg, #2563eb 0%, #7c3aed 100%);
    color: white;
    padding: 16px 28px;
    border-radius: 50px;
    text-decoration: none;
    font-weight: 600;
    font-size: 16px;
    display: flex;
    align-items: center;
    gap: 8px;
    box-shadow: 0 4px 16px rgba(37, 99, 235, 0.4);
    transition: all 0.3s;
    font-family: system-ui, -apple-system, sans-serif;
  }
  .sacred-app-float-btn:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 24px rgba(37, 99, 235, 0.5);
  }
  @media (max-width: 768px) {
    .sacred-app-float {
      bottom: 16px;
      right: 16px;
    }
    .sacred-app-float-btn {
      padding: 14px 24px;
      font-size: 14px;
    }
  }
</style>

<div class="sacred-app-float">
  <a href="https://www.sacredgreekslife.com" class="sacred-app-float-btn">
    📱 Get the App
  </a>
</div>
```

---

## Option 3: In-Content CTA Card

**Best for:** Embedding within your page content  
**Location:** Add anywhere in your page content

```html
<!-- Sacred Greeks Life CTA Card -->
<div style="max-width: 600px; margin: 40px auto; padding: 32px; background: linear-gradient(135deg, #2563eb 0%, #7c3aed 100%); border-radius: 16px; color: white; text-align: center; box-shadow: 0 8px 32px rgba(37, 99, 235, 0.3); font-family: system-ui, -apple-system, sans-serif;">
  <div style="font-size: 48px; margin-bottom: 16px;">📱</div>
  <h2 style="margin: 0 0 12px 0; font-size: 28px; font-weight: 700;">Experience Sacred Greeks on the Go</h2>
  <p style="margin: 0 0 24px 0; font-size: 16px; opacity: 0.95; line-height: 1.6;">Track your spiritual journey with daily devotionals, prayer tools, and community support—all in one powerful app.</p>
  <div style="display: flex; gap: 16px; justify-content: center; flex-wrap: wrap;">
    <a href="https://www.sacredgreekslife.com" style="background: white; color: #2563eb; padding: 14px 32px; border-radius: 8px; text-decoration: none; font-weight: 600; font-size: 16px; display: inline-block;">
      Launch App
    </a>
    <a href="https://www.sacredgreekslife.com/qr-code" style="background: rgba(255,255,255,0.2); color: white; padding: 14px 32px; border-radius: 8px; text-decoration: none; font-weight: 600; font-size: 16px; display: inline-block; border: 2px solid white;">
      Get QR Code
    </a>
  </div>
</div>
```

---

## Option 4: Simple Text Link

**Best for:** Navigation menu or footer  
**Location:** Add to your navigation or footer

```html
<a href="https://www.sacredgreekslife.com" style="color: #2563eb; text-decoration: none; font-weight: 600;">
  📱 Get the App
</a>
```

---

## 🎯 QR Code

Want a QR code for printed materials or your website?

1. Visit: **https://www.sacredgreekslife.com/qr-code**
2. Click "Download QR Code"
3. Add the image to your website or print materials

---

## 📊 Tips for Maximum Impact

1. **Use Multiple Options**: The banner + floating button works great together
2. **Mobile-First**: These designs are already mobile-optimized
3. **Track Results**: Consider adding analytics to see click-through rates
4. **Update Content**: Change the text to match seasonal promotions or special features

---

## 🚀 Quick Setup Steps

1. Choose which promotional element(s) you want
2. Copy the code snippet(s) above
3. Paste into your sacredgreeks.com website HTML
4. Test on both desktop and mobile
5. Done! 🎉

---

## Need Help?

All of these are simple copy-paste solutions. No coding knowledge required! Just:
- Copy the entire code block
- Paste it into your website's HTML
- Save and publish

The app will automatically work across all devices!
