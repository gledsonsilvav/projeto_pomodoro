/*
  Warnings:

  - The primary key for the `task` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `completeDate` on the `task` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `task` table. All the data in the column will be lost.
  - You are about to drop the column `interruptDate` on the `task` table. All the data in the column will be lost.
  - You are about to alter the column `id` on the `task` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.

*/
-- DropIndex
DROP INDEX `Task_startDate_idx` ON `task`;

-- AlterTable
ALTER TABLE `settings` MODIFY `workTime` INTEGER NOT NULL DEFAULT 25,
    MODIFY `shortBreakTime` INTEGER NOT NULL DEFAULT 5,
    MODIFY `longBreakTime` INTEGER NOT NULL DEFAULT 15;

-- AlterTable
ALTER TABLE `task` DROP PRIMARY KEY,
    DROP COLUMN `completeDate`,
    DROP COLUMN `createdAt`,
    DROP COLUMN `interruptDate`,
    MODIFY `id` INTEGER NOT NULL AUTO_INCREMENT,
    ADD PRIMARY KEY (`id`);
