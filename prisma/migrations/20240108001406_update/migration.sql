/*
  Warnings:

  - The primary key for the `Power` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - Added the required column `image` to the `Character` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Power" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "characterId" TEXT NOT NULL,
    CONSTRAINT "Power_characterId_fkey" FOREIGN KEY ("characterId") REFERENCES "Character" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Power" ("characterId", "description", "id", "name") SELECT "characterId", "description", "id", "name" FROM "Power";
DROP TABLE "Power";
ALTER TABLE "new_Power" RENAME TO "Power";
CREATE UNIQUE INDEX "Power_characterId_key" ON "Power"("characterId");
CREATE TABLE "new_Character" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "age" INTEGER NOT NULL,
    "bio" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "powerId" INTEGER
);
INSERT INTO "new_Character" ("age", "bio", "id", "name", "powerId") SELECT "age", "bio", "id", "name", "powerId" FROM "Character";
DROP TABLE "Character";
ALTER TABLE "new_Character" RENAME TO "Character";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
