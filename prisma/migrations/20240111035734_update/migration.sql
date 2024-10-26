/*
  Warnings:

  - You are about to drop the `Power` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Power";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "Powers" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "characterId" TEXT NOT NULL,
    CONSTRAINT "Powers_characterId_fkey" FOREIGN KEY ("characterId") REFERENCES "Character" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Powers_characterId_key" ON "Powers"("characterId");
