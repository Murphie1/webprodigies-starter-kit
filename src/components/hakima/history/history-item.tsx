import { useSessionsContext } from "@/context/sessions";
import { TChatSession } from "@/hooks/hakima/use-chat-session";
import { useModelList } from "@/hooks/hakima/use-model-list";
import { cn } from "@/lib/utils";
import { PencilSimple, TrashSimple } from "@phosphor-icons/react";
import moment from "moment";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Flex } from "../flex";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Type } from "../text";
import { Tooltip } from "@/components/hakima/tooltip";
//import { Delete01Icon, Edit02Icon } from "@hugeicons/react";

export const HistoryItem = ({
  session,
  dismiss,
}: {
  session: TChatSession;
  dismiss: () => void;
}) => {
  const {
    currentSession,
    updateSessionMutation,
    removeSessionByIdMutation,
    createSession,
  } = useSessionsContext();
  const { getModelByKey, getAssistantByKey } = useModelList();
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(session.title);
  const router = useRouter();
  const [openDeleteConfirm, setOpenDeleteConfirm] = useState(false);
  const historyInputRef = useRef<HTMLInputElement>(null);

  const assistantProps = getAssistantByKey(
    session.messages?.[0]?.inputProps?.assistant?.key!
  );

  const modelProps = getModelByKey(
    session.messages?.[0]?.inputProps?.assistant?.baseModel!
  );

  useEffect(() => {
    if (isEditing) {
      historyInputRef.current?.focus();
    }
  }, [isEditing]);

  return (
    <div
      key={session.id}
      className={cn(
        "gap-2 group w-full cursor-pointer flex flex-row items-start p-2 rounded-xl hover:bg-black/10 hover:dark:bg-black/30",
        currentSession?.id === session.id || isEditing
          ? "bg-black/10 dark:bg-black/30"
          : ""
      )}
    >
      {isEditing ? (
        <Input
          variant="ghost"
          className="h-6 text-sm"
          ref={historyInputRef}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              setIsEditing(false);
              updateSessionMutation.mutate({
                sessionId: session.id,
                session: {
                  title: title?.trim() || session?.title || "Untitled",
                },
              });
            }
          }}
          onBlur={() => {
            setIsEditing(false);
            updateSessionMutation.mutate({
              sessionId: session.id,
              session: { title: title?.trim() || session?.title || "Untitled" },
            });
          }}
        />
      ) : (
        <>
          {modelProps?.icon?.("sm")}
          <div
            onClick={() => {
        if (!isEditing) {
          router.push(`/hakima/${session.id}`);
          dismiss();
        }
      }}
            >
          <Flex direction="col" items="start" className="w-full">
            <Type
              className="line-clamp-1"
              size="sm"
              textColor="primary"
              weight="medium"
            >
              {session.title}
            </Type>
            <Type className="line-clamp-1" size="xs" textColor="tertiary">
              {moment(session.updatedAt).fromNow()}
            </Type>
          </Flex>
            </div>
        </>
      )}
      {(!isEditing || openDeleteConfirm) && (
        <Flex
          className={cn("group-hover:flex md:hidden", openDeleteConfirm && "flex")}
        >
          <Button
            variant="ghost"
            size="iconXS"
            onClick={(e) => {
              setIsEditing(true);
              e.stopPropagation();
            }}
          >
            <PencilSimple size={14} />
          </Button>
          <Tooltip content="Delete">
            <Popover
              open={openDeleteConfirm}
              onOpenChange={setOpenDeleteConfirm}
            >
              <PopoverTrigger asChild>
                <Button
                  variant={openDeleteConfirm ? "secondary" : "ghost"}
                  size="iconXS"
                  onClick={(e) => {
                     setOpenDeleteConfirm(true);
                     e.stopPropagation();
                  }}
                >
                  <TrashSimple size={14} />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="z-[1000]" side="bottom">
                <p className="text-sm md:text-base font-medium pb-2">
                  Are you sure you want to delete this message?
                </p>
                <div className="flex flex-row gap-1">
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={(e) => {
                      removeSessionByIdMutation.mutate(session.id, {
                        onSuccess: () => {
                          createSession({
                            redirect: true,
                          });
                        },
                      });
                      e.stopPropagation();
                    }}
                  >
                    Delete Convo
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={(e) => {
                      setOpenDeleteConfirm(false);
                      e.stopPropagation();
                    }}
                  >
                    Cancel
                  </Button>
                </div>
              </PopoverContent>
            </Popover>
          </Tooltip>
        </Flex>
      )}
    </div>
  );
};
