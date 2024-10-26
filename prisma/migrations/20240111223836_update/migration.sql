/*
  Warnings:

  - Made the column `powerId` on table `Character` required. This step will fail if there are existing NULL values in that column.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Character" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "age" INTEGER NOT NULL,
    "bio" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "powerId" TEXT NOT NULL
);
INSERT INTO "new_Character" ("age", "bio", "id", "image", "name", "powerId") SELECT "age", "bio", "id", "image", "name", "powerId" FROM "Character";
DROP TABLE "Character";
ALTER TABLE "new_Character" RENAME TO "Character";
CREATE UNIQUE INDEX "Character_id_key" ON "Character"("id");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
