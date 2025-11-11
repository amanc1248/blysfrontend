# Blys Task Manager - Frontend

Modern, responsive React application for task management with JWT authentication and Blys branding.

## 🚀 Tech Stack

- **Framework**: React 18
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **Routing**: React Router v6
- **State Management**: Context API + localStorage
- **HTTP Client**: Axios
- **Deployment**: Netlify

## 📁 Project Structure

```
frontend/
├── public/
│   └── _redirects           # Netlify routing
├── src/
│   ├── components/
│   │   ├── Auth/
│   │   │   ├── Login.jsx
│   │   │   └── Register.jsx
│   │   ├── Tasks/
│   │   │   ├── TaskList.jsx
│   │   │   ├── TaskItem.jsx
│   │   │   ├── TaskForm.jsx
│   │   │   └── TaskFilters.jsx
│   │   ├── Layout/
│   │   │   ├── Navbar.jsx
│   │   │   └── ProtectedRoute.jsx
│   │   └── common/
│   │       ├── Pagination.jsx
│   │       └── Loader.jsx
│   ├── context/
│   │   └── AuthContext.jsx  # Global auth state
│   ├── pages/
│   │   ├── LoginPage.jsx
│   │   ├── RegisterPage.jsx
│   │   └── Dashboard.jsx
│   ├── services/
│   │   └── api.js           # Axios instance
│   ├── utils/
│   │   └── helpers.js       # Utility functions
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── index.html
├── vite.config.js
├── tailwind.config.js
├── netlify.toml
└── package.json
```

## 🛠️ Setup Instructions

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Backend API running (see backend/README.md)

### 1. Install Dependencies

```bash
cd frontend
npm install
```

### 2. Environment Variables

Create a `.env` file in the frontend directory:

```bash
cp env.example .env
```

Edit `.env` with your backend API URL:

```env
VITE_API_URL=http://localhost:5000/api
```

**Note**: For production, update this to your deployed backend URL:
```env
VITE_API_URL=https://your-backend-api.com/api
```

## 🏃 Running the Application

### Development Mode

```bash
npm run dev
```

The app will start on `http://localhost:5173`

### Build for Production

```bash
npm run build
```

Output will be in the `dist/` folder.

### Preview Production Build

```bash
npm run preview
```

### Available Scripts

```bash
npm run dev        # Start development server
npm run build      # Build for production
npm run preview    # Preview production build
```

## 🎨 Features

### Authentication
- ✅ User registration with validation
- ✅ User login with JWT
- ✅ Persistent authentication (localStorage)
- ✅ Protected routes
- ✅ Logout functionality
- ✅ Password visibility toggle

### Task Management
- ✅ Create tasks with modal form
- ✅ Edit existing tasks
- ✅ Delete tasks (with confirmation)
- ✅ View all tasks with pagination
- ✅ Sort by due date or priority
- ✅ Overdue task highlighting (red border)
- ✅ Priority color badges (Low/Medium/High)
- ✅ Days until deadline indicator

### User Experience
- ✅ Responsive design (mobile-first)
- ✅ Loading states for all async operations
- ✅ Success/error toast notifications
- ✅ Form validation
- ✅ Character counter on text fields
- ✅ Smooth animations and transitions
- ✅ Blys branding throughout

## 🎨 UI Components

### Pages
- **LoginPage**: User authentication
- **RegisterPage**: New user registration
- **Dashboard**: Main task management interface

### Components
- **Navbar**: Top navigation with logo and user menu
- **TaskList**: Display tasks with pagination
- **TaskItem**: Individual task card with actions
- **TaskForm**: Create/Edit task modal form
- **TaskFilters**: Sort and filter controls
- **Pagination**: Page navigation component
- **ProtectedRoute**: Route guard for authenticated pages

## 🔧 Configuration Files

### vite.config.js
```javascript
{
  plugins: [react()],
  server: {
    port: 5173,
    proxy: {
      '/api': 'http://localhost:5000'
    }
  }
}
```

### tailwind.config.js
```javascript
{
  theme: {
    extend: {
      colors: {
        primary: { /* Blys cyan colors */ },
        blys: {
          navy: '#1a2332',
          cyan: '#00a3e0',
          gray: '#6b7280'
        }
      }
    }
  }
}
```

### netlify.toml
```toml
[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200

[build]
  publish = "dist"
  command = "npm run build"
```

## 🎨 Styling

### Tailwind CSS Classes

Custom utility classes defined in `src/index.css`:

```css
.btn-primary     /* Navy button */
.btn-secondary   /* White button with border */
.btn-danger      /* Red button */
.input-field     /* Form input with cyan focus */
.label-field     /* Bold navy label */
.card            /* White card with shadow */
.blys-link       /* Cyan link with hover */
```

### Color Palette

| Color | Hex | Usage |
|-------|-----|-------|
| Navy | `#1a2332` | Headings, primary text |
| Cyan | `#00a3e0` | Links, focus states, brand accent |
| Gray | `#6b7280` | Secondary text |
| White | `#ffffff` | Backgrounds |

### Font Stack

```
-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, 
Helvetica, Arial, sans-serif
```

## 🔒 Authentication Flow

1. User enters credentials
2. Frontend sends request to `/api/auth/login`
3. Backend returns JWT token
4. Token stored in localStorage
5. Token sent with all API requests (Authorization header)
6. Protected routes check for valid token
7. Auto-redirect to login if token invalid

## 📡 API Integration

### Axios Instance (src/services/api.js)

```javascript
// Auto-includes JWT token
api.get('/tasks')
api.post('/tasks', taskData)
api.put('/tasks/:id', taskData)
api.delete('/tasks/:id')
```

### Request Interceptor
- Adds JWT token to Authorization header
- Handles token from localStorage

### Response Interceptor
- Handles 401 errors (auto-logout)
- Redirects to login on authentication failure

## 🧪 Testing Locally

### 1. Start Backend Server

```bash
cd backend
npm run dev
```

### 2. Start Frontend Dev Server

```bash
cd frontend
npm run dev
```

### 3. Open Browser

Navigate to `http://localhost:5173`

### 4. Test Features

1. ✅ Register a new account
2. ✅ Login with credentials
3. ✅ Create a new task
4. ✅ Edit the task
5. ✅ Delete the task
6. ✅ Test sorting options
7. ✅ Test pagination (create 10+ tasks)
8. ✅ Test responsive design (resize browser)
9. ✅ Logout

## 🚀 Deployment

### Netlify Deployment

1. **Connect Repository**
   - Sign in to Netlify
   - Import project from GitHub

2. **Build Settings**
   - Base directory: `frontend`
   - Build command: `npm run build`
   - Publish directory: `frontend/dist`

3. **Environment Variables**
   - Add `VITE_API_URL` with your backend URL

4. **Deploy**
   - Click "Deploy site"
   - Site will auto-deploy on git push

### Manual Deployment

```bash
# Build
npm run build

# Deploy to Netlify
npm install -g netlify-cli
netlify deploy --prod --dir=dist
```

## 🐛 Troubleshooting

### Vite Not Starting

```
Error: Cannot find module 'vite'
```

**Solution:**
```bash
rm -rf node_modules package-lock.json
npm install
```

### API Connection Error

```
Network Error
```

**Solutions:**
- Check if backend is running on port 5000
- Verify `VITE_API_URL` in `.env`
- Check CORS settings in backend

### Build Errors

```
[vite] error during build
```

**Solutions:**
- Clear Vite cache: `rm -rf node_modules/.vite`
- Check for TypeScript errors
- Verify all imports are correct

### 404 on Refresh (Production)

**Solution:**
- Ensure `public/_redirects` exists with:
  ```
  /* /index.html 200
  ```
- Or `netlify.toml` has redirect rules

## 📦 Dependencies

### Core Dependencies
- `react` - UI library
- `react-dom` - React DOM rendering
- `react-router-dom` - Client-side routing
- `axios` - HTTP client

### Dev Dependencies
- `vite` - Build tool
- `@vitejs/plugin-react` - React support for Vite
- `tailwindcss` - Utility-first CSS
- `autoprefixer` - CSS vendor prefixes
- `postcss` - CSS processing

## 🎯 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## 📱 Responsive Breakpoints

```
sm: 640px   // Small devices
md: 768px   // Medium devices
lg: 1024px  // Large devices
xl: 1280px  // Extra large devices
```

## 🌐 Live Demo

**Frontend**: https://merry-pika-d8a04f.netlify.app
**Backend API**: https://your-backend.onrender.com

## 📄 License

MIT License - Built for Blys Job Application

## 👤 Aman

Built with ❤️ for Blys

