import { validationResult } from "express-validator";
import { Request, Response, NextFunction } from "express";

const handleValidationErrors = (req: Request, res: Response, next: NextFunction) => {
  const validationErrors = validationResult(req);
  if (!validationErrors.isEmpty()) {
    const errorFormatter = ({ msg }: { msg: string }) => msg;
    const errors = validationErrors.formatWith(errorFormatter).mapped();
    const err = Error("Validation Error.");
    (err as Error).errors = errors;
    (err as Error).statusCode = 400;
    (err as Error).title = "Validation Error.";
    return res.status(400).json({ err });
  }
  next();
};

export default handleValidationErrors;