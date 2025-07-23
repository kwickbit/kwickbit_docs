import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

/**
 * Creating a sidebar enables you to:
 - create an ordered group of docs
 - render a sidebar for each doc of that group
 - provide next/previous navigation

 The sidebars can be generated from the filesystem, or explicitly defined here.

 Create as many sidebars as you want.
 */
const sidebars: SidebarsConfig = {
  docs: [
    {
      type: 'doc',
      id: 'intro',
      label: 'Introduction',
    },
    {
      type: 'doc',
      id: 'installation',
      label: 'Installation',
    },
    {
      type: 'category',
      label: 'Integration',
      items: [
        {
          type: 'doc',
          id: 'integration-guide',
          label: 'Basics',
        },
        {
          type: 'doc',
          id: 'backend-integration',
          label: 'Backend',
        },
        {
          type: 'doc',
          id: 'frontend-integration',
          label: 'Frontend',
        },
      ],
    },
    {
      type: 'doc',
      id: 'api-reference',
      label: 'API Reference',
    },
  ],
};

export default sidebars;
