//ovdje kreiramo kako ce da se vidi da je neko ulogovan
//znaci pravimo session

import { getServerSession } from "next-auth/next";
import { authOptions } from "@/pages/api/auth/[...nextauth]";

import prisma from "@/app/libs/prismadb"
export async function getSession() {
    return await getServerSession(authOptions)
}

//pravljenje sesije:
export default async function getCurrentUser() {
    try {
        const session = await getSession()
        //ako nmema sesije
        if(!session?.user?.email) {
            return null;
        }
        const currentUser = await prisma.user.findUnique({
            where: {
                email: session.user.email as string
            } 
        });
        //ako nema current user-a provjera:
        if(!currentUser) {
            return null;
        }
        return {
            ...currentUser,
            createdAt: currentUser.createdAt.toISOString(),
            updatedAt: currentUser.updatedAt.toISOString(),
            emailVerified: currentUser.emailVerified?.toISOString()  || null
        };
    } catch (error: any) {
        return null;
    }
}

//getCurrentUser cemo koristiti u layout jer je on 
//u defaultu server-side, mogao si i da u layoutu
//napravis cijli ts.
//interfejs u Navbar-u je sledeci