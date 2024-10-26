-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Powers" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "characterId" TEXT,
    CONSTRAINT "Powers_characterId_fkey" FOREIGN KEY ("characterId") REFERENCES "Character" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Powers" ("characterId", "description", "id", "name") SELECT "characterId", "description", "id", "name" FROM "Powers";
DROP TABLE "Powers";
ALTER TABLE "new_Powers" RENAME TO "Powers";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
