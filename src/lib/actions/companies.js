"use server";

import { revalidatePath } from "next/cache";
import { serverMutation } from "../core/server";

export const createCompany = async(newCompany) => {
    return serverMutation('/api/companies', newCompany);
}

export const updateCompany = async(id , data) => {
    const result = serverMutation(`/api/companies/${id}`, data, "PATCH");
    revalidatePath("/dashboard/admin/companies");
    return result;
}


// const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

// export const createCompany = async (companyData) => {
//     const res = await fetch(`${baseUrl}/api/companies`, {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(companyData),
//     });
//     return res.json();
// }
