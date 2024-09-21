import { useCallback, useState } from "react";
import { FileWithPath, useDropzone } from "react-dropzone";

type FileUploaderProps = {
  fileChange: (files: File[]) => void;
  mediaUrl?: string;
  type?: "profile" | "logo" | "video";
};

const FileUploader = ({ fileChange, mediaUrl, type }: FileUploaderProps) => {
  const [file, setFile] = useState<File[]>([]);
  const [fileUrl, setFileUrl] = useState(mediaUrl || "");

  const onDrop = useCallback(
    (acceptedFiles: FileWithPath[]) => {
      setFile(acceptedFiles);
      fileChange(acceptedFiles);
      setFileUrl(URL.createObjectURL(acceptedFiles[0]));
    },
    [file],
  );

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".png", ".jpeg", ".jpg", ".svg"],
      "video/*": [".mp4"],
    },
  });

  return (
    <div {...getRootProps()}>
      <input {...getInputProps()} className="cursor-pointer" />
      {type === "profile" ? (
        <div className="cursor-pointer flex-center gap-4 flex items-center">
          <img
            src={fileUrl || "/assets/images/no-image.png"}
            alt="image"
            className="h-16 w-16 rounded-full object-cover"
          />
          <p className="text-md">Change profile photo</p>
        </div>
      ) : type === "logo" ? (
        <>
          <div className="w-full border border-dashed p-5 flex justify-center cursor-pointer">
            <p className="text-gray-400 text-xs">Drag n drop gambar disini</p>
          </div>
          {fileUrl && (
            <div className="flex justify-center py-2 h-14 w-14">
              <img src={fileUrl} alt="image" />
            </div>
          )}
        </>
      ) : type === "video" ? (
        <>
          <div className="w-full border border-dashed p-5 flex justify-center cursor-pointer">
            <p className="text-gray-400">Drag n drop video disini</p>
          </div>
          {fileUrl && (
            <div className="flex justify-center py-2 h-40 w-40">
              <video src={fileUrl} controls />
            </div>
          )}
        </>
      ) : (
        <>
          <div className="w-full border border-dashed p-5 flex justify-center cursor-pointer">
            <p className="text-gray-400">Drag n drop gambar disini</p>
          </div>
          {fileUrl && (
            <div className="flex justify-center py-2 h-40 w-[25rem]">
              <img src={fileUrl} alt="image" className="w-full h-full object-cover" />
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default FileUploader;
