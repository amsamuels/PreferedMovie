-- CreateTable
CREATE TABLE `Vote` (
    `id` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `votedForId` INTEGER NOT NULL,
    `votedAgainstId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Film` (
    `id` INTEGER NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `img` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Vote` ADD CONSTRAINT `Vote_votedForId_fkey` FOREIGN KEY (`votedForId`) REFERENCES `Film`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Vote` ADD CONSTRAINT `Vote_votedAgainstId_fkey` FOREIGN KEY (`votedAgainstId`) REFERENCES `Film`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;