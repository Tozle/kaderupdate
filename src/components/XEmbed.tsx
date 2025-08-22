import React from 'react';

interface XEmbedProps {
  url: string;
}

export const XEmbed: React.FC<XEmbedProps> = ({ url }) => (
  <div className="my-2">
    <iframe
      src={url}
      className="w-full h-64 rounded-lg border-none"
      allowFullScreen
      title="X Embed"
    />
  </div>
);
