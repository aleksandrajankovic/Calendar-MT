// src/app/api/admin/me/password/route.js
export const runtime = "nodejs";

import bcrypt from "bcryptjs";
import prisma from "@/lib/db";
import { getAdminFromRequest, MIN_PASSWORD_LENGTH } from "@/lib/auth";
import { checkRateLimit, recordFailedAttempt, clearAttempts } from "@/lib/rateLimit";

// PUT /api/admin/me/password  -> ulogovani admin menja svoju lozinku (uz trenutnu)
export async function PUT(req) {
  try {
    const session = await getAdminFromRequest(req);
    if (!session) return new Response("Unauthorized", { status: 401 });

    // isti limit kao login — sprečava pogađanje trenutne lozinke
    const key = `pwd:${session.adminId}`;
    const limit = checkRateLimit(key);
    if (!limit.allowed) {
      return new Response("Too many attempts. Try again later.", {
        status: 429,
        headers: { "Retry-After": String(limit.retryAfter) },
      });
    }

    const body = await req.json().catch(() => ({}));
    const currentPassword = String(body.currentPassword || "");
    const newPassword = String(body.newPassword || "");

    if (newPassword.length < MIN_PASSWORD_LENGTH) {
      return new Response(`Password must be at least ${MIN_PASSWORD_LENGTH} characters`, { status: 400 });
    }

    const admin = await prisma.adminUser.findUnique({ where: { id: session.adminId } });
    if (!admin) return new Response("Unauthorized", { status: 401 });

    const ok = await bcrypt.compare(currentPassword, admin.passwordHash);
    if (!ok) {
      recordFailedAttempt(key);
      return new Response("Current password is incorrect", { status: 403 });
    }

    clearAttempts(key);
    await prisma.adminUser.update({
      where: { id: admin.id },
      data: { passwordHash: await bcrypt.hash(newPassword, 10) },
    });

    return new Response(null, { status: 204 });
  } catch (err) {
    console.error("Change password error:", err);
    return new Response("Error", { status: 500 });
  }
}
