-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_DomainExpansions" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "characterId" TEXT,
    "simpleDomainExpansionId" TEXT,
    "domainExpansionId" TEXT,
    CONSTRAINT "DomainExpansions_domainExpansionId_fkey" FOREIGN KEY ("domainExpansionId") REFERENCES "domainExpansion" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "DomainExpansions_simpleDomainExpansionId_fkey" FOREIGN KEY ("simpleDomainExpansionId") REFERENCES "simpleDomainExpansion" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "DomainExpansions_characterId_fkey" FOREIGN KEY ("characterId") REFERENCES "Character" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_DomainExpansions" ("characterId", "domainExpansionId", "id", "simpleDomainExpansionId") SELECT "characterId", "domainExpansionId", "id", "simpleDomainExpansionId" FROM "DomainExpansions";
DROP TABLE "DomainExpansions";
ALTER TABLE "new_DomainExpansions" RENAME TO "DomainExpansions";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
