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
    let date_seconds = date_ms / 1000

    // Convert to Date object
    let date_obj = new Date(date_seconds * 1000)

    // Get current date and time
    let current_date = new Date()
    current_date.setHours(0, 0, 0, 0) // Set hours, minutes, seconds, and milliseconds to 0
    let current_time = current_date.getTime()

    // Get the date part of the provided date
    let provided_date = new Date(date_obj)
    provided_date.setHours(0, 0, 0, 0) // Set hours, minutes, seconds, and milliseconds to 0

    // Check if it's today
    if (provided_date.getTime() === current_time) {
        return date_obj.toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
            hour12: true,
        })
    }

    // Check if it's yesterday
    let yesterday = new Date()
    yesterday.setDate(yesterday.getDate() - 1)
    yesterday.setHours(0, 0, 0, 0) // Set hours, minutes, seconds, and milliseconds to 0
    if (provided_date.getTime() === yesterday.getTime()) {
        return "Yesterday"
    }

    // Check if it's a different day of the week
    if (provided_date.getDay() < current_date.getDay()) {
        let days = [
            "Sunday",
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
        ]
        return days[provided_date.getDay()]
    }

    // If none of the above conditions match, return in a different format
    return (
        provided_date.getMonth() +
        1 +
        "/" +
        provided_date.getDate() +
        "/" +
        provided_date.getFullYear()
    )
}

export const isSameDay = (timestamp1: number, timestamp2: number): boolean => {
    const date1 = new Date(timestamp1)
    const date2 = new Date(timestamp2)
    return (
        date1.getFullYear() === date2.getFullYear() &&
        date1.getMonth() === date2.getMonth() &&
        date1.getDate() === date2.getDate()
    )
}

// Define getRelativeDateTime function
export const getRelativeDateTime = (message: any, previousMessage: any) => {
    const today = new Date()
    const yesterday = new Date(today)
    yesterday.setDate(yesterday.getDate() - 1)
    const lastWeek = new Date(today)
    lastWeek.setDate(lastWeek.getDate() - 7)

    const messageDate = new Date(message._creationTime)

    if (
        !previousMessage ||
        !isSameDay(previousMessage._creationTime, messageDate.getTime())
    ) {
        if (isSameDay(messageDate.getTime(), today.getTime())) {
            return "Today"
        } else if (isSameDay(messageDate.getTime(), yesterday.getTime())) {
            return "Yesterday"
        } else if (messageDate.getTime() > lastWeek.getTime()) {
            const options: Intl.DateTimeFormatOptions = {
                weekday: "long",
            }
            return messageDate.toLocaleDateString(undefined, options)
        } else {
            const options: Intl.DateTimeFormatOptions = {
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
            }
            return messageDate.toLocaleDateString(undefined, options)
        }
    }
}

export function randomID(len: number) {
    let result = ""
    if (result) return result
    var chars =
            "12345qwertyuiopasdfgh67890jklmnbvcxzMNBVCZXASDQWERTYHGFUIOLKJP",
        maxPos = chars.length,
        i
    len = len || 5
    for (i = 0; i < len; i++) {
        result += chars.charAt(Math.floor(Math.random() * maxPos))
    }
    return result
}

export const convertFileToUrl = (file: File) => URL.createObjectURL(file);

export const convertFileSize = (sizeInBytes: number, digits?: number) => {
  if (sizeInBytes < 1024) {
    return sizeInBytes + " Bytes"; // Less than 1 KB, show in Bytes
  } else if (sizeInBytes < 1024 * 1024) {
    const sizeInKB = sizeInBytes / 1024;
    return sizeInKB.toFixed(digits || 1) + " KB"; // Less than 1 MB, show in KB
  } else if (sizeInBytes < 1024 * 1024 * 1024) {
    const sizeInMB = sizeInBytes / (1024 * 1024);
    return sizeInMB.toFixed(digits || 1) + " MB"; // Less than 1 GB, show in MB
  } else {
    const sizeInGB = sizeInBytes / (1024 * 1024 * 1024);
    return sizeInGB.toFixed(digits || 1) + " GB"; // 1 GB or more, show in GB
  }
};

export const calculatePercentage = (sizeInBytes: number) => {
  const totalSizeInBytes = 2 * 1024 * 1024 * 1024; // 2GB in bytes
  const percentage = (sizeInBytes / totalSizeInBytes) * 100;
  return Number(percentage.toFixed(2));
};

export const getFileType = (fileName: string) => {
  const extension = fileName.split(".").pop()?.toLowerCase();

  if (!extension) return { type: "other", extension: "" };

  const documentExtensions = [
    "pdf",
    "doc",
    "docx",
    "txt",
    "xls",
    "xlsx",
    "csv",
    "rtf",
    "ods",
    "ppt",
    "odp",
    "md",
    "html",
    "htm",
    "epub",
    "pages",
    "fig",
    "psd",
    "ai",
    "indd",
    "xd",
    "sketch",
    "afdesign",
    "afphoto",
    "afphoto",
  ];
  const imageExtensions = ["jpg", "jpeg", "png", "gif", "bmp", "svg", "webp"];
  const videoExtensions = ["mp4", "avi", "mov", "mkv", "webm"];
  const audioExtensions = ["mp3", "wav", "ogg", "flac"];

  if (documentExtensions.includes(extension))
    return { type: "document", extension };
  if (imageExtensions.includes(extension)) return { type: "image", extension };
  if (videoExtensions.includes(extension)) return { type: "video", extension };
  if (audioExtensions.includes(extension)) return { type: "audio", extension };

  return { type: "other", extension };
};

export const formatDateTime = (isoString: string | null | undefined) => {
  if (!isoString) return "—";

  const date = new Date(isoString);

  // Get hours and adjust for 12-hour format
  let hours = date.getHours();
  const minutes = date.getMinutes();
  const period = hours >= 12 ? "pm" : "am";

  // Convert hours to 12-hour format
  hours = hours % 12 || 12;

  // Format the time and date parts
  const time = `${hours}:${minutes.toString().padStart(2, "0")}${period}`;
  const day = date.getDate();
  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const month = monthNames[date.getMonth()];

  return `${time}, ${day} ${month}`;
};

export const getFileIcon = (
  extension: string | undefined,
  type: FileType | string,
) => {
  switch (extension) {
    // Document
    case "pdf":
      return "/assets/icons/file-pdf.svg";
    case "doc":
      return "/assets/icons/file-doc.svg";
    case "docx":
      return "/assets/icons/file-docx.svg";
    case "csv":
      return "/assets/icons/file-csv.svg";
    case "txt":
      return "/assets/icons/file-txt.svg";
    case "xls":
    case "xlsx":
      return "/assets/icons/file-document.svg";
    // Image
    case "svg":
      return "/assets/icons/file-image.svg";
    // Video
    case "mkv":
    case "mov":
    case "avi":
    case "wmv":
    case "mp4":
    case "flv":
    case "webm":
    case "m4v":
    case "3gp":
      return "/assets/icons/file-video.svg";
    // Audio
    case "mp3":
    case "mpeg":
    case "wav":
    case "aac":
    case "flac":
    case "ogg":
    case "wma":
    case "m4a":
    case "aiff":
    case "alac":
      return "/assets/icons/file-audio.svg";

    default:
      switch (type) {
        case "image":
          return "/assets/icons/file-image.svg";
        case "document":
          return "/assets/icons/file-document.svg";
        case "video":
          return "/assets/icons/file-video.svg";
        case "audio":
          return "/assets/icons/file-audio.svg";
        default:
          return "/assets/icons/file-other.svg";
      }
  }
};

// APPWRITE URL UTILS
// Construct appwrite file URL - https://appwrite.io/docs/apis/rest#images
export const constructFileUrl = (bucketFileId: string) => {
  return `${process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT}/storage/buckets/${process.env.NEXT_PUBLIC_APPWRITE_BUCKET}/files/${bucketFileId}/view?project=${process.env.NEXT_PUBLIC_APPWRITE_PROJECT}`;
};

export const constructDownloadUrl = (bucketFileId: string) => {
  return `${process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT}/storage/buckets/${process.env.NEXT_PUBLIC_APPWRITE_BUCKET}/files/${bucketFileId}/download?project=${process.env.NEXT_PUBLIC_APPWRITE_PROJECT}`;
};

// DASHBOARD UTILS
export const getUsageSummary = (totalSpace: any) => {
  return [
    {
      title: "Documents",
      size: totalSpace.document.size,
      latestDate: totalSpace.document.latestDate,
      icon: "/assets/icons/file-document-light.svg",
      url: "/documents",
    },
    {
      title: "Images",
      size: totalSpace.image.size,
      latestDate: totalSpace.image.latestDate,
      icon: "/assets/icons/file-image-light.svg",
      url: "/images",
    },
    {
      title: "Media",
      size: totalSpace.video.size + totalSpace.audio.size,
      latestDate:
        totalSpace.video.latestDate > totalSpace.audio.latestDate
          ? totalSpace.video.latestDate
          : totalSpace.audio.latestDate,
      icon: "/assets/icons/file-video-light.svg",
      url: "/media",
    },
    {
      title: "Others",
      size: totalSpace.other.size,
      latestDate: totalSpace.other.latestDate,
      icon: "/assets/icons/file-other-light.svg",
      url: "/others",
    },
  ];
};

export const getFileTypesParams = (type: string) => {
  switch (type) {
    case "documents":
      return ["document"];
    case "images":
      return ["image"];
    case "media":
      return ["video", "audio"];
    case "others":
      return ["other"];
    default:
      return ["document"];
  }
};
