import Image, { type ImageProps } from 'next/image';

import { withBasePath } from '@/lib/basePath';

type SiteImageProps = ImageProps;

function resolveSrc(src: ImageProps['src']): ImageProps['src'] {
  if (typeof src !== 'string' || src.startsWith('http://') || src.startsWith('https://') || src.startsWith('data:')) {
    return src;
  }
  return withBasePath(src);
}

/** next/image with `unoptimized` skips basePath; prefix public assets for GitHub Pages. */
export default function SiteImage({ src, ...props }: SiteImageProps) {
  return <Image src={resolveSrc(src)} {...props} />;
}
