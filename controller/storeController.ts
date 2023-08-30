import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import { HTTP } from "../error/mainError";
import cloudinary from "../utils/cloudiinary";
import https from "https";

const prisma = new PrismaClient();

export const readProducts = async (req: Request, res: Response) => {
  try {
    const product = await prisma.store.findMany({});
    return res.status(HTTP.OK).json({
      message: "view Product",
      data: product,
    });
  } catch (error) {
    return res.status(HTTP.BAD_REQUEST).json({
      message: "Error",
    });
  }
};

export const createProduct = async (req: any, res: Response) => {
  try {
    const { title, cost, image } = req.body;

    // const { secure_url } = await cloudinary.uploader.upload(req.file.path);

    const product = await prisma.store.create({
      data: { title, cost, image },
    });
    return res.status(HTTP.CREATED).json({
      message: "create Product",
      data: product,
    });
  } catch (error) {
    return res.status(HTTP.BAD_REQUEST).json({
      message: error,
    });
  }
};

export const detailedProduct = async (req: any, res: Response) => {
  try {
    const { productID } = req.params;

    const product = await prisma.store.findUnique({
      where: { id: productID },
    });
    return res.status(HTTP.CREATED).json({
      message: "create Product",
      data: product,
    });
  } catch (error) {
    return res.status(HTTP.BAD_REQUEST).json({
      message: error,
    });
  }
};

export const payment = async (req: Request, res: Response) => {
  try {
    const { amount } = req.body;

    const params = JSON.stringify({
      email: "customer@email.com",
      amount: amount * 100,
    });

    const options = {
      hostname: "api.paystack.co",
      port: 443,
      path: "/transaction/initialize",
      method: "POST",
      headers: {
        Authorization:
          "Bearer sk_test_ec1b0ccabcb547fe0efbd991f3b64b485903c88e",
        "Content-Type": "application/json",
      },
    };

    const ask = https
      .request(options, (resp) => {
        let data = "";

        resp.on("data", (chunk) => {
          data += chunk;
        });

        resp.on("end", () => {
          console.log(JSON.parse(data));
          res.status(HTTP.OK).json({
            message: "Payment successful",
            data: JSON.parse(data),
          });
        });
      })
      .on("error", (error) => {
        console.error(error);
      });

    ask.write(params);
    ask.end();
  } catch (error) {
    return res.status(HTTP.BAD_REQUEST).json({
      message: "Error making Payment",
    });
  }
};
