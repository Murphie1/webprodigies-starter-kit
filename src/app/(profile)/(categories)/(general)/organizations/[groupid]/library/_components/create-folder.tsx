"use client";

import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";

type FolderDialogProps = {
  ownerId: string;
  clerkId: string;
  authId?: string;
  groupId?: string;
  folderId?: string;
};

export const FolderDialog = ({ ownerId, clerkId, authId, groupId, folderId }: FolderDialogProps) => {
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
  setLoading(true);
  try {
    if (authId) {
      await fetch("/api/library/folders/createFolder", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, ownerId, authId, clerkId }),
      });
    } else if (groupId) {
      await fetch("/api/library/folders/createGroupFolder", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, ownerId, groupId, clerkId }),
      });
    } else if (folderId) {
      await fetch("/api/library/folders/createSubFolder", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, ownerId, folderId, clerkId }),
      });
    }
  } catch (error) {
    console.error("Error creating folder:", error);
  } finally {
    setLoading(false);
  }
};

  return (
    <Dialog>
      <DialogTrigger>
        <Button className="rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors px-4 py-2">
          {authId
            ? "Create Folder"
            : groupId
            ? "Create Group Folder"
            : folderId
            ? "Create Sub-Folder"
            : "Open Dialog"}
        </Button>
      </DialogTrigger>
      <DialogContent className="rounded-lg">
        <DialogHeader>
          <DialogTitle>
            {authId
              ? "Create Folder"
              : groupId
              ? "Create Group Folder"
              : folderId
              ? "Create Sub-Folder"
              : "Folder Dialog"}
          </DialogTitle>
        </DialogHeader>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
          className="space-y-4"
        >
          <Input
            type="text"
            placeholder="Enter folder name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="rounded-lg"
            required
          />
          <DialogFooter>
            <Button
              type="submit"
              className="rounded-lg bg-green-600 text-white hover:bg-green-700 transition-colors px-4 py-2"
              disabled={loading}
            >
              {loading ? "Processing..." : "Create"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default FolderDialog;
