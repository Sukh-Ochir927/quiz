import { Webhook } from "svix";
import { headers } from "next/headers";
import { WebhookEvent } from "@clerk/nextjs/server";
import prisma from "@/app/lib/prisma";

export async function POST(req: Request) {
  const body = await req.text();
  const headerPayload = await headers();

  const wh = new Webhook(process.env.CLERK_WEBHOOK_SECRET!);
  const evt = wh.verify(body, {
    "svix-id": headerPayload.get("svix-id")!,
    "svix-timestamp": headerPayload.get("svix-timestamp")!,
    "svix-signature": headerPayload.get("svix-signature")!,
  }) as WebhookEvent;

  if (evt.type === "user.created") {
    await prisma.user.create({
      data: {
        id: evt.data.id,
        email: evt.data.email_addresses[0].email_address,
        name: `${evt.data.first_name ?? ""} ${evt.data.last_name ?? ""}`.trim(),
      },
    });
  }

  if (evt.type === "user.deleted") {
    await prisma.user.delete({ where: { id: evt.data.id! } });
  }

  return new Response("OK", { status: 200 });
}
