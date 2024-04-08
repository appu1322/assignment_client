import { IPagination } from "../interfaces";

export const capitalize = (text: string) => {
    if (typeof text !== "string") {
        return "";
    }
    let name: string | string[] = text?.trim()?.toLowerCase() || "";
    name = name?.split(" ");
    name = name
        .map((word) => {
            if (["TA", "LA", "HR", "BD", "UI/UX", "CPD"].includes(word?.toUpperCase())) {
                return word?.toUpperCase();
            } else if (word?.includes("-")) {
                const word2 = word?.split("-");
                return word2
                    .map((wrd) => wrd[0] ? wrd[0]?.toUpperCase() + wrd?.substring(1) : "")
                    .join("-");
            } else {
                return word[0] ? word[0]?.toUpperCase() + word?.substring(1) : "";
            }
        })
        .join(" ");

    return name;
};

export const createIndex = (pagination: IPagination, index: number) => pagination?.limit * (pagination?.page - 1) + index + 1;
