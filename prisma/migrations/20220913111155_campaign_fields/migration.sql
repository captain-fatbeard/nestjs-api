-- CreateTable
CREATE TABLE "fields" (
    "id" SERIAL NOT NULL,
    "container" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "value" TEXT,
    "options" TEXT,
    "description" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "campaignContentId" INTEGER,
    "campaignSettingId" INTEGER,

    CONSTRAINT "fields_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "fields" ADD CONSTRAINT "fields_campaignContentId_fkey" FOREIGN KEY ("campaignContentId") REFERENCES "campaigns"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "fields" ADD CONSTRAINT "fields_campaignSettingId_fkey" FOREIGN KEY ("campaignSettingId") REFERENCES "campaigns"("id") ON DELETE SET NULL ON UPDATE CASCADE;
