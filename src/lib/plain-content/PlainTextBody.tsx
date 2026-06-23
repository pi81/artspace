import { Fragment } from "react";

type PlainTextBodyProps = {
  text: string;
};

export function PlainTextBody({ text }: PlainTextBodyProps) {
  const paragraphs = text.split(/\n\s*\n/).filter(Boolean);

  if (paragraphs.length === 0) return null;
  if (paragraphs.length === 1) return <p>{paragraphs[0]}</p>;

  return (
    <Fragment>
      {paragraphs.map((paragraph, index) => (
        <p key={index}>{paragraph}</p>
      ))}
    </Fragment>
  );
}
