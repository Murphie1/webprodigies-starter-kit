import { ArrowRight, Info } from "@phosphor-icons/react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useLLMTest } from "@/hooks/hakima/use-llm-test";
import { usePreferenceContext } from "@/context/preferences";
import { Flex } from "@/components/hakima/flex";

export const OpenAISettings = () => {
  const [key, setKey] = useState<string>("");
  const { apiKeys, updateApiKey } = usePreferenceContext();
  const { renderSaveApiKeyButton } = useLLMTest();
  useEffect(() => {
    setKey(apiKeys.openai || "");
  }, [apiKeys.openai]);
  return (
    <Flex direction={"col"} gap="sm">
      <div className="flex flex-row items-end justify-between">
        <p className="text-xs md:text-sm  text-zinc-500">Open AI API Key</p>
      </div>
      <Input
        placeholder="Sk-xxxxxxxxxxxxxxxxxxxxxxxx"
        value={key}
        type="password"
        autoComplete="off"
        onChange={(e) => {
          setKey(e.target.value);
        }}
      />
      <div className="flex flex-row items-center gap-2">
        <Button
          size="sm"
          variant="secondary"
          onClick={() => {
            window.open(
              "https://platform.openai.com/account/api-keys",
              "_blank"
            );
          }}
        >
          Get your API key here <ArrowRight size={16} weight="bold" />
        </Button>
        {key &&
          key !== apiKeys?.openai &&
          renderSaveApiKeyButton("openai", key, () => {
            updateApiKey("openai", key);
          })}
        {apiKeys?.openai && (
          <Button
            variant={"outline"}
            size={"sm"}
            onClick={() => {
              setKey("");
              updateApiKey("openai", "");
            }}
          >
            Remove API Key
          </Button>
        )}
      </div>

      <div className="flex flex-row items-center gap-1 py-2 text-zinc-500">
        <Info size={16} weight="bold" />
        <p className="text-xs">
          Your API Key is stored locally on your browser and never sent anywhere
          else.
        </p>
      </div>
    </Flex>
  );
};
