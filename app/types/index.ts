import {User} from "@prisma/client"

export type SafeUser = Omit<
    User,
    "createdAt"  | "updatedAt"  | "emailVerified"
> & {
    createdAt: string;
    updatedAt: string;
    emailVerified: string  | null
}

//naprvaljen tip jer mijenjamo getCurrentUser 
// return {
//     ...currentUser,
//     createdAt: currentUser.createdAt.toISOString(),
//     updatedAt: currentUser.updatedAt.toISOString(),
//     emailVerified: currentUser.emailVerified?.toISOString()  || null
// };
//kada se dodijeli ovaj tip on ce vaziti