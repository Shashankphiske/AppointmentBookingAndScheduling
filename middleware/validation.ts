import type { Request, Response, NextFunction } from "express";
import { z } from "zod"

const validate = (schema: z.ZodTypeAny) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse({
      body: req.body,
      params: req.params,
      query: req.query,
      cookies : req.cookies
    });

    if (!result.success) {

        return res.status(400).json({
            success: false,
            errors: result.error.issues[0]?.message
        });
    }

    next();
  };
};


export { validate };