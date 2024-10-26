/*
  Warnings:

  - You are about to alter the column `powerId` on the `Character` table. The data in that column could be lost. The data in that column will be cast from `String` to `Int`.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Character" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "age" INTEGER NOT NULL,
    "bio" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "powerId" INTEGER
);
INSERT INTO "new_Character" ("age", "bio", "id", "image", "name", "powerId") SELECT "age", "bio", "id", "image", "name", "powerId" FROM "Character";
DROP TABLE "Character";
ALTER TABLE "new_Character" RENAME TO "Character";
CREATE UNIQUE INDEX "Character_id_key" ON "Character"("id");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
