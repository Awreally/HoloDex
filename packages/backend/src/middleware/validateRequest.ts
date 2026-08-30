import { RequestHandler } from "express";
import { ZodType, ZodIssue } from "zod";
import { AppError } from "../errors/AppError";

type RequestSchemas = {
  body?: ZodType;
  params?: ZodType;
  query?: ZodType;
};

type ValidationError = { field: string; message: string };

function formatIssues(source: "body" | "params" | "query", issues: ZodIssue[]): ValidationError[] {
  return issues.map((issue) => ({
    field: [source, ...issue.path].join("."),
    message: issue.message,
  }));
}

export function validateRequest(schemas: RequestSchemas): RequestHandler {
  return (req, res, next) => {
    const errors: ValidationError[] = [];

    if (schemas.body) {
      const result = schemas.body.safeParse(req.body);
      if (!result.success) errors.push(...formatIssues("body", result.error.issues));
      else req.body = result.data;
    }

    if (schemas.params) {
      const result = schemas.params.safeParse(req.params);
      if (!result.success) errors.push(...formatIssues("params", result.error.issues));
      // Express types req.params as a fixed ParamsDictionary; cast is safe since result.data is validated.
      else req.params = result.data as typeof req.params;
    }

    if (schemas.query) {
      const result = schemas.query.safeParse(req.query);
      if (!result.success) errors.push(...formatIssues("query", result.error.issues));
      // Express types req.query as a fixed ParsedQs; cast is safe since result.data is validated.
      else req.query = result.data as typeof req.query;
    }

    if (errors.length > 0) {
      return next(new AppError(400, "Validation error", "VALIDATION_ERROR", errors));
    }

    next();
  };
}
