/*
  Warnings:

  - The primary key for the `Course` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `groupId` on the `Course` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `Course` table. All the data in the column will be lost.
  - You are about to drop the column `privacy` on the `Course` table. All the data in the column will be lost.
  - You are about to drop the column `published` on the `Course` table. All the data in the column will be lost.
  - You are about to drop the column `thumbnail` on the `Course` table. All the data in the column will be lost.
  - You are about to drop the `KidsProfile` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[profileId,groupSpaceId]` on the table `GSMember` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[userId,groupSpaceId]` on the table `GSMember` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[profileId,groupId]` on the table `Members` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[userId,groupId]` on the table `Members` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[email]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `title` to the `Course` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Course` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `Course` table without a default value. This is not possible if the table is not empty.
  - Added the required column `email` to the `Profile` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Theme" AS ENUM ('Normal', 'Gray', 'Retro', 'UltraModern', 'Emo', 'Spooky');

-- CreateEnum
CREATE TYPE "MemberRole" AS ENUM ('OWNER', 'MODERATOR', 'FINANCE', 'STUDENT');

-- CreateEnum
CREATE TYPE "ProfileType" AS ENUM ('KIDS', 'GENERAL');

-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('ADMIN', 'MODERATOR', 'SUPPORT', 'LEARNER');

-- CreateEnum
CREATE TYPE "ChapterType" AS ENUM ('Video', 'Audio', 'Image', 'Text', 'Doc');

-- DropForeignKey
ALTER TABLE "Course" DROP CONSTRAINT "Course_groupId_fkey";

-- DropForeignKey
ALTER TABLE "KidsProfile" DROP CONSTRAINT "KidsProfile_userId_fkey";

-- DropForeignKey
ALTER TABLE "Message" DROP CONSTRAINT "Message_senderid_fkey";

-- DropForeignKey
ALTER TABLE "Module" DROP CONSTRAINT "Module_courseId_fkey";

-- DropIndex
DROP INDEX "Profile_clerkId_key";

-- AlterTable
ALTER TABLE "Comment" ADD COLUMN     "profileId" UUID;

-- AlterTable
ALTER TABLE "Course" DROP CONSTRAINT "Course_pkey",
DROP COLUMN "groupId",
DROP COLUMN "name",
DROP COLUMN "privacy",
DROP COLUMN "published",
DROP COLUMN "thumbnail",
ADD COLUMN     "categoryId" TEXT,
ADD COLUMN     "imgUrl" TEXT,
ADD COLUMN     "isFree" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "isPublished" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "outComes" TEXT,
ADD COLUMN     "preview" TEXT,
ADD COLUMN     "price" DOUBLE PRECISION,
ADD COLUMN     "title" TEXT NOT NULL,
ADD COLUMN     "tutors" TEXT[],
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "userId" TEXT NOT NULL,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "description" DROP NOT NULL,
ADD CONSTRAINT "Course_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "GSMember" ADD COLUMN     "profileId" UUID,
ALTER COLUMN "userId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Group" ADD COLUMN     "createdFree" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "profileId" UUID;

-- AlterTable
ALTER TABLE "Groupspace" ADD COLUMN     "profileId" UUID,
ALTER COLUMN "joinCode" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Like" ADD COLUMN     "profileId" UUID;

-- AlterTable
ALTER TABLE "Members" ADD COLUMN     "profileId" UUID,
ADD COLUMN     "role" "MemberRole" NOT NULL DEFAULT 'STUDENT';

-- AlterTable
ALTER TABLE "Post" ADD COLUMN     "image" TEXT,
ADD COLUMN     "profileId" UUID,
ADD COLUMN     "video" TEXT;

-- AlterTable
ALTER TABLE "Profile" ADD COLUMN     "attributes" TEXT[],
ADD COLUMN     "disabilities" TEXT[],
ADD COLUMN     "email" TEXT NOT NULL,
ADD COLUMN     "gamified" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "memory" TEXT[],
ADD COLUMN     "mode" TEXT NOT NULL DEFAULT 'Both',
ADD COLUMN     "theme" "Theme" NOT NULL DEFAULT 'Normal',
ADD COLUMN     "type" "ProfileType" NOT NULL DEFAULT 'KIDS';

-- AlterTable
ALTER TABLE "Session" ADD COLUMN     "profileId" UUID,
ALTER COLUMN "userId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "attributes" TEXT[],
ADD COLUMN     "disabilities" TEXT[],
ADD COLUMN     "email" TEXT,
ADD COLUMN     "gamified" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "memory" TEXT[],
ADD COLUMN     "mode" TEXT NOT NULL DEFAULT 'Both',
ADD COLUMN     "role" "UserRole" NOT NULL DEFAULT 'LEARNER',
ADD COLUMN     "theme" "Theme" NOT NULL DEFAULT 'Normal',
ALTER COLUMN "lastname" DROP NOT NULL;

-- DropTable
DROP TABLE "KidsProfile";

-- CreateTable
CREATE TABLE "Groupcourse" (
    "id" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "thumbnail" TEXT NOT NULL,
    "published" BOOLEAN NOT NULL DEFAULT false,
    "privacy" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "groupId" UUID,

    CONSTRAINT "Groupcourse_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Category" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Category_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Attachment" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "courseId" TEXT,
    "chapterId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Attachment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Certificate" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "courseId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Certificate_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Chapter" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "videoUrl" TEXT,
    "audioUrl" TEXT,
    "imageUrl" TEXT,
    "fileUrl" TEXT,
    "position" INTEGER NOT NULL,
    "content" TEXT,
    "transcript" TEXT,
    "type" "ChapterType" NOT NULL DEFAULT 'Video',
    "isPublished" BOOLEAN NOT NULL DEFAULT false,
    "isFree" BOOLEAN NOT NULL DEFAULT false,
    "courseId" TEXT NOT NULL,
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Chapter_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MuxData" (
    "id" TEXT NOT NULL,
    "assetId" TEXT NOT NULL,
    "playbackId" TEXT,
    "chapterId" TEXT NOT NULL,

    CONSTRAINT "MuxData_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserProgress" (
    "id" TEXT NOT NULL,
    "userId" TEXT,
    "chapterId" TEXT NOT NULL,
    "isCompleted" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "UserProgress_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Coursepurchase" (
    "id" TEXT NOT NULL,
    "userId" TEXT,
    "courseId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Coursepurchase_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "StripeCustomer" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "stripeCustomerId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "StripeCustomer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Discussionbox" (
    "id" TEXT NOT NULL,
    "courseId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Discussionbox_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Waiver" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "courseId" TEXT NOT NULL,
    "message" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Waiver_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Discussion" (
    "id" UUID NOT NULL,
    "message" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "senderid" UUID,
    "recieverId" UUID,
    "boxId" UUID NOT NULL,

    CONSTRAINT "Discussion_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Category_name_key" ON "Category"("name");

-- CreateIndex
CREATE INDEX "Certificate_courseId_idx" ON "Certificate"("courseId");

-- CreateIndex
CREATE INDEX "Chapter_courseId_idx" ON "Chapter"("courseId");

-- CreateIndex
CREATE UNIQUE INDEX "MuxData_chapterId_key" ON "MuxData"("chapterId");

-- CreateIndex
CREATE INDEX "UserProgress_chapterId_idx" ON "UserProgress"("chapterId");

-- CreateIndex
CREATE UNIQUE INDEX "UserProgress_userId_chapterId_key" ON "UserProgress"("userId", "chapterId");

-- CreateIndex
CREATE INDEX "Coursepurchase_courseId_idx" ON "Coursepurchase"("courseId");

-- CreateIndex
CREATE UNIQUE INDEX "Coursepurchase_userId_courseId_key" ON "Coursepurchase"("userId", "courseId");

-- CreateIndex
CREATE UNIQUE INDEX "StripeCustomer_userId_key" ON "StripeCustomer"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "StripeCustomer_stripeCustomerId_key" ON "StripeCustomer"("stripeCustomerId");

-- CreateIndex
CREATE UNIQUE INDEX "Waiver_userId_key" ON "Waiver"("userId");

-- CreateIndex
CREATE INDEX "Course_categoryId_idx" ON "Course"("categoryId");

-- CreateIndex
CREATE UNIQUE INDEX "GSMember_profileId_groupSpaceId_key" ON "GSMember"("profileId", "groupSpaceId");

-- CreateIndex
CREATE UNIQUE INDEX "GSMember_userId_groupSpaceId_key" ON "GSMember"("userId", "groupSpaceId");

-- CreateIndex
CREATE UNIQUE INDEX "Members_profileId_groupId_key" ON "Members"("profileId", "groupId");

-- CreateIndex
CREATE UNIQUE INDEX "Members_userId_groupId_key" ON "Members"("userId", "groupId");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "Group" ADD CONSTRAINT "Group_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "Profile"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Groupspace" ADD CONSTRAINT "Groupspace_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "Profile"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Members" ADD CONSTRAINT "Members_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "Profile"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "Profile"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Like" ADD CONSTRAINT "Like_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "Profile"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "Profile"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Groupcourse" ADD CONSTRAINT "Groupcourse_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES "Group"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Module" ADD CONSTRAINT "Module_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "Groupcourse"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Message" ADD CONSTRAINT "Message_senderid_fkey" FOREIGN KEY ("senderid") REFERENCES "Members"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GSMember" ADD CONSTRAINT "GSMember_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "Profile"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Session" ADD CONSTRAINT "Session_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "Profile"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Course" ADD CONSTRAINT "Course_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Attachment" ADD CONSTRAINT "Attachment_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "Course"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Attachment" ADD CONSTRAINT "Attachment_chapterId_fkey" FOREIGN KEY ("chapterId") REFERENCES "Chapter"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Certificate" ADD CONSTRAINT "Certificate_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "Course"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Chapter" ADD CONSTRAINT "Chapter_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "Course"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MuxData" ADD CONSTRAINT "MuxData_chapterId_fkey" FOREIGN KEY ("chapterId") REFERENCES "Chapter"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserProgress" ADD CONSTRAINT "UserProgress_chapterId_fkey" FOREIGN KEY ("chapterId") REFERENCES "Chapter"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Coursepurchase" ADD CONSTRAINT "Coursepurchase_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "Course"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Discussionbox" ADD CONSTRAINT "Discussionbox_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "Course"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Waiver" ADD CONSTRAINT "Waiver_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "Course"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Discussion" ADD CONSTRAINT "Discussion_boxId_fkey" FOREIGN KEY ("boxId") REFERENCES "Discussionbox"("id") ON DELETE CASCADE ON UPDATE CASCADE;
