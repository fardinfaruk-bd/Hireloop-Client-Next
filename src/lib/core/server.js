"use server";

import { getUserToken } from "./session";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

export const serverFetch = async (path) => {
    const res = await fetch(`${baseUrl}${path}`);
    return res.json();
}

export const serverMutation = async (path, data, method = 'POST') => {
    const res = await fetch(`${baseUrl}${path}`, {
        method: method,
        headers: {
            'Content-Type': 'application/json',
            ...await authHeader(),
        },
        body: JSON.stringify(data),
    });

    //handle 401, 403, 500 errors here and throw appropriate messages for the client to display

    return res.json();
}

export const authHeader = async() => {
    const token = await getUserToken();
    const header = token ? {
        authorization: `Bearer ${token}`,
    } : {};
    return header;
}
