import type { Prisma } from "@prisma/client";

const config: Prisma.SchemaConfig = {
  prisma: {
    engineType: "binary"
  }
};

export default config;
