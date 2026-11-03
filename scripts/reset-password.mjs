// Postavlja novu lozinku adminu direktno u bazi — za slučaj kad niko ne može da se uloguje.
// Upotreba: node scripts/reset-password.mjs <email>
// Lozinka se unosi u terminalu (ne ide kao argument, da ne ostane u istoriji komandi).
import "dotenv/config";
import readline from "node:readline";
import bcrypt from "bcryptjs";
import { PrismaClient } from "@prisma/client";

const email = (process.argv[2] || "").trim().toLowerCase();
if (!email) {
  console.error("Usage: node scripts/reset-password.mjs <email>");
  process.exit(1);
}

function askHidden(question) {
  return new Promise((resolve) => {
    const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
    rl._writeToOutput = (s) => {
      // prikaži samo pitanje, ne i otkucane znakove
      if (s.startsWith(question)) rl.output.write(s);
    };
    rl.question(question, (answer) => {
      rl.close();
      process.stdout.write("\n");
      resolve(answer);
    });
  });
}

const prisma = new PrismaClient();

try {
  const admin = await prisma.adminUser.findUnique({ where: { email } });
  if (!admin) {
    console.error(`No admin with email ${email}`);
    process.exit(1);
  }

  const password = await askHidden("New password (min 8): ");
  if (password.length < 8) {
    console.error("Password must be at least 8 characters.");
    process.exit(1);
  }
  const confirm = await askHidden("Repeat new password: ");
  if (password !== confirm) {
    console.error("Passwords do not match.");
    process.exit(1);
  }

  await prisma.adminUser.update({
    where: { id: admin.id },
    data: { passwordHash: await bcrypt.hash(password, 10) },
  });
  console.log(`Password changed for ${admin.name} <${admin.email}>.`);
} finally {
  await prisma.$disconnect();
}
