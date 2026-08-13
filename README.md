# student-lms-II---

## Backend – NestJS se start

```bash
npm i -g @nestjs/cli
nest new backend
cd backend
```

`nest new` Create basic nestjs project – basic structure, package.json, src folder folder structure. and then add the pakages mentioned below.

---

### Dependencies

```bash
npm i @nestjs/config
# Config module (common, core, platform-express nest new me already hote hain)


nest g res users --no-spec
# To create a module

npm i @nestjs/typeorm typeorm pg
# Database – TypeORM + PostgreSQL

npm i @nestjs/jwt @nestjs/passport passport passport-jwt passport-google-oauth20 jsonwebtoken
# Auth – JWT + Google OAuth

npm i bcryptjs
# Password hashing

npm i class-transformer class-validator joi express-validator
# Validation – DTOs, schemas, request validation

npm i cloudinary multer multer-storage-cloudinary
# File upload – images, videos (Cloudinary)

npm i razorpay
# Payments

npm i pdfkit
# PDF – certificates

npm i helmet cors morgan
# Security, CORS, logging

npm i uuid rxjs reflect-metadata
# uuid = unique ID generate (certificate no, order id) | rxjs = async streams, observables (use in the Nest) | reflect-metadata = @Injectable, @Column for decorators (in the nest)

```


## Frontend – Next.js se start

```bash
npx create-next-app@latest frontend
cd frontend
```

`create-next-app` for create Next.js project and then install all packages mentioned below.

---

### Dependencies

```bash
npm i @tanstack/react-query axios
# Data fetching + HTTP

npm i zustand
# State management

npm i tailwind-merge class-variance-authority clsx
# Styling utilities


npm i react-hot-toast
# Toasts

npm i recharts
# Charts

npm i embla-carousel-react
# Carousel

npm i react-player
# Video player
```

