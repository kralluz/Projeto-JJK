/*
  Warnings:

  - You are about to drop the column `description` on the `DomainExpansions` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `DomainExpansions` table. All the data in the column will be lost.
  - Added the required column `domainExpansionId` to the `DomainExpansions` table without a default value. This is not possible if the table is not empty.
  - Added the required column `simpleDomainExpansionId` to the `DomainExpansions` table without a default value. This is not possible if the table is not empty.

*/
-- CreateTable
CREATE TABLE "simpleDomainExpansion" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "domainExpansion" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_DomainExpansions" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "characterId" TEXT,
    "simpleDomainExpansionId" TEXT NOT NULL,
    "domainExpansionId" TEXT NOT NULL,
    CONSTRAINT "DomainExpansions_domainExpansionId_fkey" FOREIGN KEY ("domainExpansionId") REFERENCES "domainExpansion" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "DomainExpansions_simpleDomainExpansionId_fkey" FOREIGN KEY ("simpleDomainExpansionId") REFERENCES "simpleDomainExpansion" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "DomainExpansions_characterId_fkey" FOREIGN KEY ("characterId") REFERENCES "Character" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_DomainExpansions" ("characterId", "id") SELECT "characterId", "id" FROM "DomainExpansions";
DROP TABLE "DomainExpansions";
ALTER TABLE "new_DomainExpansions" RENAME TO "DomainExpansions";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
