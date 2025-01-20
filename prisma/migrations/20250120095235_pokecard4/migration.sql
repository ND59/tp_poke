/*
  Warnings:

  - You are about to drop the `PokemonCardType` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "PokemonCardType";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "_PokemonCardTypes" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,
    CONSTRAINT "_PokemonCardTypes_A_fkey" FOREIGN KEY ("A") REFERENCES "PokemonCard" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_PokemonCardTypes_B_fkey" FOREIGN KEY ("B") REFERENCES "Type" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "_PokemonCardTypes_AB_unique" ON "_PokemonCardTypes"("A", "B");

-- CreateIndex
CREATE INDEX "_PokemonCardTypes_B_index" ON "_PokemonCardTypes"("B");
