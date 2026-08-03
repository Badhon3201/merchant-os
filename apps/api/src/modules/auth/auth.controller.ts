
    import type { Request, Response, NextFunction } from 'express';
    import authService from './auth.service';
    import { successResponse, errorResponse } from '../../shared/utils/response';

    class AuthController {
        async register(req: Request, res: Response) {
            try {
                const { companyId, name, email, password } = req.body;
                const result = await authService.register({ companyId, name, email, password });
                return successResponse(
                    res, 
                    'User registered successfully', 
                    result,
                    201
                );
            } catch (error: any) {
                return errorResponse(
                    res, 
                    error.message,
                    400,
                );
            }
        }

        async login(req: Request, res: Response) {
            try {
                const { companyId, email, password } = req.body;
                const result = await authService.login({ companyId, email, password });
                return successResponse(
                    res, 
                    'User logged in successfully', 
                    result,
                    200
                );
            } catch (error: any) {
                return errorResponse(
                    res, 
                    error.message,
                    400,
                );
            }
        }

        async refreshToken(
            req: Request,
            res: Response,
            next: NextFunction
        ) {
            try {
                const { refreshToken } = req.body;

                const result = await authService.refreshToken(refreshToken);

                return successResponse(
                    res,
                    "Access token refreshed successfully",
                    result,
                    200
                );
            } catch (error) {
                next(error);
            }
        }

        async logout(
            req: Request,
            res: Response,
            next: NextFunction
        ) {
            try {
                const userId = (req as any).user.id;
                // const userId = req.body.userId; // Assuming userId is sent in the request body

                const result = await authService.logout(userId);

                return successResponse(
                    res,
                    "Logout successful",
                    result,
                    200
                );
            } catch (error) {
                next(error);
            }
        }

    }

    export default new AuthController();