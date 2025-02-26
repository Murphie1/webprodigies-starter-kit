import { Extension } from "@tiptap/core"

const CustomCharacterCount = Extension.create({
    name: "characterCount",

        addOptions() {
                return {
                            limit: null,
                                    }
                                        },

                                            addStorage() {
                                                    return {
                                                                characterCount: 0,
                                                                        }
                                                                            },

                                                                                onUpdate() {
                                                                                        this.storage.characterCount = this.editor.getText().length
                                                                                                if (this.options.limit && this.storage.characterCount > this.options.limit) {
                                                                                                            this.editor.commands.deleteRange({
                                                                                                                            from: this.options.limit,
                                                                                                                                            to: this.storage.characterCount,
                                                                                                                                                        })
                                                                                                                                                                }
                                                                                                                                                                    },
                                                                                                                                                                    })

                                                                                                                                                                    export default CustomCharacterCount