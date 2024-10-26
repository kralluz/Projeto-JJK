/*
  Warnings:

  - You are about to drop the `charcter` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the column `charcterId` on the `Power` table. All the data in the column will be lost.
  - Added the required column `characterId` to the `Power` table without a default value. This is not possible if the table is not empty.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "charcter";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "Character" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "age" INTEGER NOT NULL,
    "bio" TEXT NOT NULL,
    "powerId" INTEGER
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Power" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "characterId" TEXT NOT NULL,
    CONSTRAINT "Power_characterId_fkey" FOREIGN KEY ("characterId") REFERENCES "Character" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Power" ("description", "id", "name") SELECT "description", "id", "name" FROM "Power";
DROP TABLE "Power";
ALTER TABLE "new_Power" RENAME TO "Power";
CREATE UNIQUE INDEX "Power_characterId_key" ON "Power"("characterId");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
