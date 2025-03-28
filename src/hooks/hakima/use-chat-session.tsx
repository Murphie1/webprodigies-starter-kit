import { PromptType, RoleType } from "@/lib/prompts";
import { AIMessage, HumanMessage } from "@langchain/core/messages";
import { get, set } from "idb-keyval";
import moment from "moment";
import { v4 } from "uuid";
import { TModelKey } from "./use-model-list";

import { sortMessages, sortSessions } from "@/lib/helper";
import { useMutation, useQuery } from "@tanstack/react-query";

export enum ModelType {
  GPT3 = "gpt-3",
  GPT4 = "gpt-4",
  CLAUDE2 = "claude-2",
  CLAUDE3 = "claude-3",
}

export type TAssistantType = "base" | "custom";

export type TAssistant = {
  name: string;
  systemPrompt: string;
  baseModel: TModelKey;
  key: TModelKey | string;
  type: TAssistantType;
};

export type TLLMInputProps = {
  context?: string;
  input?: string;
  image?: string;
  sessionId: string;
  messageId?: string;
  assistant: TAssistant;
};

export type TToolResponse = {
  toolName: string;
  toolLoading?: boolean;
  toolArgs?: any;
  toolResponse?: any;
  toolRenderArgs?: any;
};

export type TChatMessage = {
  id: string;
  rawHuman?: string;
  rawAI?: string;
  sessionId: string;
  isLoading?: boolean;
  stop?: boolean;
  stopReason?: "error" | "cancel" | "apikey" | "recursion" | "finish";
  image?: string;
  inputProps?: TLLMInputProps;
  tools?: TToolResponse[];
  createdAt: string;
};

export type TChatSession = {
  messages: TChatMessage[];
  title?: string;
  id: string;
  createdAt: string;
  updatedAt?: string;
};

export const useChatSession = (id?: string) => {
  const getSessions = async (): Promise<TChatSession[]> => {
    return (await get("chat-sessions")) || [];
  };

  const setSession = async (chatSession: TChatSession) => {
    const sessions = await getSessions();
    const newSessions = [...sessions, chatSession];
    await set("chat-sessions", newSessions);
  };

  const addMessageToSession = async (
    sessionId: string,
    chatMessage: TChatMessage
  ) => {
    const sessions = await getSessions();
    const newSessions = sessions.map((session) => {
      if (session.id === sessionId) {
        if (!!session?.messages?.length) {
          const isExistingMessage = session.messages.find(
            (m) => m.id === chatMessage.id
          );
          return {
            ...session,
            messages: isExistingMessage
              ? session.messages.map((m) => {
                  if (m.id === chatMessage.id) {
                    return { ...m, ...chatMessage };
                  }
                  return m;
                })
              : [...session.messages, chatMessage],
          };
        }
        return {
          ...session,
          messages: [chatMessage],
          title: chatMessage.rawHuman,
          updatedAt: moment().toISOString(),
        };
      }
      return session;
    });
    await set("chat-sessions", newSessions);
  };

  const updateSession = async (
    sessionId: string,
    newSession: Partial<Omit<TChatSession, "id">>
  ) => {
    const sessions = await getSessions();
    const newSessions = sessions.map((session) => {
      if (session.id === sessionId) {
        return { ...session, ...newSession };
      }
      return session;
    });
    await set("chat-sessions", newSessions);
  };

  const getSessionById = async (id: string) => {
    const sessions = await getSessions();
    return sessions.find((session: TChatSession) => session.id === id);
  };

  const removeSessionById = async (id: string) => {
    const sessions = await getSessions();
    const newSessions = sessions.filter(
      (session: TChatSession) => session.id !== id
    );
    await set("chat-sessions", newSessions);
    return newSessions;
  };

  const removeMessageById = async (sessionId: string, messageId: string) => {
    const sessions = await getSessions();
    const newSessions = sessions.map((session) => {
      if (session.id === sessionId) {
        const newMessages = session.messages.filter(
          (message) => message.id !== messageId
        );

        console.log("newMessages", newMessages, messageId, sessionId);
        return { ...session, messages: newMessages };
      }
      return session;
    });

    const newFilteredSessions = newSessions?.filter(
      (s) => !!s?.messages?.length
    );
    console.log("newSessions", newSessions);
    await set("chat-sessions", newFilteredSessions);
    return newFilteredSessions;
  };

  const createNewSession = async () => {
    const sessions = (await getSessions()) || [];
    const latestSession = sortSessions(sessions, "createdAt")?.[0];
    if (latestSession && !latestSession?.messages?.length) {
      return latestSession;
    }

    const newSession: TChatSession = {
      id: v4(),
      messages: [],
      title: "Untitled",
      createdAt: moment().toISOString(),
    };

    console.log("newSession", newSession);

    const newSessions = [...sessions, newSession];
    await set("chat-sessions", newSessions);
    return newSession;
  };

  const clearSessions = async () => {
    await set("chat-sessions", []);
  };

  const sessionsQuery = useQuery({
    queryKey: ["chat-sessions"],
    queryFn: async () => {
      return await getSessions();
    },
  });

  const setSessionMutation = useMutation({
    mutationFn: async (session: TChatSession) => await setSession(session),
    onSuccess: () => {
      sessionsQuery.refetch();
    },
  });

  const addMessageToSessionMutation = useMutation({
    mutationFn: async ({
      sessionId,
      message,
    }: {
      sessionId: string;
      message: TChatMessage;
    }) => {
      await addMessageToSession(sessionId, message);
    },
    onSuccess: () => {
      sessionsQuery.refetch();
    },
  });

  const updateSessionMutation = useMutation({
    mutationFn: async ({
      sessionId,
      session,
    }: {
      sessionId: string;
      session: Partial<Omit<TChatSession, "id">>;
    }) => {
      await updateSession(sessionId, session);
    },
    onSuccess: () => {
      sessionsQuery.refetch();
    },
  });

  const removeSessionMutation = useMutation({
    mutationFn: async (sessionId: string) => await removeSessionById(sessionId),
    onSuccess: () => {
      sessionsQuery.refetch();
    },
  });

  const removeSessionByIdMutation = useMutation({
    mutationFn: async (sessionId: string) => await removeSessionById(sessionId),
    onSuccess: () => {
      sessionsQuery.refetch();
    },
  });

  const getSessionByIdQuery = useQuery({
    queryKey: ["chat-session", id],
    queryFn: async () => {
      if (!id) return;
      return await getSessionById(id);
    },
    enabled: !!id,
  });

  const createNewSessionMutation = useMutation({
    mutationFn: async () => await createNewSession(),
    onSuccess: () => {
      sessionsQuery?.refetch();
    },
  });

  const clearSessionsMutation = useMutation({
    mutationFn: async () => await clearSessions(),
    onSuccess: () => {
      sessionsQuery.refetch();
    },
  });

  const removeMessageByIdMutation = useMutation({
    mutationFn: async ({
      sessionId,
      messageId,
    }: {
      sessionId: string;
      messageId: string;
    }) => {
      await removeMessageById(sessionId, messageId);
    },
    onSuccess: () => {
      sessionsQuery.refetch();
    },
  });

  const getSessionByIdMutation = useMutation({
    mutationFn: async (id: string) => await getSessionById(id),
  });

  const addSessionsMutation = useMutation({
    mutationFn: async (sessions: TChatSession[]) => {
      const existingSessions = await getSessions();
      const newSessions = [...existingSessions, ...sessions];
      await set("chat-sessions", newSessions);
      return newSessions;
    },
    onSuccess: () => {
      sessionsQuery.refetch();
    },
  });

  return {
    sessionsQuery,
    setSessionMutation,
    addMessageToSessionMutation,
    updateSessionMutation,
    removeSessionMutation,
    removeSessionByIdMutation,
    getSessionByIdQuery,
    createNewSessionMutation,
    clearSessionsMutation,
    removeMessageByIdMutation,
    getSessionByIdMutation,
    addSessionsMutation,
  };
};
