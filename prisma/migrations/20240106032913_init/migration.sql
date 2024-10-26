-- CreateTable
CREATE TABLE "charcter" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "age" INTEGER NOT NULL,
    "bio" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Power" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "charcterId" TEXT,
    CONSTRAINT "Power_charcterId_fkey" FOREIGN KEY ("charcterId") REFERENCES "charcter" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
