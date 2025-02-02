import { action } from "./_generated/server"
import { v } from "convex/values"
import { api } from "./_generated/api"
import axios from "axios"

// Replace with your Gemini Chat API key
const geminiApiKey = process.env.CHAT_GEMINI_API_KEY

// Craiyon API endpoint
const craiyonApiUrl = "https://api.craiyon.com/generate"

export const chat = action({
    args: {
        messageBody: v.string(),
        conversation: v.id("conversations"),
    },
    handler: async (ctx, args) => {
        try {
            // Call Gemini chat API instead of OpenAI
            const response = await axios.post(
                "https://api.gemini.com/chat",
                {
                    messages: [
                        {
                            role: "system",
                            content:
                                "You are a terse bot in a group chat responding to questions with typically short answers, unless the question requires a longer answer",
                        },
                        {
                            role: "user",
                            content: args.messageBody,
                        },
                    ],
                },
                {
                    headers: {
                        "Authorization": `Bearer ${geminiApiKey}`,
                        "Content-Type": "application/json",
                    },
                }
            )
            
            const messageContent = response.data.choices[0].message.content

            // Send response message to conversation
            await ctx.runMutation(api.messages.sendHakimaMessage, {
                content:
                    messageContent ?? "I'm sorry, I don't have a response for that",
                conversation: args.conversation,
                messageType: "text",
            })
        } catch (error) {
            console.error("Gemini API error:", error)
            await ctx.runMutation(api.messages.sendHakimaMessage, {
                content: "An error occurred while processing your request.",
                conversation: args.conversation,
                messageType: "text",
            })
        }
    },
})

export const craiyonImage = action({
    args: {
        conversation: v.id("conversations"),
        messageBody: v.string(),
    },
    handler: async (ctx, args) => {
        try {
            // Call Craiyon API for image generation
            const response = await axios.post(craiyonApiUrl, {
                prompt: args.messageBody,
            })

            const imageUrl = response.data.images[0] // Assuming the API returns images in an array

            // Send image URL to conversation
            await ctx.runMutation(api.messages.sendHakimaMessage, {
                content: imageUrl ?? "/gpt.png",  // Default image if no response
                conversation: args.conversation,
                messageType: "image",
            })
        } catch (error) {
            console.error("Craiyon API error:", error)
            await ctx.runMutation(api.messages.sendHakimaMessage, {
                content: "/gpt.png", // Fallback image on error
                conversation: args.conversation,
                messageType: "image",
            })
        }
    },
})
