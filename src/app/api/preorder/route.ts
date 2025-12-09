import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { z } from "zod";

const itemSchema = z.object({
  productId: z.string(),
  name: z.string(),
  price: z.number(),
  quantity: z.number(),
  lineTotal: z.number(),
});

const customerSchema = z.object({
  fullName: z.string(),
  phoneNumber: z.string(),
  email: z.string().optional().nullable(),
  pickupLocation: z.string(),
  pickupDate: z.string(),
  pickupTime: z.string(),
  specialInstructions: z.string().optional().nullable(),
});

const bodySchema = z.object({
  customer: customerSchema,
  items: z.array(itemSchema).nonempty(),
  total: z.number(),
});

export async function POST(request: Request) {
  try {
    const json = await request.json();
    const { customer, items, total } = bodySchema.parse(json);

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT ?? 587),
      secure: false,
      auth: process.env.SMTP_USER
        ? {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS,
          }
        : undefined,
    });

    const textLines: string[] = [];
    textLines.push(`New preorder from ${customer.fullName}`);
    textLines.push("");
    textLines.push(`Phone: ${customer.phoneNumber}`);
    if (customer.email) textLines.push(`Email: ${customer.email}`);
    textLines.push("");
    textLines.push(
      `Pickup: ${customer.pickupLocation} on ${customer.pickupDate} at ${customer.pickupTime}`
    );
    textLines.push("");
    textLines.push("Items:");
    for (const item of items) {
      textLines.push(
        `- ${item.name} x${item.quantity} @ $${item.price.toFixed(
          2
        )} = $${item.lineTotal.toFixed(2)}`
      );
    }
    textLines.push("");
    textLines.push(`Total: $${total.toFixed(2)}`);
    if (customer.specialInstructions) {
      textLines.push("");
      textLines.push("Special instructions:");
      textLines.push(customer.specialInstructions);
    }

    await transporter.sendMail({
      from: process.env.SMTP_FROM ?? "no-reply@greencross.local",
      to: "greencrossmgmt@gmail.com",
      subject: `New GreenCross preorder – ${customer.fullName}`,
      text: textLines.join("\n"),
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Error in preorder API", err);
    return NextResponse.json({ ok: false }, { status: 400 });
  }
}
