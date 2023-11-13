import bcrypt from "bcrypt"
import prisma from "@/app/libs/prismadb"
import {NextResponse} from "next/server"

export async function POST(request: Request) {
    const body = await request.json();
    //stvari koje nam trebaju za registraciju:
    const {
        email,
        name,
        password
    } = body;
    //hashing password
    const hashedPassword = await bcrypt.hash(password,12)
//kreiranje korisnika: U data sta stavljamo to ovdje 
//markiramo i zato je hashed password
    const user = await prisma.user.create({
        data: {
            email,
            name,
            hashedPassword
        },
    })

    return NextResponse.json(user)
 }


   