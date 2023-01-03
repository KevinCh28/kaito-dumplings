import { validationResult } from "express-validator";
import { Request, Response, NextFunction } from "express";

const handleValidationErrors = (req: Request, res: Response, next: NextFunction) => {
  const validationErrors = validationResult(req);
  if (!validationErrors.isEmpty()) {
    const errorFormatter = ({ msg }: { msg: string }) => msg;
    const errors = validationErrors.formatWith(errorFormatter).mapped();
    const err = Error("Validation Error.");
    (err as any).errors = errors;
    (err as any).statusCode = 400;
    (err as any).title = "Validation Error.";
    next(err);
  }
  next();
};

export default handleValidationErrors;