# API Documentation

## User Routes

### 1. Register a new user

- **Method:** POST
- **Endpoint:** `/register`
- **Request Body:**

```json
{
  "firstName": "string",
  "lastName": "string",
  "userName": "string",
  "gender": "string",
  "age": "string",
  "email": "string",
  "locality": "string",
  "avatar": "string",
  "password": "string",
  "interests": "string (comma-separated)"
}
```

- **Response:**

```json
{
  "token": "string",
  "user": {
    "id": "string",
    "firstName": "string",
    "lastName": "string",
    "userName": "string",
    "gender": "string",
    "age": "string",
    "email": "string",
    "locality": "string",
    "avatar": "string",
    "role": "string",
    "interests": ["string"]
  }
}
```

### 2. Login user

- **Method:** POST
- **Endpoint:** `/login`
- **Request Body:**

```json
{
  "email": "string",
  "password": "string"
}
```

- **Response:**

```json
{
  "token": "string",
  "user": {
    "id": "string",
    "firstName": "string",
    "lastName": "string",
    "userName": "string",
    "gender": "string",
    "age": "string",
    "email": "string",
    "locality": "string",
    "avatar": "string",
    "role": "string",
    "interests": ["string"],
    "attendedEvents": ["string"],
    "chats": ["string"]
  }
}
```

### 3. Get all users (Protected route)

- **Method:** GET
- **Endpoint:** `/`
- **Authentication:** Requires a valid JWT token in the `Authorization` header.
- **Response:**

```json
[
  {
    "id": "string",
    "firstName": "string",
    "lastName": "string",
    "userName": "string",
    "gender": "string",
    "age": "string",
    "email": "string",
    "locality": "string",
    "avatar": "string",
    "role": "string",
    "interests": ["string"],
    "attendedEvents": ["string"],
    "chats": ["string"]
  }
]
```

### 4. Get single user by ID (Protected route)

- **Method:** GET
- **Endpoint:** `/:id`
- **Authentication:** Requires a valid JWT token in the `Authorization` header.
- **Response:**

```json
{
  "id": "string",
  "firstName": "string",
  "lastName": "string",
  "userName": "string",
  "gender": "string",
  "age": "string",
  "email": "string",
  "locality": "string",
  "avatar": "string",
  "role": "string",
  "interests": ["string"],
  "attendedEvents": ["string"],
  "chats": ["string"]
}
```

### 5. Update user (Protected route)

- **Method:** PUT
- **Endpoint:** `/:id`
- **Authentication:** Requires a valid JWT token in the `Authorization` header.
- **Request Body:**

```json
{
  "firstName": "string",
  "lastName": "string",
  "userName": "string",
  "gender": "string",
  "age": "string",
  "email": "string",
  "locality": "string",
  "avatar": "string",
  "interests": "string (comma-separated)"
}
```

- **Response:**

```json
{
  "message": "User updated successfully",
  "user": {
    "id": "string",
    "firstName": "string",
    "lastName": "string",
    "userName": "string",
    "gender": "string",
    "age": "string",
    "email": "string",
    "locality": "string",
    "avatar": "string",
    "role": "string",
    "interests": ["string"],
    "attendedEvents": ["string"],
    "chats": ["string"]
  }
}
```

### 6. Delete user (Protected route)

- **Method:** DELETE
- **Endpoint:** `/:id`
- **Authentication:** Requires a valid JWT token in the `Authorization` header.
- **Response:**

```json
{
  "message": "User deleted successfully"
}
```

## Chat Routes

### 1. Create a new chat

- **Method:** POST
- **Endpoint:** `/`
- **Request Body:**

```json
{
  "name": "string",
  "participants": "string (comma-separated user IDs)"
}
```

- **Response:**

```json
{
  "id": "string",
  "name": "string",
  "isGroup": boolean,
  "participants": ["string"],
  "messages": [
    {
      "sender": "string",
      "content": "string",
      "timestamp": "string"
    }
  ],
  "avatar": "string"
}
```

### 2. Create a new group chat

- **Method:** POST
- **Endpoint:** `/groupChat`
- **Request Body:**

```json
{
  "name": "string",
  "participants": "string (comma-separated user IDs)"
}
```

- **Response:**

```json
{
  "id": "string",
  "name": "string",
  "isGroup": boolean,
  "participants": ["string"],
  "messages": [
    {
      "sender": "string",
      "content": "string",
      "timestamp": "string"
    }
  ],
  "avatar": "string"
}
```

### 3. Update chat avatar

- **Method:** POST
- **Endpoint:** `/avatar`
- **Request Body:**

```json
{
  "chatId": "string",
  "avatar": "string"
}
```

- **Response:**

```json
{
  "id": "string",
  "name": "string",
  "isGroup": boolean,
  "participants": ["string"],
  "messages": [
    {
      "sender": "string",
      "content": "string",
      "timestamp": "string"
    }
  ],
  "avatar": "string"
}
```

### 4. Add participants to group

- **Method:** POST
- **Endpoint:** `/groupChatParticipants`
- **Request Body:**

```json
{
  "chatId": "string",
  "participants": "string (comma-separated user IDs)"
}
```

- **Response:**

```json
{
  "id": "string",
  "name": "string",
  "isGroup": boolean,
  "participants": ["string"],
  "messages": [
    {
      "sender": "string",
      "content": "string",
      "timestamp": "string"
    }
  ],
  "avatar": "string"
}
```

### 5. Remove participants from group

- **Method:** DELETE
- **Endpoint:** `/groupChatParticipants`
- **Request Body:**

```json
{
  "chatId": "string",
  "participants": "string (comma-separated user IDs)"
}
```

- **Response:**

```json
{
  "id": "string",
  "name": "string",
  "isGroup": boolean,
  "participants": ["string"],
  "messages": [
    {
      "sender": "string",
      "content": "string",
      "timestamp": "string"
    }
  ],
  "avatar": "string"
}
```

### 6. Get all chats for a user

- **Method:** GET
- **Endpoint:** `/user/:userId`
- **Response:**

```json
[
  {
    "id": "string",
    "name": "string",
    "isGroup": boolean,
    "participants": [
      {
        "id": "string",
        "name": "string",
        "email": "string"
      }
    ],
    "messages": [
      {
        "sender": "string",
        "content": "string",
        "timestamp": "string"
      }
    ],
    "avatar": "string"
  }
]
```

### 7. Create a new message in a chat

- **Method:** POST
- **Endpoint:** `/message/:chatId`
- **Request Body:**

```json
{
  "senderId": "string",
  "content": "string"
}
```

- **Response:**

```json
{
  "sender": "string",
  "content": "string",
  "timestamp": "string"
}
```

### 8. Get all messages in a chat

- **Method:** GET
- **Endpoint:** `/message/:chatId`
- **Response:**

```json
[
  {
    "sender": "string",
    "content": "string",
    "timestamp": "string"
  }
]
```

```

```
