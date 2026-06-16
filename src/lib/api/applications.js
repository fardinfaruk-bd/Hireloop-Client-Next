import { protectedFetch } from "../core/server";

export const getApplicationsByApplicant = async (applicantId) => {
    return await protectedFetch(`/api/applications?applicantId=${applicantId}`);
}