/*
  Warnings:

  - You are about to drop the `DomainExpansions` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "DomainExpansions";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "DomainExpansion" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "characterId" TEXT,
    CONSTRAINT "DomainExpansion_characterId_fkey" FOREIGN KEY ("characterId") REFERENCES "Character" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
