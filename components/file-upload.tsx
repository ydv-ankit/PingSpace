"use client";

import { UploadDropzone } from "@/lib/uploadthing";
import { OurFileRouter } from "@/app/api/uploadthing/core";
import Image from "next/image";
import { X } from "lucide-react";
// import "@uploadthing/react/styles.css";

interface FileUploadProps {
  endpoint: keyof OurFileRouter;
  value: string;
  onChange: (url?: string) => void;
}

export const FileUpload = ({ endpoint, value, onChange }: FileUploadProps) => {
  const fileType = value?.split(".").pop();
  if (value && fileType !== "pdf") {
    return (
      <div className="relative h-20 w-20 md:h-36 md:w-36 ring-1 ring-neutral-200 rounded-full">
        <Image
          src={value}
          alt="Server Image"
          sizes=""
          fill
          className="rounded-full object-cover"
        />
        <button
          className="absolute top-0 right-0 p-1 rounded-full bg-rose-500 text-white shadow-sm cursor-pointer"
          onClick={() => onChange("")}
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    );
  }

  return (
    <UploadDropzone
      endpoint={endpoint}
      onClientUploadComplete={(res) => {
        onChange(res?.[0].ufsUrl);
      }}
      onUploadError={(error: Error) => {
        console.log(error);
      }}
      onUploadBegin={() => {
        console.log("Uploading...");
      }}
    />
  );
};
