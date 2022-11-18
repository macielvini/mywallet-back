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

### `delete` Statements

- [x] params = { id }
- [x] validate token

### `put` Statements

- [ ] body = { id, description, amount, transaction }
- [ ] validate body with joi
- [ ] validate token
- [ ] find and update statement

### Next steps

- [ ] `get` **Statements** pagination by month
- [ ] Delete inactive users (30 days)
- [ ] `delete` **undo delete**
  - [x] new statement property: `timestamp`
  - [ ] statements are sorted by `timestamp`
  - [ ] deletes from `statements`, add to `trash`
  - [ ] `trash` documents last for 60 seconds (max undo time)
  - [ ] when undo, delete from `trash`, add to `statements`
- [ ] `put` update statement record
