import Image from "next/image";
import Link from "next/link";
import { onAuthenticatedUser } from "@/actions/auth";
import { Models } from "node-appwrite";
import ActionDropdown from "@/components/library/ActionDropdown";
import { Chart } from "@/components/library/Chart";
import { FormattedDateTime } from "@/components/library/FormattedDateTime";
import { Thumbnail } from "@/components/library/Thumbnail";
import { Separator } from "@/components/ui/separator";
import { getFiles, getTotalFolderSpaceUsed } from "@/lib/actions/file.actions";
import { convertFileSize, getUsageSummary } from "@/lib/utils";
import { FolderDialog } from "../_components/create-folder";
import FileUploader from "@/components/library/FileUploader";
import { getCurrentUser } from "@/lib/actions/user.actions";
import { redirect } from "next/navigation";
  // Parallel requests


type Props = {
  params: {
    groupid: string;
    folderId: string;
  };
};



const FolderPage = async ({ params }: Props) => {

  const user = await onAuthenticatedUser();
  if (!user) redirect("/");
  
  const current = await getCurrentUser();
  if (!current) redirect("/");
  
  const [files, totalSpace] = await Promise.all([
    getFiles({ types: [], folderId: params.folderId, limit: 10 }),
    getTotalFolderSpaceUsed({ folderId: params.folderId }),
  ]);

  // Get usage summary
  const usageSummary = getUsageSummary(totalSpace);

  return (
    <div className="dashboard-container">
      <section>
        <Chart used={totalSpace.used} />

        {/* Uploaded file type summaries */}
        <ul className="dashboard-summary-list">
          {usageSummary.map((summary) => (
            <Link
              href={`/organizations/${params.groupid}/library/${params.folderId}/${summary.url}`}
              key={summary.title}
              className="dashboard-summary-card"
            >
              <div className="space-y-4">
                <div className="flex justify-between gap-3">
                  <Image
                    src={summary.icon}
                    width={100}
                    height={100}
                    alt="uploaded image"
                    className="summary-type-icon"
                  />
                  <h4 className="summary-type-size">
                    {convertFileSize(summary.size) || 0}
                  </h4>
                </div>

                <h5 className="summary-type-title">{summary.title}</h5>
                <Separator className="bg-light-400" />
                <FormattedDateTime
                  date={summary.latestDate}
                  className="text-center"
                />
              </div>
            </Link>
          ))}
        </ul>
      </section>

      {/* Recent files uploaded */}
      <section className="dashboard-recent-files">
        <h2 className="h3 xl:h2 text-light-100">Recent files uploaded</h2>
        {files.documents.length > 0 ? (
          <ul className="mt-5 flex flex-col gap-5">
            {files.documents.map((file: Models.Document) => (
              <Link
                href={file.url}
                target="_blank"
                className="flex items-center gap-3"
                key={file.$id}
              >
                <Thumbnail
                  type={file.type}
                  extension={file.extension}
                  url={file.url}
                />

                <div className="recent-file-details">
                  <div className="flex flex-col gap-1">
                    <p className="recent-file-name">{file.name}</p>
                    <FormattedDateTime
                      date={file.$createdAt}
                      className="caption"
                    />
                  </div>
                  <ActionDropdown file={file} />
                </div>
              </Link>
            ))}
          </ul>
        ) : (
          <p className="empty-list">No files uploaded</p>
        )}
      </section>
      <div className="flex fixed bottom-[80px] justify-between gap-x-2 px-1 z-50">
        <FileUploader
          ownerId={current.$id}
          accountId={current.$accountId}
          folderId={params.folderId}
          clerkId={user.clerkId!}
          />
     <FolderDialog
       ownerId={current.$id}
       clerkId={user.clerkId || ""}
       folderId={params.folderId}
       />
   </div>
    </div>
  );
};

export default FolderPage;
