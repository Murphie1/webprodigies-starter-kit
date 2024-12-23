import { createClient } from "@supabase/supabase-js"
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

export const supabaseClient = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
)

export const truncateString = (string: string) => {
    return string.slice(0, 60) + "..."
}

export const validateURLString = (url: string) => {
    const youtubeRegex = new RegExp("www.youtube.com")
    const loomRegex = new RegExp("www.loom.com")

    if (youtubeRegex.test(url)) {
        return {
            url,
            type: "YOUTUBE",
        }
    }

    if (loomRegex.test(url)) {
        return {
            url,
            type: "LOOM",
        }
    } else {
        return {
            url: undefined,
            type: "IMAGE",
        }
    }
}

export const parseStringify = (value: any) => JSON.parse(JSON.stringify(value))

export const getAccessType = (userType: UserType) => {
    switch (userType) {
        case "creator":
            return ["room:write"]
        case "editor":
            return ["room:write"]
        case "viewer":
            return ["room:read", "room:presence:write"]
        default:
            return ["room:read", "room:presence:write"]
    }
}

export const dateConverter = (timestamp: string): string => {
    const timestampNum = Math.round(new Date(timestamp).getTime() / 1000)
    const date: Date = new Date(timestampNum * 1000)
    const now: Date = new Date()

    const diff: number = now.getTime() - date.getTime()
    const diffInSeconds: number = diff / 1000
    const diffInMinutes: number = diffInSeconds / 60
    const diffInHours: number = diffInMinutes / 60
    const diffInDays: number = diffInHours / 24

    switch (true) {
        case diffInDays > 7:
            return `${Math.floor(diffInDays / 7)} weeks ago`
        case diffInDays >= 1 && diffInDays <= 7:
            return `${Math.floor(diffInDays)} days ago`
        case diffInHours >= 1:
            return `${Math.floor(diffInHours)} hours ago`
        case diffInMinutes >= 1:
            return `${Math.floor(diffInMinutes)} minutes ago`
        default:
            return "Just now"
    }
}

// Function to generate a random color in hex format, excluding specified colors
export function getRandomColor() {
    const avoidColors = ["#000000", "#FFFFFF", "#8B4513"] // Black, White, Brown in hex format

    let randomColor
    do {
        // Generate random RGB values
        const r = Math.floor(Math.random() * 256) // Random number between 0-255
        const g = Math.floor(Math.random() * 256)
        const b = Math.floor(Math.random() * 256)

        // Convert RGB to hex format
        randomColor = `#${r.toString(16)}${g.toString(16)}${b.toString(16)}`
    } while (avoidColors.includes(randomColor))

    return randomColor
}

export const brightColors = [
    "#2E8B57", // Darker Neon Green
    "#FF6EB4", // Darker Neon Pink
    "#00CDCD", // Darker Cyan
    "#FF00FF", // Darker Neon Magenta
    "#FF007F", // Darker Bright Pink
    "#FFD700", // Darker Neon Yellow
    "#00CED1", // Darker Neon Mint Green
    "#FF1493", // Darker Neon Red
    "#00CED1", // Darker Bright Aqua
    "#FF7F50", // Darker Neon Coral
    "#9ACD32", // Darker Neon Lime
    "#FFA500", // Darker Neon Orange
    "#32CD32", // Darker Neon Chartreuse
    "#ADFF2F", // Darker Neon Yellow Green
    "#DB7093", // Darker Neon Fuchsia
    "#00FF7F", // Darker Spring Green
    "#FFD700", // Darker Electric Lime
    "#FF007F", // Darker Bright Magenta
    "#FF6347", // Darker Neon Vermilion
]

export function getUserColor(userId: string) {
    let sum = 0
    for (let i = 0; i < userId.length; i++) {
        sum += userId.charCodeAt(i)
    }

    const colorIndex = sum % brightColors.length
    return brightColors[colorIndex]
}

    export function formatDate(date_ms: number) {
	// Convert milliseconds to seconds
	let date_seconds = date_ms / 1000;

	// Convert to Date object
	let date_obj = new Date(date_seconds * 1000);

	// Get current date and time
	let current_date = new Date();
	current_date.setHours(0, 0, 0, 0); // Set hours, minutes, seconds, and milliseconds to 0
	let current_time = current_date.getTime();

	// Get the date part of the provided date
	let provided_date = new Date(date_obj);
	provided_date.setHours(0, 0, 0, 0); // Set hours, minutes, seconds, and milliseconds to 0

	// Check if it's today
	if (provided_date.getTime() === current_time) {
		return date_obj.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", hour12: true });
	}

	// Check if it's yesterday
	let yesterday = new Date();
	yesterday.setDate(yesterday.getDate() - 1);
	yesterday.setHours(0, 0, 0, 0); // Set hours, minutes, seconds, and milliseconds to 0
	if (provided_date.getTime() === yesterday.getTime()) {
		return "Yesterday";
	}

	// Check if it's a different day of the week
	if (provided_date.getDay() < current_date.getDay()) {
		let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
		return days[provided_date.getDay()];
	}

	// If none of the above conditions match, return in a different format
	return provided_date.getMonth() + 1 + "/" + provided_date.getDate() + "/" + provided_date.getFullYear();
}

export const isSameDay = (timestamp1: number, timestamp2: number): boolean => {
	const date1 = new Date(timestamp1);
	const date2 = new Date(timestamp2);
	return (
		date1.getFullYear() === date2.getFullYear() &&
		date1.getMonth() === date2.getMonth() &&
		date1.getDate() === date2.getDate()
	);
};

// Define getRelativeDateTime function
export const getRelativeDateTime = (message: any, previousMessage: any) => {
	const today = new Date();
	const yesterday = new Date(today);
	yesterday.setDate(yesterday.getDate() - 1);
	const lastWeek = new Date(today);
	lastWeek.setDate(lastWeek.getDate() - 7);

	const messageDate = new Date(message._creationTime);

	if (!previousMessage || !isSameDay(previousMessage._creationTime, messageDate.getTime())) {
		if (isSameDay(messageDate.getTime(), today.getTime())) {
			return "Today";
		} else if (isSameDay(messageDate.getTime(), yesterday.getTime())) {
			return "Yesterday";
		} else if (messageDate.getTime() > lastWeek.getTime()) {
			const options: Intl.DateTimeFormatOptions = {
				weekday: "long",
			};
			return messageDate.toLocaleDateString(undefined, options);
		} else {
			const options: Intl.DateTimeFormatOptions = {
				day: "2-digit",
				month: "2-digit",
				year: "numeric",
			};
			return messageDate.toLocaleDateString(undefined, options);
		}
	}
};

export function randomID(len: number) {
	let result = "";
	if (result) return result;
	var chars = "12345qwertyuiopasdfgh67890jklmnbvcxzMNBVCZXASDQWERTYHGFUIOLKJP",
		maxPos = chars.length,
		i;
	len = len || 5;
	for (i = 0; i < len; i++) {
		result += chars.charAt(Math.floor(Math.random() * maxPos));
	}
	return result;
    }
