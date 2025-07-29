/*
  Warnings:

  - Made the column `team1Score` on table `Game` required. This step will fail if there are existing NULL values in that column.
  - Made the column `team2Score` on table `Game` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE `Game` DROP FOREIGN KEY `Game_tableId_fkey`;

-- DropIndex
DROP INDEX `Game_tableId_fkey` ON `Game`;

-- AlterTable
ALTER TABLE `Game` MODIFY `tableId` INTEGER NULL,
    MODIFY `team1Score` INTEGER NOT NULL DEFAULT 0,
    MODIFY `team2Score` INTEGER NOT NULL DEFAULT 0;

-- AddForeignKey
ALTER TABLE `Game` ADD CONSTRAINT `Game_tableId_fkey` FOREIGN KEY (`tableId`) REFERENCES `Table`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
