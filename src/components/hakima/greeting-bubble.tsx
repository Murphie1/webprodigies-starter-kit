import { TModel } from "@/hooks/hakima/use-model-list";
import { BotAvatar } from "./bot-avatar";
import { motion } from "framer-motion";
import { REVEAL_ANIMATION_VARIANTS } from "@/hooks/hakima/use-mdx";
import { Tooltip } from "./tooltip";

export type TGreetingBubble = {
  bot: TModel;
};

export const GreetingBubble = ({ bot }: TGreetingBubble) => {
  return (
    <div className="flex flex-col md:flex-row gap-2 mt-6 w-full">
  {/*<div className="px-0 md:px-3 py-1">
        <Tooltip content={bot?.name}>
          <BotAvatar size={"small"} name={bot?.name} avatar={bot?.avatar} />
        </Tooltip>
      </div>*/}
      <div className="rounded-2xl w-full flex flex-col items-start">
        <div className="py-1.5 w-full">
          <p className="text-sm md:text-base">
            <motion.span
              variants={REVEAL_ANIMATION_VARIANTS}
              className="dark:text-zinc-100 text-zinc-700 tracking-[0.01em]"
              animate={"visible"}
              initial={"hidden"}
            >
                               {bot?.name} {/* {bot.greetingMessage}*/}
            </motion.span>
          </p>
        </div>
      </div>
    </div>
  );
};
