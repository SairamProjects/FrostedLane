# 🍦 Frosted Lane — Premium Frozen Desserts

A full-stack production-ready website for **Frosted Lane**, a premium ice-cream and dessert shop featuring frozen curls, waffles, and refreshing beverages.

> **Tagline:** *"Delicious Frozen Curls & Drinks"*

---

## 🚀 Tech Stack

| Layer      | Technology                          |
|------------|-------------------------------------|
| Frontend   | Next.js 16, React 19, TailwindCSS 4 |
| Animations | Framer Motion                       |
| Backend    | Next.js API Routes                  |
| Database   | PostgreSQL + Prisma ORM             |
| Auth       | JWT + bcrypt                        |
| Validation | Zod                                 |
| Deploy     | Docker, Vercel, AWS, On-prem        |

---

## 📂 Project Structure

```
frosted-lane/
├── app/
│   ├── api/           # API routes (menu, orders, contact, admin)
│   ├── admin/         # Admin login & dashboard
│   ├── menu/          # Menu page
│   ├── gallery/       # Gallery page
│   ├── about/         # About page
│   ├── contact/       # Contact page
│   ├── layout.tsx     # Root layout with Navbar, Footer, CartDrawer
│   ├── page.tsx       # Home page
│   └── globals.css    # TailwindCSS theme & custom styles
├── components/        # Reusable UI components
├── lib/               # Utilities (Prisma client, auth, API helpers)
├── prisma/
│   ├── schema.prisma  # Database schema
│   └── seed.ts        # Seed data (30+ menu items)
├── public/images/     # Static assets
├── Dockerfile         # Multi-stage Docker build
├── docker-compose.yml # Docker services (web + PostgreSQL)
└── .env               # Environment configuration
```

---

## ⚡ Quick Start (Local Development)

### Prerequisites
- Node.js 20+
- PostgreSQL running locally (or use Docker)

### 1. Install dependencies
```bash
npm install
```

### 2. Set up environment
```bash
cp .env.example .env
# Edit .env with your PostgreSQL connection URL
```

### 3. Set up database
```bash
npx prisma migrate dev --name init
npx prisma db seed
```

### 4. Run development server
```bash
npm run dev -- -p 3500
```

Website runs at: **http://localhost:3500**

---

## 🐳 Docker Setup

### Start with Docker Compose
```bash
docker-compose up --build -d
```

This starts:
- **PostgreSQL** on port 5435
- **Web app** on port 3500

### Seed the database (after first start)
```bash
docker exec frostedlane-web npx prisma migrate deploy
docker exec frostedlane-web npx prisma db seed
```

---

## 🔐 Admin Dashboard

Access the admin portal at: **http://localhost:3500/admin**

**Default Credentials:**
| Field    | Value                   |
|----------|-------------------------|
| Email    | admin@frostedlane.com   |
| Password | admin123                |

### Admin Features:
- ✅ Add / Edit / Delete menu items
- ✅ Mark items as "Popular"
- ✅ View and manage orders (update status)
- ✅ View contact messages

---

## 📋 Menu Categories

| Category       | Items | Price Range     |
|----------------|-------|-----------------|
| Fruit Curls    | 7     | ₹120 – ₹130    |
| Biscuit Curls  | 5     | ₹120 – ₹150    |
| Dry Fruit Curls| 3     | ₹190 – ₹200    |
| Custom Curls   | 1     | ₹120            |
| Choco Fruits   | 2     | ₹80 – ₹110     |
| Waffles        | 3     | ₹120 – ₹140    |
| Chill Sips     | 7     | ₹70 – ₹100     |
| Hot Sips       | 2     | ₹25 – ₹35      |

---

## 🌐 Pages

| Page     | Route              | Description                        |
|----------|--------------------|------------------------------------|
| Home     | `/`                | Hero, About, Favorites, CTA        |
| Menu     | `/menu`            | Dynamic menu from database          |
| Gallery  | `/gallery`         | Visual dessert gallery              |
| About    | `/about`           | Brand story and values              |
| Contact  | `/contact`         | Contact form (saves to DB)          |
| Admin    | `/admin`           | Admin login                         |
| Dashboard| `/admin/dashboard` | Menu CRUD, orders, messages         |

---

## 🔧 API Endpoints

| Method | Endpoint              | Description                    | Auth  |
|--------|-----------------------|--------------------------------|-------|
| GET    | `/api/menu`           | Get menu by category           | No    |
| POST   | `/api/orders`         | Place an order                 | No    |
| POST   | `/api/contact`        | Submit contact message         | No    |
| POST   | `/api/admin/login`    | Admin login                    | No    |
| GET    | `/api/admin/menu`     | List all menu items            | JWT   |
| POST   | `/api/admin/menu`     | Add menu item                  | JWT   |
| PUT    | `/api/admin/menu`     | Update menu item               | JWT   |
| DELETE | `/api/admin/menu`     | Delete menu item               | JWT   |
| GET    | `/api/admin/orders`   | List all orders                | JWT   |
| PATCH  | `/api/admin/orders`   | Update order status            | JWT   |
| GET    | `/api/admin/messages` | List contact messages          | JWT   |
| PATCH  | `/api/admin/messages` | Mark message as read           | JWT   |

---

## 🎨 Design Theme

- **Colors:** Icy blue gradients, frost whites, teal accents
- **Style:** Glassmorphism cards with backdrop blur
- **Animations:** Framer Motion scroll reveals, hover effects, snowfall particles
- **Typography:** Modern sans-serif (Geist)
- **Responsive:** Mobile-first design

---

## 📦 Deployment

### Vercel
```bash
npx vercel
```

### AWS / On-prem
```bash
docker-compose up --build -d
```

---

## 🔒 Security Features

- JWT-based admin authentication
- bcrypt password hashing
- Zod input validation on all API routes
- Rate limiting on public endpoints
- Environment variable configuration

---

## 📝 License

© 2024 Frosted Lane. All rights reserved.
