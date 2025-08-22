import React from 'react';

interface XEmbedProps {
    url: string;
}

export const XEmbed: React.FC<XEmbedProps> = ({ url }) => (
    <div className="my-1">
        <iframe
            src={url}
            className="w-full h-64 border border-gray-200 bg-white"
            allowFullScreen
            title="X Embed"
        />
    </div>
);
