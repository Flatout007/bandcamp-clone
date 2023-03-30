## 🤖 Protect Middleware

The `protect` middleware function is responsible for authenticating requests to a protected route. It uses JWTs to authenticate requests and add the authenticated user to the request object for use in the rest of the application, as long as the user is logged in, of course.

### 🚦 Use case

Typical use-case for the `protect` middleware function.
Notice the `protect` function is added as the second argument of a node get request

```js
router.get("/", protect, (req, res) => {
  res.send(`Welcome, ${req.artist.name}!`);
});
```