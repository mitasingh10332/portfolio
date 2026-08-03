import { Fragment } from "react";

type Props = {
  text: string;
  className?: string;
};

/**
 * Renders a string that may contain `**bold**` markers as inline
 * <strong> elements, so important keywords stand out.
 */
export function RichText({ text, className }: Props) {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);

  return (
    <span className={className}>
      {parts.map((part, index) => {
        if (part.startsWith("**") && part.endsWith("**")) {
          return (
            <strong key={index} className="font-semibold text-foreground">
              {part.slice(2, -2)}
            </strong>
          );
        }
        return <Fragment key={index}>{part}</Fragment>;
      })}
    </span>
  );
}