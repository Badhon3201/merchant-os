
     import companyRepository from './company.repository';

    class CompanyService {
        async getCompany(companyId: number) {
            const company = await companyRepository.findById(companyId);

            if (!company) {
                throw new Error("Company not found");
            }

            return company;
        }

        
        async updateCompany(companyId: number, data: any) {
            const company = await companyRepository.findById(companyId);

            if (!company) {
                throw new Error("Company not found");
            }

            return companyRepository.update(companyId, data);
        }
    }

    const companyService = new CompanyService();
    export default companyService;