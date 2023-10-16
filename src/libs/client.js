import {createClient} from "@sanity/client";

export const client = createClient({
    projectId: "igbc4hdv",
    dataset:"production",
    apiVersion: "2023-10-14",
    useCdn: true,
})

