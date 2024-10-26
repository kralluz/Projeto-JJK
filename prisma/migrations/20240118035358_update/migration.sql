-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_DomainExpansion" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "characterId" TEXT,
    CONSTRAINT "DomainExpansion_characterId_fkey" FOREIGN KEY ("characterId") REFERENCES "Character" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_DomainExpansion" ("characterId", "description", "id", "name") SELECT "characterId", "description", "id", "name" FROM "DomainExpansion";
DROP TABLE "DomainExpansion";
ALTER TABLE "new_DomainExpansion" RENAME TO "DomainExpansion";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
