import { dbConnect } from "../../../../../lib/dbConnect";
import { tokenValidationSchema } from "../../../../../types/schemas";
import token from "../../../../../models/Token";
import { NextResponse } from "next/server";

export async function GET () {
    await dbConnect();
    return Response.json({message: "message"}, {status: 200})
}

export async function POST (req: Request) {
    try {
        await dbConnect();

        const body = await req.json()

        const validatedFields = tokenValidationSchema.safeParse(body)
        if (!validatedFields.success) {
            Response.json({
                message: "validation error",
                error: validatedFields.error.flatten().fieldErrors
            }, {
                status: 200
            }
        )
        }

        const data = await new token(body).save()

        return NextResponse.json({
            message: "New token added"
        }, {
            status: 201
        })
    } catch (err) {
        return NextResponse.json({
            message: err
        }, {
            status: 500
        })
    }
}