/*
  Warnings:

  - The primary key for the `Auth` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `TodoItem` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "Auth" DROP CONSTRAINT "Auth_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Auth_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Auth_id_seq";

-- AlterTable
ALTER TABLE "TodoItem" DROP CONSTRAINT "TodoItem_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "TodoItem_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "TodoItem_id_seq";
