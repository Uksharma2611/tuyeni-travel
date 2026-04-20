import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { client } from "@/sanity/lib/client";
import { SINGLE_POST_QUERY } from "@/sanity/lib/queries";
import { PortableText } from "@portabletext/react";
import type { Metadata, ResolvingMetadata } from "next";

// --- DYNAMIC METADATA GENERATION ---
// This function runs on the server before the page renders to inject SEO tags
export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> },
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const resolvedParams = await params;

  // Fetch the specific post data (including our new SEO fields)
  const post = await client.fetch(SINGLE_POST_QUERY, {
    slug: resolvedParams.slug,
  });

  if (!post) return {};

  // Fallback logic: Use specific SEO fields if they exist, otherwise use the standard title/excerpt/mainImage
  const title = post.seoTitle || `${post.title} | Tuyeni Travel`;
  const description =
    post.seoDescription ||
    post.excerpt ||
    "Read the latest travel journal from Tuyeni Travel.";
  const image =
    post.seoImageUrl ||
    post.imageUrl ||
    "https://images.pexels.com/photos/3305542/pexels-photo-3305542.jpeg";

  return {
    title: title,
    description: description,
    alternates: {
      canonical: `https://tuyenitravel.com/blog/${resolvedParams.slug}`,
    },
    openGraph: {
      title: title,
      description: description,
      url: `https://tuyenitravel.com/blog/${resolvedParams.slug}`,
      type: "article",
      publishedTime: post.date,
      authors: ["Tuyeni Travel"],
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: title,
      description: description,
      images: [image],
    },
  };
}

// 1. Custom styling for the rich text from Sanity
const RichTextComponents = {
  types: {
    image: ({ value }: any) => (
      <div className="relative w-full h-96 my-10 rounded-3xl overflow-hidden shadow-lg">
        <Image
          src={value.asset.url}
          alt="Blog Content Image"
          fill
          className="object-cover"
        />
      </div>
    ),
  },
  block: {
    h2: ({ children }: any) => (
      <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">
        {children}
      </h2>
    ),
    h3: ({ children }: any) => (
      <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">{children}</h3>
    ),

    normal: ({ children }: any) => (
      <div className="text-lg text-gray-700 leading-relaxed mb-6">
        {children}
      </div>
    ),

    blockquote: ({ children }: any) => (
      <blockquote className="border-l-4 border-orange-500 pl-6 py-2 my-8 text-xl italic text-gray-600 bg-orange-50/50 rounded-r-2xl">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }: any) => (
      <ul className="list-disc pl-6 mb-6 text-lg text-gray-700 space-y-2 marker:text-orange-500">
        {children}
      </ul>
    ),
    number: ({ children }: any) => (
      <ol className="list-decimal pl-6 mb-6 text-lg text-gray-700 space-y-2 marker:text-orange-500">
        {children}
      </ol>
    ),
  },
};

// 2. The Page Component
export default async function SingleBlogPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const resolvedParams = await params;

  // Fetch the post using the slug from the URL
  const post = await client.fetch(SINGLE_POST_QUERY, {
    slug: resolvedParams.slug,
  });

  // FIXED: Moved the 404 check up here BEFORE we try to format dates based on the post object
  if (!post) {
    notFound();
  }

  // Format the date
  const formattedDate = post.date
    ? new Date(post.date).toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      })
    : "Recent";

  // --- DYNAMIC STRUCTURED DATA (JSON-LD) ---
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://tuyenitravel.com/blog/${resolvedParams.slug}`,
    },
    headline: post.seoTitle || post.title,
    description: post.seoDescription || post.excerpt,
    image:
      post.seoImageUrl ||
      post.imageUrl ||
      "https://images.pexels.com/photos/3305542/pexels-photo-3305542.jpeg",
    author: {
      "@type": "Organization",
      name: "Tuyeni Travel",
      url: "https://tuyenitravel.com",
    },
    publisher: {
      "@type": "Organization",
      name: "Tuyeni Travel",
      logo: {
        "@type": "ImageObject",
        url: "https://tuyenitravel.com/assets/logo.svg",
      },
    },
    datePublished: post.date || new Date().toISOString(),
    dateModified: post.date || new Date().toISOString(),
  };

  return (
    // OPTIMIZED: Changed div to main
    <main className="min-h-screen bg-white">
      {/* Inject Structured Data into the head of the document */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* 1. ARTICLE HERO */}
      <section className="relative pt-40 pb-32 lg:pt-48 lg:pb-40 bg-gray-900 overflow-hidden">
        <div className="absolute inset-0 opacity-50">
          <Image
            src={
              post.imageUrl ||
              "https://images.pexels.com/photos/3305542/pexels-photo-3305542.jpeg"
            }
            alt={post.title}
            fill
            className="object-cover object-center"
            priority
            unoptimized
          />
        </div>
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            {/* Category Tag */}
            <div className="inline-block bg-orange-500 text-white px-4 py-1.5 rounded-full text-sm font-bold uppercase tracking-wider mb-6">
              {post.category}
            </div>

            {/* Title */}
            <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-8 leading-tight drop-shadow-lg">
              {post.title}
            </h1>

            {/* Meta Info */}
            <div className="flex items-center justify-center gap-4 text-gray-200 font-medium text-sm md:text-base drop-shadow-md">
              <span>{formattedDate}</span>
              <span className="w-1.5 h-1.5 bg-orange-500 rounded-full"></span>
              <span>{post.readTime || "5 min read"}</span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. ARTICLE CONTENT */}
      <section className="relative z-20 px-6 -mt-16 pb-24">
        <div className="container mx-auto max-w-4xl">
          <div className="bg-white rounded-[2.5rem] shadow-xl p-8 md:p-12 lg:p-16 border border-gray-100">
            {/* Rich Text Rendered via PortableText */}
            <article className="prose-lg max-w-none">
              <PortableText value={post.body} components={RichTextComponents} />
            </article>

            {/* Back Button */}
            <div className="mt-16 pt-8 border-t border-gray-100 text-center">
              <Link
                href="/blog"
                className="inline-flex items-center gap-2 text-gray-500 hover:text-orange-500 font-bold transition-colors group"
              >
                <svg
                  className="w-5 h-5 rotate-180 group-hover:-translate-x-1 transition-transform"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
                Back to All Journals
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
