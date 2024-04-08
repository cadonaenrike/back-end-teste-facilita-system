import csurf from "csurf";
import cookieParser from "cookie-parser";
import { Express } from "express";

export function csrfMiddleware(app: Express) {
  app.use(cookieParser());

  const csrfProtection = csurf({ cookie: true });

  app.get("/csrf-token", csrfProtection, (req, res) => {
    res.json({ csrfToken: req.csrfToken() });
  });

  return csrfProtection;
}
