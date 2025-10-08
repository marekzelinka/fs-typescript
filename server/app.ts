import express, {
	type NextFunction,
	type Request,
	type RequestHandler,
	type Response,
} from "express";

const app = express();

interface AuthenticatedRequest extends Request {
	user: {
		id: string;
		roles: string[];
	};
}

const attachUser: RequestHandler = (req, res, next) => {
	// Authenticate and attach user
	(req as AuthenticatedRequest).user = { id: "123", roles: ["admin"] };
	next();
};

const adminHandler = (req: AuthenticatedRequest, res: Response): void => {
	// TypeScript knows req.user exists and has the correct shape
	const { id, roles } = req.user;

	if (!roles.includes("admin")) {
		res.status(403).send("Forbidden");

		return;
	}

	res.send(`Welcome, admin ${id}!`);
};

// Use them together to ensure type safety
app.get(
	"/admin",
	attachUser,
	adminHandler,
	(req: AuthenticatedRequest, res) => {
		// TypeScript now knows req.user exists and is non-null
		const { id, roles } = req.user; // No need for null check
	},
);

// Define a standard API response structure
interface ApiResponse<T> {
	success: boolean;
	data?: T;
	error?: {
		message: string;
		code: string;
		details?: unknown;
	};
}

interface UserResponse {
	id: string;
	username: string;
	email: string;
	createdAt: string;
}

// Create helper functions for consistent responses
function sendSuccess<T>(res: Response<ApiResponse<T>>, data: T, status = 200) {
	return res.status(status).json({
		success: true,
		data,
	});
}

function sendError(
	res: Response<ApiResponse<never>>,
	message: string,
	code = "INTERNAL_ERROR",
	status = 500,
	details?: unknown,
) {
	return res.status(status).json({
		success: false,
		error: {
			message,
			code,
			...(typeof details === "object" ? { details } : {}),
		},
	});
}

declare function findUser(id: string): Promise<UserResponse>;

// Example usage
app.get(
	"/users/:id",
	async (
		req: Request<{ id: string }>,
		res: Response<ApiResponse<UserResponse>>,
	) => {
		try {
			const user = await findUser(req.params.id);

			if (!user) {
				return sendError(res, "User not found", "USER_NOT_FOUND", 404);
			}

			return sendSuccess(res, user, 200);
		} catch (error) {
			return sendError(
				res,
				"Failed to retrieve user",
				"RETRIEVAL_ERROR",
				500,
				error,
			);
		}
	},
);

export const ErrorCode = {
	NOT_FOUND: "NOT_FOUND",
	VALIDATION_ERROR: "VALIDATION_ERROR",
	UNAUTHORIZED: "UNAUTHORIZED",
	FORBIDDEN: "FORBIDDEN",
	INTERNAL_ERROR: "INTERNAL_ERROR",
	DATABASE_ERROR: "DATABASE_ERROR",
} as const;

type ErrorCode = keyof typeof ErrorCode;

export interface ErrorResponse {
	error: {
		message: string;
		code: ErrorCode;
		details?: unknown;
	};
}

export class AppError extends Error {
	statusCode: number;
	code: ErrorCode;
	details?: unknown;

	constructor(
		message: string,
		code: ErrorCode,
		statusCode: number,
		details?: unknown,
	) {
		super(message);
		this.name = "AppError";
		this.code = code;
		this.statusCode = statusCode;
		this.details = details;
	}
}

export class NotFoundError extends AppError {
	constructor(message = "Resource not found", details?: unknown) {
		super(message, ErrorCode.NOT_FOUND, 404, details);
		this.name = "NotFoundError";
	}
}

export class ValidationError extends AppError {
	constructor(message = "Validation failed", details?: unknown) {
		super(message, ErrorCode.VALIDATION_ERROR, 400, details);
		this.name = "ValidationError";
	}
}

// Create a type-safe error handler
function errorHandler(
	err: Error,
	req: Request,
	res: Response,
	next: NextFunction,
): void {
	console.error(err);

	// Handle known error types
	if ("statusCode" in err && "code" in err) {
		const appError = err as AppError;

		res.status(appError.statusCode).json({
			error: {
				message: appError.message,
				code: appError.code,
				...(typeof appError.details === "object" && {
					details: appError.details,
				}),
			},
		});

		return;
	}

	// Handle unknown errors
	res.status(500).json({
		error: {
			message: "Internal server error",
			code: "INTERNAL_ERROR",
		},
	});
}

// Register the error handler (must be last)
app.use(errorHandler);
