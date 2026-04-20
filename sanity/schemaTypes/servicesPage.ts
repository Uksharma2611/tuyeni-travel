export const servicesPage = {
  name: "servicesPage",
  title: "Services Page Settings",
  type: "document",
  fields: [
    {
      name: "title",
      title: "Internal Title",
      type: "string",
      description: 'Just for internal studio use (e.g., "Main Services Page")',
      initialValue: "Main Services Page",
    },
    {
      name: "heroVideo",
      title: "Hero Background Video",
      type: "mux.video",
      description:
        "Upload the background video for the top of the Services page.",
    },
  ],
};
