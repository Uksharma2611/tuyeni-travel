export const post = {
  name: "post",
  title: "Blog Post",
  type: "document",
  fields: [
    {
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: "mainImage",
      title: "Main Image",
      type: "image",
      options: { hotspot: true },
    },
    {
      name: "category",
      title: "Category",
      type: "string",
      options: {
        list: [
          { title: "Travel Tips", value: "Travel Tips" },
          { title: "Destination Highlights", value: "Destination Highlights" },
          { title: "Seasonal Guides", value: "Seasonal Guides" },
          { title: "FAQs", value: "FAQs" },
        ],
      },
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: "publishedAt",
      title: "Published at",
      type: "datetime",
    },
    {
      name: "readTime",
      title: "Read Time",
      type: "string",
      description: "e.g., 5 min read",
    },
    {
      name: "excerpt",
      title: "Excerpt",
      type: "text",
      description: "A short summary that appears on the blog grid.",
    },
    {
      name: "serviceCta",
      title: "Service Call-to-Action (SEO Internal Link)",
      type: "object",
      fields: [
        {
          name: "text",
          title: "CTA Text",
          type: "string",
          description: "e.g., View Coastal Packages",
        },
        {
          name: "link",
          title: "CTA Link",
          type: "string",
          description: "e.g., /services#coastal",
        },
      ],
    },
    // --- NEW SEO FIELDS ADDED HERE ---
    {
      name: "seoTitle",
      title: "SEO Meta Title",
      type: "string",
      description:
        "Optional. Overrides the default Title for search engines. Recommended: 50-60 characters.",
    },
    {
      name: "seoDescription",
      title: "SEO Meta Description",
      type: "text",
      rows: 3,
      description:
        "Optional. The snippet that appears in Google search results. Recommended: 150-160 characters.",
    },
    {
      name: "seoImage",
      title: "SEO Social Share Image",
      type: "image",
      description:
        "Optional. The image that appears when shared on WhatsApp/Facebook. If left blank, the Main Image will be used.",
    },
    // ----------------------------------
    {
      name: "body",
      title: "Body",
      type: "array",
      of: [{ type: "block" }],
    },
  ],
};
