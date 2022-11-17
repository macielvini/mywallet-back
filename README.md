### Project Requirements - To-Do

### General

- [x] validate body fields using Joi

### `post` Sign-up

- [x] body = { name, email, password }
- [x] encrypt password using bcrypt
- [x] return possible errors generated by Joi validation

### `post` Sign-in

- [x] body = { email, password }
- [x] validate fields using Joi
- [x] on first login: create new token
- [x] always return a token
- [x] return token = { token: "string" }

### `get` Statements

- [x] new statements collection
- [x] validate token
- [x] document template { id, ownerId, date: DD/MM, description, amount, transaction: in/out }
- [x] return array of user's statements

### `post` Statements

- [x] body = { description, amount, transaction: in/out }
- [x] validate token
- [x] validation for valid transaction types
- [x] insert on statements collection

### Next steps

- [ ] `get` **Statements** pagination by month
- [ ] Delete inactive users (30 days)
- [ ] `delete` user can delete statement record
- [ ] `put` update statement record
