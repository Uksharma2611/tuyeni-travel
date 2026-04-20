import { defineConfig } from 'sanity';
import { deskTool } from 'sanity/desk';
import { visionTool } from '@sanity/vision';
import { schemaTypes } from './sanity/schemaTypes';
import { muxInput } from 'sanity-plugin-mux-input';

export default defineConfig({
  name: 'default',
  title: 'Tuyeni Travel Studio',

  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,

  basePath: '/studio', 

  // THE FIX: Tell Mux to automatically generate the standard MP4s!
  plugins: [deskTool(), visionTool(), muxInput({ mp4_support: 'standard' })],

  schema: {
    types: schemaTypes,
  },
});