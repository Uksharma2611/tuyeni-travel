import createImageUrlBuilder from '@sanity/image-url'
import { client } from './client'

// Create the builder using your existing Sanity client configuration
const builder = createImageUrlBuilder(client)

// This is the magic function we will use in your components
export function urlFor(source: any) {
  // .auto('format') tells Sanity to automatically serve WebP images to browsers that support them
  // .fit('max') ensures it never scales an image larger than its original size
  return builder.image(source).auto('format').fit('max')
}