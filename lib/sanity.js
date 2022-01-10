import {
    createClient,
    createPreviewSubscriptionHook,
    createImageUrlBuilder,
    createPortableTextComponent,
} from "next-sanity";

const config = {
    projectId: "g5o6lrbj",
    dataset: "production",
    apiVersion: "v2021-10-21",
    useCdn: false,
}

export const sanityClient = createClient(config);

export const usePreviewSunscription = createPreviewSubscriptionHook(config);

export const urlFor = (source) => createImageUrlBuilder(config).image(source);

export const portableText = createPortableTextComponent ({
    ...config,
    serializers: {},
});

