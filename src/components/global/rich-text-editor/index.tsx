"use client"

import { cn } from "@/lib/utils"
import { ErrorMessage } from "@hookform/error-message"
import { useState } from "react"
import { FieldErrors } from "react-hook-form"
import { HtmlParser } from "../html-parser"
import { ColorSelector } from "./color-selector"
import { defaultExtensions } from "./extensions"
import { Image } from "./image"
import { LinkSelector } from "./link-selector"
import NodeSelector from "./node-selector"
import { slashCommand, suggestionItems } from "./slash-command"
import { TextButtons } from "./text-selector"
import { Video } from "./video"
import CustomCharacterCount from "./characters"

// ✅ Import TipTap directly (instead of novel)
import { EditorProvider, EditorContent, useEditor } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import Placeholder from "@tiptap/extension-placeholder"
import CharacterCount from "@tiptap/extension-character-count"
import Link from "@tiptap/extension-link"
import ImageExtension from "@tiptap/extension-image"
import VideoExtension from "@tiptap/extension-video"

type Props = {
    content: any
    setContent: React.Dispatch<React.SetStateAction<any>>
    min: number
    max: number
    name: string
    errors: FieldErrors
    textContent: string | undefined
    setTextContent: React.Dispatch<React.SetStateAction<string | undefined>>
    onEdit?: boolean
    inline?: boolean
    disabled?: boolean
    htmlContent?: string | undefined
    setHtmlContent?: React.Dispatch<React.SetStateAction<string | undefined>>
}

const BlockTextEditor = ({
    setContent,
    content,
    min,
    max,
    name,
    errors,
    setTextContent,
    textContent,
    onEdit,
    inline,
    disabled,
    htmlContent,
    setHtmlContent,
}: Props) => {
    const handleCommandNavigationCustom = (event: KeyboardEvent) => {
        if (event.key === "ArrowDown" || event.key === "ArrowUp") {
            event.preventDefault()
            const items = document.querySelectorAll("[role='option']")
            let index = Array.from(items).findIndex((el) =>
                el.classList.contains("aria-selected"),
            )

            if (event.key === "ArrowDown") {
                index = (index + 1) % items.length
            } else if (event.key === "ArrowUp") {
                index = (index - 1 + items.length) % items.length
            }

            items.forEach((el, i) => {
                el.classList.toggle("aria-selected", i === index)
            })

            items[index]?.scrollIntoView({ block: "nearest" })
        }
    }

    const [openNode, setOpenNode] = useState<boolean>(false)
    const [openLink, setOpenLink] = useState<boolean>(false)
    const [openColor, setOpenColor] = useState<boolean>(false)
    const [characters, setCharacters] = useState<number | undefined>(
        textContent?.length || undefined,
    )

    // ✅ Initialize TipTap Editor (Replacing novel)
    const editor = useEditor({
        extensions: [
            StarterKit,
            Placeholder.configure({
                placeholder: "Type '/' here to insert elements...",
            }),
            CharacterCount.configure({ limit: max }),
            Link,
            ImageExtension,
            VideoExtension,
        ],
        content,
        editable: !disabled,
        editorProps: {
            handleDOMEvents: {
                keydown: (_view, event) => handleCommandNavigationCustom(event),
            },
            attributes: {
                class: `prose prose-lg dark:prose-invert focus:outline-none max-w-full [&_h1]:text-4xl [&_h2]:text-3xl [&_h3]:text-2xl text-gray`,
            },
        },
        onUpdate: ({ editor }) => {
            const json = editor.getJSON()
            const text = editor.getText()
            if (setHtmlContent) {
                const html = editor.getHTML()
                setHtmlContent(html)
            }
            setContent(json)
            setTextContent(text)
            setCharacters(text.length)
        },
    })

    return (
        <div>
            {htmlContent && !onEdit && inline ? (
                <HtmlParser html={htmlContent} />
            ) : (
                <EditorProvider editor={editor}>
                    <EditorContent
                        className={cn(
                            inline
                                ? onEdit && "mb-5"
                                : "border-[1px] rounded-xl px-10 py-5 text-base border-gray bg-white w-full dark:border-themeGray dark:bg-themeBlack",
                        )}
                    />
                </EditorProvider>
            )}
            {inline ? (
                onEdit && (
                    <div className="flex justify-between py-2">
                        <p
                            className={cn(
                                "text-xs",
                                characters &&
                                    (characters < min || characters > max) &&
                                    "text-red-500",
                            )}
                        >
                            {characters || 0} / {max}
                        </p>
                        <ErrorMessage
                            errors={errors}
                            name={name}
                            render={({ message }) => (
                                <p className="text-red-400 mt-2">
                                    {message === "Required" ? "" : message}
                                </p>
                            )}
                        />
                    </div>
                )
            ) : (
                <div className="flex justify-between py-2">
                    <p
                        className={cn(
                            "text-xs",
                            characters &&
                                (characters < min || characters > max) &&
                                "text-red-500",
                        )}
                    >
                        {characters || 0} / {max}
                    </p>
                    <ErrorMessage
                        errors={errors}
                        name={name}
                        render={({ message }) => (
                            <p className="text-red-400 mt-2">
                                {message === "Required" ? "" : message}
                            </p>
                        )}
                    />
                </div>
            )}
        </div>
    )
}

export default BlockTextEditor
