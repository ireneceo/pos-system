# OrderHere POS System

Multi-tenant restaurant management and POS system with mobile ordering capabilities.

## 🏗️ Project Structure

```
/var/www/
├── dev-frontend/          # React TypeScript frontend
├── dev-backend/           # Node.js Express backend
├── vhosts/                # Production deployment files
└── backups/               # Database backups (not in git)
```

## 🚀 Tech Stack

### Frontend
- React 18 with TypeScript
- Styled Components
- React Router v6
- Context API for state management

### Backend
- Node.js with Express
- Sequelize ORM
- MySQL Database
- PM2 for process management

## 📋 Prerequisites

- Node.js 18+
- MySQL 8.0+
- PM2 (for production)

## 🔧 Setup

### 1. Clone Repository

```bash
git clone <repository-url>
cd /var/www
```

### 2. Backend Setup

```bash
cd dev-backend
npm install

# Copy and configure environment
cp .env.example .env
# Edit .env with your database credentials

# Start backend
npm start
# Or with PM2: pm2 start ecosystem.config.js
```

### 3. Frontend Setup

```bash
cd dev-frontend
npm install

# Start development server
npm start

# Build for production
npm run build
```

## 🗄️ Database

### Initial Setup

```bash
# Import database schema
mysql -u root -p < database/schema.sql
```

### Migrations

Database migrations are managed through:
1. Schema changes in `/database/migrations/`
2. Run migrations: `npm run migrate`

## 📦 Deployment

### Development Server

Frontend: https://dev.purplehere.com/
Backend API: https://dev.purplehere.com/api

### Production Deployment

1. Build frontend: `cd dev-frontend && npm run build`
2. Copy build to vhosts: `cp -r build/* /var/www/vhosts/orderhere.wor-pro.com/dev-frontend/`
3. Restart backend: `pm2 restart dev-backend`

## 🔐 Environment Variables

### Backend (.env)
```
DB_HOST=localhost
DB_PORT=3306
DB_NAME=orderhere_db
DB_USER=your_user
DB_PASSWORD=your_password
PORT=5000
```

### Frontend (.env)
```
REACT_APP_API_URL=/api
```

## 🔄 Backup & Restore

See [BACKUP.md](BACKUP.md) for detailed backup procedures.

Quick backup:
```bash
./scripts/backup-database.sh
```

## 📚 Documentation

- [API Documentation](docs/API.md)
- [Database Schema](docs/DATABASE.md)
- [Deployment Guide](docs/DEPLOYMENT.md)
- [Backup Procedures](BACKUP.md)

## 🛠️ Development

### Type Definitions

Centralized types are in `/dev-frontend/src/types/`:
- Import types: `import { User, Order } from '@/types'`
- See [Type Guide](dev-frontend/src/types/README.md)

### Constants

Shared constants in `/dev-frontend/src/constants/`:
- Import: `import { ORDER_STATUS, PAYMENT_METHODS } from '@/constants'`

## 📝 Git Workflow

```bash
# Create feature branch
git checkout -b feature/your-feature-name

# Make changes and commit
git add .
git commit -m "Description of changes"

# Push to repository
git push origin feature/your-feature-name
```

## 🐛 Troubleshooting

### Backend won't start
- Check MySQL is running: `systemctl status mysql`
- Verify .env database credentials
- Check PM2 logs: `pm2 logs dev-backend`

### Frontend build errors
- Clear cache: `rm -rf node_modules package-lock.json && npm install`
- Check TypeScript errors: `npm run build`

## 📞 Support

For issues and questions, check the documentation or contact the development team.

## 📄 License

Proprietary - All rights reserved
