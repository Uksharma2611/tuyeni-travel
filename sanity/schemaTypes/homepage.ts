// sanity/schemaTypes/homepage.ts

export const homepage = {
  name: "homepage",
  title: "Homepage Settings",
  type: "document",
  fields: [
    {
      name: "title",
      title: "Internal Title",
      type: "string",
      description: 'Just for internal studio use (e.g., "Main Homepage")',
      initialValue: "Main Homepage",
    },
    {
      name: "heroVideos",
      title: "Hero Background Videos",
      type: "array",
      description:
        "Upload your compressed 1080p MP4s here. You can drag and drop to reorder them. They will play in the order listed.",
      of: [
        {
          type: "mux.video",
          title: "Mux Video",
          options: {
            mp4_support: "standard", // <-- THE FIX: This forces Mux to generate the medium.mp4 file!
          },
        },
      ],
    },
  ],
};
