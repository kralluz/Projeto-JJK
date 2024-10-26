/*
  Warnings:

  - You are about to drop the `domainExpansion` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `simpleDomainExpansion` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the column `domainExpansionId` on the `DomainExpansions` table. All the data in the column will be lost.
  - You are about to drop the column `simpleDomainExpansionId` on the `DomainExpansions` table. All the data in the column will be lost.
  - Added the required column `description` to the `DomainExpansions` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `DomainExpansions` table without a default value. This is not possible if the table is not empty.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "domainExpansion";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "simpleDomainExpansion";
PRAGMA foreign_keys=on;

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_DomainExpansions" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "characterId" TEXT,
    CONSTRAINT "DomainExpansions_characterId_fkey" FOREIGN KEY ("characterId") REFERENCES "Character" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_DomainExpansions" ("characterId", "id") SELECT "characterId", "id" FROM "DomainExpansions";
DROP TABLE "DomainExpansions";
ALTER TABLE "new_DomainExpansions" RENAME TO "DomainExpansions";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
