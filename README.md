# 🌐 Aditya Nair — Portfolio

A stunning personal portfolio website built with a **Glassmorphism × Cybercore** aesthetic. Features animated particle backgrounds, neon accents, frosted-glass UI, and smooth scroll-driven animations.

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)

---

## ✨ Features

- **Glassmorphism Design** — Frosted-glass cards with `backdrop-filter`, translucent borders, and animated corner accents
- **Cybercore Aesthetic** — Neon cyan/magenta/purple palette, canvas particle grid, scanline overlay
- **Smart Navbar** — Auto-hides on scroll down, reappears on scroll up, glass effect on scroll
- **Typing Animation** — Name types out letter-by-letter with a rotating subtitle loop
- **Scroll Animations** — Elements fade/slide in as they enter the viewport (IntersectionObserver)
- **Animated Skill Bars** — Progress bars fill with a neon glow on scroll
- **Counter Animation** — Stats count up with eased motion
- **Interactive Cursor** — Subtle glow follows the mouse
- **Contact Form** — Validated form with animated success state
- **Fully Responsive** — Mobile hamburger menu, adaptive grids, touch-friendly

## 📂 Project Structure

```
├── index.html      # Main HTML — all sections and structure
├── style.css       # Complete design system (~900 lines)
├── script.js       # Animations, particles, typing, scroll logic
├── README.md       # You are here
├── LICENSE          # MIT License
└── .gitignore      # Git ignore rules
```

## 🚀 Getting Started

### View Locally

No build step needed — just open the file in your browser:

```bash
# Clone the repo
git clone https://github.com/your-username/portfolio.git
cd portfolio

# Open in browser
open index.html        # macOS
start index.html       # Windows
xdg-open index.html    # Linux
```

### Serve Locally (optional)

For a proper local server (avoids CORS issues if you add assets later):

```bash
# Using Python
python -m http.server 3000

# Using Node.js
npx serve . -p 3000
```

Then visit `http://localhost:3000`

## 🎨 Customization

Edit **`index.html`** to update:
- Your name, bio, and location
- Skills and proficiency percentages
- Project titles, descriptions, and links
- Certifications
- Hobbies
- Contact info and social links

Edit **`style.css`** custom properties (`:root`) to change:
- Color palette (`--neon-cyan`, `--neon-magenta`, etc.)
- Fonts (`--font-display`, `--font-body`, `--font-mono`)
- Glass effect intensity (`--glass-blur`, `--glass-bg`)
- Spacing and layout (`--container-width`, `--section-padding`)

## 🌍 Deployment

This is a static site — deploy anywhere:

| Platform | How |
|----------|-----|
| **GitHub Pages** | Push to `main` → Settings → Pages → Deploy from branch |
| **Netlify** | Drag & drop the folder, or connect the repo |
| **Vercel** | Import the repo, zero config needed |
| **Cloudflare Pages** | Connect repo → Build command: _(none)_ → Output: `/` |

## 📄 License

This project is licensed under the [MIT License](LICENSE).

---

<p align="center">
  Designed & Built with ❤️ by <strong>Aditya Nair</strong>
</p>
