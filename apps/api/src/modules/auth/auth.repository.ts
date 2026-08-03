
    import prisma from "../../database/prisma";
    import { Prisma } from "../../../generated/prisma/client";

    export class AuthRepository {

        // find user by email and companyId
        async findByEmail(companyId: number, email: string) {
        return prisma.user.findUnique({
            where: {
                companyId_email: {
                    companyId,
                    email,
                },
                },
                include: {
                    company: true,
                    role: true,
                }
            });
        }

        // find by user id and companyId
        async findById(id: number) {
            return prisma.user.findUnique({
                where: {    
                    id,
                },
                include: {
                    company: true,
                    role: true,
                }
            });
        }

        // Create new user
        async createUser(data: Prisma.UserCreateInput) {
            return prisma.user.create({
                data,
                include: {
                    company: true,
                    role: true,
                }
            });
        }

        // Update Refresh Token
        async updateRefreshToken(userId: number, refreshToken: string | null) {
            return prisma.user.update({
                where: {
                    id: userId,
                },
                data: {
                    refreshToken,
                }
            });
        }
    }

    export default new AuthRepository();
