// This is the prisma client
// The docs to get this are found here
// https://www.prisma.io/docs/orm/prisma-client/setup-and-configuration/databases-connections#re-using-a-single-prismaclient-instance

import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient();

export default prisma;
