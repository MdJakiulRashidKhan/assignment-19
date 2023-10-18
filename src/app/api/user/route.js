import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

export async function POST(req, res) {
  try {
    const prisma = new PrismaClient();
    
    const result = await prisma.user.createMany({
      data: [
        {
          firstName: "milon",
          middlename: "chandro",
          lastName: "roy",
          mobile: "017764653149",
          email: "milon@gmail.com",
          password: "123456",
          admin: true,
        },

        {
          firstName: "joy",
          middlename: "chandro",
          lastName: "roy",
          mobile: "017764653149",
          email: "joy@gmail.com",
          password: "123456",
          admin: true,
        },
      ],
    });

    return NextResponse.json({
      status: "success",
      data: result,
    });
  } catch (error) {
    return NextResponse.json({
      status: "error",
      message: error.message,
    });
  }
}

// Transcation Rollback
try {
  const prisma = new PrismaClient();

  const createUser = prisma.user.create({
      data:{email:"sumon@gmail.com", password:"123"}
  })

  const product=prisma.product.delete({
      where:{id:5}
  })

  const result=await prisma.$transaction([createUser, product])

  console.log(result)
}
catch (e) {

  console.log(e)
}

//   ☝ Read operation
export const GET = async () => {
  BigInt.prototype.toJSON = function () {
    return this.toString();
  };
  try {
    const prisma = new PrismaClient();
    const result = await prisma.user.findMany({});
    return NextResponse.json({
      status: "success",
      data: result,
    });
  } catch (error) {
    return NextResponse.json({
      status: "failed",
      data: error.message,
    });
  }
};

//   ☝ Update operation
export const PUT = async (req, res) => {
  try {
    const prisma = new PrismaClient();
    const { searchParams } = new URL(req.url);
    const id = +searchParams.get("id");
    const result = await prisma.user.update({
      where: {
        id: id,
      },
      data: {
        firstName: "updatedName",
        middlename: "updated middlename",
      },
    });
    return NextResponse.json({
      status: "success",
      data: result,
    });
  } catch (error) {
    return NextResponse.json({
      status: "failed",
      data: error.message,
    });
  }
};

//   ☝ Delete operation
export const DELETE = async (req, res) => {
  try {
    const prisma = new PrismaClient();
    const { searchParams } = new URL(req.url);
    const id = +searchParams.get("id");
    const result = await prisma.user.delete({
      where: {
        id: id,
      },
    });
    return NextResponse.json({
      status: "success",
      data: result,
    });
  } catch (error) {
    return NextResponse.json({
      status: "failed",
      data: error.message,
    });
  }
};
