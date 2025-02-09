import { ourFileRouter } from "@/app/api/uploadthing/core";
import { UploadDropZone } from "@/lib/uploadthing";
import toast from "react-hot-toast";
interface FileUploadProps {
  onChange: (url?: string) => void;
  endpoint: keyof typeof ourFileRouter;
}
const FileUpload = ({ onChange, endpoint }: FileUploadProps) => {
  return (
    <UploadDropZone
      endpoint={endpoint}
      onClientUploadComplete={(res) => onChange(res?.[0].url)}
      onUploadError={(error: Error) => {
                console.log(error)
            }}
    />
  );
};

export default FileUpload;
