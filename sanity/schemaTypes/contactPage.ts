export const contactPage = {
  name: 'contactPage',
  title: 'Contact Page Settings',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Internal Title',
      type: 'string',
      description: 'Just for internal studio use (e.g., "Main Contact Page")',
      initialValue: 'Main Contact Page',
    },
    {
      name: 'heroVideo',
      title: 'Hero Background Video',
      type: 'mux.video',
      description: 'Upload the background video for the top of the Contact page.',
    },
  ],
};