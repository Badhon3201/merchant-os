    import prisma from "../../database/prisma";
    import { Prisma } from "../../../generated/prisma/client";
    
    class CompanyRepository {
        findById(id: number) {
            return prisma.company.findUnique({
                where: { id },
            });
        }

        update(id: number, data: Prisma.CompanyUpdateInput) {
            return prisma.company.update({
                where: { id },
                data,
            });
        }
    }

    export default new CompanyRepository();