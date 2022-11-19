### `POST` "/sign-up"

- ```JSX
  {
    name: "",
    email: "email@provider.com",
    password: "",
    password_confirmation: ""
  }
  ```

- returns `201`

### `POST` "/sign-in"

- ```JSX
  {
    email: "email@provider.com",
    password: ""
  }
  ```

- returns on data: `{ token : "access-token", name: "username" }`

### `GET` "/statement"

- ```JSX
  {
    headers: {
      Authorization: "Bearer Token"
    }
  }
  ```

- returns array of documents

- ```json
  [
    {
      "_id": "6376ec49266d69e48c50b689",
      "date": "08/10",
      "description": "donnut",
      "amount": 10,
      "type": "out"
    },
    {
      "_id": "6376ea64ec6212b427f05e05",
      "date": "10/09",
      "description": "ice cream",
      "amount": 1.9,
      "type": "out"
    }
  ]
  ```

### `POST` "/statement"

- ```JSX
  {
    headers: {
      Authorization: "Bearer Token"
    }
  }
  ```

- ```JSX
  {
    description:"vale",
    amount: 1200,
    type: "in"
  }
  ```

returns `201`

### `DELETE` "/statement/id"

- ```JSX
  {
    headers: {
      Authorization: "Bearer Token"
    }
  }
  ```

- returns `200`
