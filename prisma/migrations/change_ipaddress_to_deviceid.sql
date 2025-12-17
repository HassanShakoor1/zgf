-- Migration: Change ipAddress to deviceId in video_likes table
-- This allows each device (browser) to like independently

-- Step 1: Drop the old unique constraint
ALTER TABLE "video_likes" DROP CONSTRAINT IF EXISTS "video_likes_videoId_ipAddress_key";

-- Step 2: Rename the column
ALTER TABLE "video_likes" RENAME COLUMN "ipAddress" TO "deviceId";

-- Step 3: Add the new unique constraint
ALTER TABLE "video_likes" ADD CONSTRAINT "video_likes_videoId_deviceId_key" UNIQUE ("videoId", "deviceId");

-- Step 4: (Optional) Clear existing likes to avoid conflicts if needed
-- TRUNCATE TABLE "video_likes";
-- UPDATE "videos" SET "likesCount" = 0;

