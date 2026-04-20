export const blogPage = {
  name: "blogPage",
  title: "Blog Page Settings",
  type: "document",
  fields: [
    {
      name: "title",
      title: "Internal Title",
      type: "string",
      description: 'Just for internal studio use (e.g., "Main Blog Page")',
      initialValue: "Main Blog Page",
    },
    {
      name: "heroVideo",
      title: "Hero Background Video",
      type: "mux.video",
      description: "Upload the background video for the top of the Blog page.",
    },
  ],
};
