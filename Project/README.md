POST /auth/register
> { "email": "user@example.com", "password": "test123" }
✅ User registered

POST /auth/login
> { "email": "user@example.com", "password": "test123" }
✅ { "token": "eyJhbGciOi..." }

GET /auth/protected
> Authorization: Bearer <token>
✅ { message: "Protected data", user: { ... } }

GET /auth/google
✅ Redirects to Google OAuth
