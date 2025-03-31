# User API Documentation

This documentation outlines the endpoints for user management in the Epoch Networkx API.

## Base URL

```
/api/users
```

## Endpoints

### Register User

- **URL:** `/register`
- **Method:** `POST`
- **Access:** Public
- **Body:**

```json
{
  "name": "string",
  "email": "string",
  "password": "string",
  "interests": "string" // comma-separated values
}
```

- **Success Response:** `201 Created`

```json
{
  "token": "JWT_TOKEN",
  "user": {
    "id": "string",
    "name": "string",
    "email": "string",
    "interests": ["string"]
  }
}
```

### Login User

- **URL:** `/login`
- **Method:** `POST`
- **Access:** Public
- **Body:**

```json
{
  "email": "string",
  "password": "string"
}
```

- **Success Response:** `200 OK`

```json
{
  "token": "JWT_TOKEN",
  "user": {
    "id": "string",
    "name": "string",
    "email": "string",
    "interests": ["string"]
  }
}
```

### Get All Users

- **URL:** `/`
- **Method:** `GET`
- **Access:** Protected
- **Headers:** `Authorization: Bearer <token>`
- **Success Response:** `200 OK`

### Get User by ID

- **URL:** `/:id`
- **Method:** `GET`
- **Access:** Protected
- **Headers:** `Authorization: Bearer <token>`
- **Success Response:** `200 OK`

### Update User

- **URL:** `/:id`
- **Method:** `PUT`
- **Access:** Protected
- **Headers:** `Authorization: Bearer <token>`
- **Body:**

```json
{
  "name": "string",
  "email": "string",
  "interests": "string" // comma-separated values
}
```

- **Success Response:** `200 OK`

### Delete User

- **URL:** `/:id`
- **Method:** `DELETE`
- **Access:** Protected
- **Headers:** `Authorization: Bearer <token>`
- **Success Response:** `200 OK`

## Error Responses

```json
{
  "message": "error message",
  "error": "detailed error info"
}
```

Common error codes:

- `400` - Bad Request
- `401` - Unauthorized
- `403` - Forbidden
- `404` - Not Found
- `500` - Server Error

## Chat API Documentation

This documentation outlines the endpoints for chat management in the Epoch Networkx API.

## Base URL

```
/api/chats
```

## Endpoints

### Create Chat

- **URL:** `/create`
- **Method:** `POST`
- **Access:** Protected
- **Body:**

```json
{
  "isGroup": "boolean",
  "participants": "string" // comma-separated user IDs
}
```

- **Success Response:** `201 Created`

```json
{
  "_id": "string",
  "isGroup": "boolean",
  "participants": ["string"],
  "messages": []
}
```

### Get User Chats

- **URL:** `/user/:userId`
- **Method:** `GET`
- **Access:** Protected
- **Headers:** `Authorization: Bearer <token>`
- **Success Response:** `200 OK`

```json
[
  {
    "_id": "string",
    "isGroup": "boolean",
    "participants": [
      {
        "name": "string",
        "email": "string"
      }
    ],
    "messages": []
  }
]
```

### Create Message

- **URL:** `/message/:chatId`
- **Method:** `POST`
- **Access:** Protected
- **Headers:** `Authorization: Bearer <token>`
- **Body:**

```json
{
  "senderId": "string",
  "content": "string"
}
```

- **Success Response:** `201 Created`

```json
{
  "sender": "string",
  "content": "string",
  "timestamp": "ISODate"
}
```

### Get Chat Messages

- **URL:** `/message/:chatId`
- **Method:** `GET`
- **Access:** Protected
- **Headers:** `Authorization: Bearer <token>`
- **Success Response:** `200 OK`

```json
[
  {
    "sender": "string",
    "content": "string",
    "timestamp": "ISODate"
  }
]
```

## Error Responses

```json
{
  "error": "error message"
}
```

Common error codes:

- `400` - Bad Request
- `401` - Unauthorized
- `403` - Forbidden
- `404` - Not Found
- `500` - Server Error
