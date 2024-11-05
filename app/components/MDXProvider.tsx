import { MDXProvider } from '@mdx-js/react';
import { Tab, Tabs } from './mdx/Tabs';
import { DateTime } from './mdx/DateTime';
import { Alert } from './mdx/Alert';
import { Image } from './mdx/Image';
import { ImageGrid } from './mdx/ImageGrid';
import { Math } from './mdx/Math';
import { Chart } from './mdx/Chart';

const components = {
  Tab,
  Tabs,
  DateTime,
  Alert,
  Image,
  ImageGrid,
  Math,
  Chart,
};

export function MDXComponentProvider({ children }) {
  return <MDXProvider components={components}>{children}</MDXProvider>;
}