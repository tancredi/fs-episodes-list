const port = process.env.PORT || "3000";

export const config = {
  port,
  apiUrl: `http://localhost:${process.env.PORT || port}/api`,
};
