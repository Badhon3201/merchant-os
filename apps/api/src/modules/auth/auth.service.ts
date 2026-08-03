
    import authRepository from './auth.repository';
    import {hashPassword, comparePassword} from '../../shared/utils/password';
    import jwt from "jsonwebtoken";
    import {
        generateAccessToken,
        generateRefreshToken    
    } from "../../shared/utils/jwt";


    class AuthService {
        async register(
            data: { 
                companyId: number; 
                name: string;
                email: string;
                password: string;
            }) {
                const { companyId, name, email, password } = data;

                // Check if user already exists
                const existingUser = await authRepository.findByEmail(companyId, email);
                if (existingUser) {
                    throw new Error('User already exists');
                }

                // Hash the password
                const hashedPassword = await hashPassword(password);
                
                // Create new user
                const newUser = await authRepository.createUser({
                    name,
                    email,
                    password: hashedPassword,
                    company: { connect: { id: companyId } },
                });

                // Generate tokens
                const accessToken = generateAccessToken(newUser);
                const refreshToken = generateRefreshToken(newUser);

                // Update user with refresh token
                await authRepository.updateRefreshToken(newUser.id, refreshToken);

                return {
                    user: newUser,
                    accessToken,
                    refreshToken,
                };
            }

            async login(
                data: {
                    companyId: number;
                    email: string;
                    password: string;
                }) {
                    const { companyId, email, password } = data;

                    // Find user by email and companyId
                    const user = await authRepository.findByEmail(companyId, email);
                    if (!user) {
                        throw new Error('User not found');
                    }

                    // Compare passwords
                    const isPasswordValid = await comparePassword(password, user.password);
                    if (!isPasswordValid) {
                        throw new Error('Invalid password');
                    }

                    // Generate tokens
                    const accessToken = generateAccessToken(user);
                    const refreshToken = generateRefreshToken(user);

                    // Update user with refresh token
                    await authRepository.updateRefreshToken(user.id, refreshToken);

                    return {
                        user,
                        accessToken,
                        refreshToken,
                    };
                }
    
        async refreshToken(refreshToken: string) {
            const payload = jwt.verify(
                refreshToken,
                process.env.JWT_REFRESH_SECRET!
            ) as { id: number };

            const user = await authRepository.findById(payload.id);

            if (!user) {
                throw new Error("User not found");
            }

            if (user.refreshToken !== refreshToken) {
                throw new Error("Invalid refresh token");
            }

            const accessToken = generateAccessToken(user);

            return {
                accessToken,
            };
        }

        async logout(userId: number) {
            await authRepository.updateRefreshToken(userId, null);

            return {
                message: "Logout successful",
            };
        }
    }

    export default new AuthService();