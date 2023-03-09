# Auth APIs using redis

### .env file

```
NUMBER_OF_SALTS_ROUNDS = 10
JWT_SECRET_KEY = secret-key
TOKEN_EXPIRY = 3600
REDIS_PORT = 6379
REDIS_HOST = 'localhost'
```

### Body for login, register
```
{
    "email": "Mehak Noor",
    "password": "hello123"
}
```

### Register User
URL: 
```
http://localhost:4000/register
```
Response:
```
{
    "message": "User created successfully",
    "data": {
        "id": 2,
        "email": "Mehak Noor",
        "hashedPassword": "$2b$10$z6e5YdKTDcvvvg8EfsktPOZdb4AW6aVFicVQE17w7CS7zJVXAeJlq",
        "updatedAt": "2023-03-07T17:20:31.650Z",
        "createdAt": "2023-03-07T17:20:31.650Z"
    }
}
```

### Login User
URL: 
```
http://localhost:4000/login
```
Response:
```
{
    "message": "User Logged IN..",
    "data": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwidXNlcm5hbWUiOiJzdXJ5YTIxMyIsImlhdCI6MTY3ODIxMDI0MiwiZXhwIjoxNjc4MjEzODQyfQ.OA1geg8hfMVoDa1M2lVkfuj0wA3gGBZASPi5Tgc7i44"
}
```

### Token Validate
URL:
```
http://localhost:4000/token/validate
```

headers:
```
{
    'Authorization': 'eyJpZCI6MiwidXNlcm5hbWUiOiJzdXJ5YTIxMyIsImlhdCI6MTY3ODIxMDI0MiwiZXhwIjoxNjc4MjEzODQyfQ'
}
```

Response:
```
{
    "message": "User verified",
    "email": "surya"
}
```
