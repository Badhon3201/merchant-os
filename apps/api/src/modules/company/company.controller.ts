
    import type { Request, Response, NextFunction } from 'express';
    import companyService from './company.service';
    import { successResponse, errorResponse } from '../../shared/utils/response';

      class CompanyController {
        async getCompany(req: Request, res: Response) {
            try {
                const companyId = (req as any).user.companyId;
                const company = await companyService.getCompany(companyId);
                return successResponse(
                    res,
                    "Company retrieved successfully",
                    company,
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

        async updateCompany(req: Request, res: Response) {
            try {
                const companyId = (req as any).user.companyId;

                const data = req.body;

                const result = await companyService.updateCompany(companyId, data);

                return successResponse(
                    res,
                    "Company updated successfully",
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
      }

      const companyController = new CompanyController();
      export default companyController;