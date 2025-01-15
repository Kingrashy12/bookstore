import app from "./app";

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
  console.log("API documentation available at http://localhost:5000/api-docs");
});
