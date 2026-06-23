import parse from "html-react-parser";

type HtmlBodyProps = {
  html: string;
};

export function HtmlBody({ html }: HtmlBodyProps) {
  return parse(html);
}
