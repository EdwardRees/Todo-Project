/*
  Warnings:

  - The primary key for the `TodoList` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE "TodoItem" DROP CONSTRAINT "TodoItem_listId_fkey";

-- AlterTable
ALTER TABLE "TodoItem" ALTER COLUMN "listId" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "TodoList" DROP CONSTRAINT "TodoList_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "TodoList_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "TodoList_id_seq";

-- AddForeignKey
ALTER TABLE "TodoItem" ADD CONSTRAINT "TodoItem_listId_fkey" FOREIGN KEY ("listId") REFERENCES "TodoList"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
