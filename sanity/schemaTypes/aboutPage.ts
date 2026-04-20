export const aboutPage = {
  name: "aboutPage",
  title: "About Page Settings",
  type: "document",
  fields: [
    {
      name: "title",
      title: "Internal Title",
      type: "string",
      description: 'Just for internal studio use (e.g., "Main About Page")',
      initialValue: "Main About Page",
    },
    {
      name: "heroVideo",
      title: "Hero Background Video",
      type: "mux.video",
      description: "Upload the background video for the top of the About page.",
    },
  ],
};
