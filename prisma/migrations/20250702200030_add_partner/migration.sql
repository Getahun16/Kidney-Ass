/*
  Warnings:

  - You are about to drop the column `logo` on the `partner` table. All the data in the column will be lost.
  - Added the required column `image` to the `Partner` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `partner` DROP COLUMN `logo`,
    ADD COLUMN `image` VARCHAR(191) NOT NULL;
