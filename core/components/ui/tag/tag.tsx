



import React from 'react';
import { X } from 'lucide-react';

interface TagProps {
  className?: string;
  content: string;
  onRemove?: () => void;
}

const Tag = ({ className = '', content, onRemove, ...props }: TagProps) => {
  return (
    <div
      className={`inline-flex items-center gap-2 text-gray-700 hover:text-gray-900 ${className}`}
      {...props}
    >
      <span className="font-medium">
        <span className="text-gray-500">#</span>{content}
      </span>
      {onRemove && (
        <button
          className="inline-flex items-center justify-center hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/20 rounded-full"
          onClick={onRemove}
          type="button"
          aria-label="Remove tag"
        >
          <X className="h-4 w-4" />
        </button>
      )}
    </div>
  );
};

// Container component to handle 2 per row layout
const TagContainer = ({ tags }: { tags: { content: string; onRemove?: () => void }[] }) => {
  return (
    <div className="grid grid-cols-2 gap-4 w-full">
      {tags.map((tag, index) => (
        <Tag key={index} content={tag.content} onRemove={tag.onRemove} />
      ))}
    </div>
  );
};



export { Tag };