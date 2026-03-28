/*
  Warnings:

  - You are about to alter the column `firstName` on the `Student` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `VarChar(100)`.
  - You are about to alter the column `lastName` on the `Student` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `VarChar(100)`.
  - You are about to alter the column `email` on the `Student` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `VarChar(100)`.
  - Added the required column `enrollmentDate` to the `Student` table without a default value. This is not possible if the table is not empty.
  - Made the column `phone` on table `Student` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `Student` ADD COLUMN `enrollmentDate` DATETIME(3) NOT NULL,
    MODIFY `firstName` VARCHAR(100) NOT NULL,
    MODIFY `lastName` VARCHAR(100) NOT NULL,
    MODIFY `email` VARCHAR(100) NOT NULL,
    MODIFY `phone` VARCHAR(20) NOT NULL;

-- CreateIndex
CREATE INDEX `Student_email_idx` ON `Student`(`email`);

-- CreateIndex
CREATE INDEX `Student_enrollmentDate_idx` ON `Student`(`enrollmentDate`);
