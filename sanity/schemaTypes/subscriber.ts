export const subscriber = {
  name: "subscriber",
  title: "Subscriber",
  type: "document",
  fields: [
    {
      name: "email",
      title: "Email Address",
      type: "string",
      validation: (Rule: any) => Rule.required().email(),
    },
    {
      name: "subscribedAt",
      title: "Subscribed At",
      type: "datetime",
      readOnly: true, // This locks the field so editors cannot change it manually
      description:
        "This timestamp is automatically generated when the user subscribes.",
      options: {
        dateFormat: "YYYY-MM-DD",
        timeFormat: "HH:mm",
      },
    },
  ],
  preview: {
    select: {
      title: "email",
      subtitle: "subscribedAt",
    },
  },
};
