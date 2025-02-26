// @ts-nocheck
/* eslint-disable */

import { upload } from "@/lib/uploadcare"
import {
    CheckSquare,
    Code,
    Heading1,
    Heading2,
    Heading3,
    ImageIcon,
    List,
    ListOrdered,
    Text,
    TextQuote,
    Video,
} from "lucide-react"
import Suggestion from "@tiptap/suggestion"
import { Extension } from "@tiptap/core"

export const suggestionItems = [
    {
        title: "Text",
        description: "Just start typing with plain text.",
        searchTerms: ["p", "paragraph"],
        icon: <Text size={18} />,
        command: ({ editor, range }) => {
            editor.chain().focus().deleteRange(range).setNode("paragraph").run()
        },
    },
    {
        title: "To-do List",
        description: "Track tasks with a to-do list.",
        searchTerms: ["todo", "task", "list", "check", "checkbox"],
        icon: <CheckSquare size={18} />,
        command: ({ editor, range }) => {
            editor.chain().focus().deleteRange(range).toggleTaskList().run()
        },
    },
    {
        title: "Heading 1",
        description: "Big section heading.",
        searchTerms: ["title", "big", "large"],
        icon: <Heading1 size={18} />,
        command: ({ editor, range }) => {
            editor.chain().focus().deleteRange(range).setNode("heading", { level: 1 }).run()
        },
    },
    {
        title: "Heading 2",
        description: "Medium section heading.",
        searchTerms: ["subtitle", "medium"],
        icon: <Heading2 size={18} />,
        command: ({ editor, range }) => {
            editor.chain().focus().deleteRange(range).setNode("heading", { level: 2 }).run()
        },
    },
    {
        title: "Heading 3",
        description: "Small section heading.",
        searchTerms: ["subtitle", "small"],
        icon: <Heading3 size={18} />,
        command: ({ editor, range }) => {
            editor.chain().focus().deleteRange(range).setNode("heading", { level: 3 }).run()
        },
    },
    {
        title: "Bullet List",
        description: "Create a simple bullet list.",
        searchTerms: ["unordered", "point"],
        icon: <List size={18} />,
        command: ({ editor, range }) => {
            editor.chain().focus().deleteRange(range).toggleBulletList().run()
        },
    },
    {
        title: "Numbered List",
        description: "Create a list with numbering.",
        searchTerms: ["ordered"],
        icon: <ListOrdered size={18} />,
        command: ({ editor, range }) => {
            editor.chain().focus().deleteRange(range).toggleOrderedList().run()
        },
    },
    {
        title: "Quote",
        description: "Capture a quote.",
        searchTerms: ["blockquote"],
        icon: <TextQuote size={18} />,
        command: ({ editor, range }) => {
            editor.chain().focus().deleteRange(range).toggleBlockquote().run()
        },
    },
    {
        title: "Code",
        description: "Capture a code snippet.",
        searchTerms: ["codeblock"],
        icon: <Code size={18} />,
        command: ({ editor, range }) => {
            editor.chain().focus().deleteRange(range).toggleCodeBlock().run()
        },
    },
    {
        title: "Image",
        description: "Upload an image from your computer.",
        searchTerms: ["photo", "picture", "media"],
        icon: <ImageIcon size={18} />,
        command: ({ editor, range }) => {
            editor.chain().focus().deleteRange(range).run()
            const input = document.createElement("input")
            input.type = "file"
            input.accept = "image/*"
            input.onchange = async () => {
                if (input.files?.length) {
                    const file = input.files[0]
                    const uploaded = await upload.uploadFile(file)
                    const imgsrc = `https://ucarecdn.com/${uploaded.uuid}/`
                    if (imgsrc) {
                        editor.commands.insertContent([
                            {
                                type: "image",
                                attrs: { src: imgsrc },
                            },
                        ])
                    }
                }
            }
            input.click()
        },
    },
    {
        title: "Loom/Youtube",
        description: "Embed video",
        icon: <Video />,
        command: ({ editor, range }) => {
            editor.chain().focus().deleteRange(range).run()
            const videoSrc = window.prompt("Video URL")
            if (videoSrc?.length) {
                editor.commands.insertContent([
                    {
                        type: "video",
                        attrs: { src: videoSrc },
                    },
                ])
            }
        },
    },
]

export const slashCommand = Extension.create({
    name: "slashCommand",

    addOptions() {
        return {
            suggestion: {
                char: "/",
                items: ({ query }) => {
                    return suggestionItems.filter((item) =>
                        item.searchTerms.some((term) => term.includes(query.toLowerCase()))
                    )
                },
                command: ({ editor, range, item }) => {
                    item.command({ editor, range })
                },
                render: () => {
                    let component
                    let popup

                    return {
                        onStart: (props) => {
                            component = document.createElement("div")
                            component.classList.add("slash-command-popup")
                            popup = document.createElement("ul")
                            component.appendChild(popup)
                            document.body.appendChild(component)

                            props.clientRect && (component.style.top = `${props.clientRect().top}px`)
                        },
                        onUpdate: (props) => {
                            popup.innerHTML = ""
                            props.items.forEach((item) => {
                                const li = document.createElement("li")
                                li.textContent = item.title
                                li.addEventListener("click", () => props.command(item))
                                popup.appendChild(li)
                            })
                        },
                        onKeyDown: (props) => {
                            if (props.event.key === "Enter") {
                                props.command(props.items[0])
                                return true
                            }
                            return false
                        },
                        onExit: () => {
                            if (component) {
                                component.remove()
                                component = null
                                popup = null
                            }
                        },
                    }
                },
            },
        }
    },

    addProseMirrorPlugins() {
        return [Suggestion(this.options.suggestion)]
    },
})
