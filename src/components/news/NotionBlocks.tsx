/* eslint-disable @next/next/no-img-element */
import React from "react";
import type { NewsBlock, NewsListItem, NewsRichText } from "@/interfaces/news";

function RichText({ parts }: { parts: NewsRichText[] }) {
  return (
    <>
      {parts.map((part, index) => {
        if (!part.text) return null;

        let node: React.ReactNode = part.text;

        if (part.code) {
          node = (
            <code className="text-magenta rounded bg-gray-100 px-1.5 py-0.5 text-[0.9em]">
              {node}
            </code>
          );
        }
        if (part.bold) node = <strong className="font-bold">{node}</strong>;
        if (part.italic) node = <em className="italic">{node}</em>;
        if (part.underline) node = <u className="underline">{node}</u>;
        if (part.strikethrough) node = <s className="line-through">{node}</s>;

        if (part.href) {
          node = (
            <a
              href={part.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-magenta underline underline-offset-4 hover:opacity-80"
            >
              {node}
            </a>
          );
        }

        return <React.Fragment key={index}>{node}</React.Fragment>;
      })}
    </>
  );
}

function ListItems({ items }: { items: NewsListItem[] }) {
  return (
    <>
      {items.map((item) => (
        <li key={item.id} className="mb-2 font-light leading-relaxed">
          <RichText parts={item.richText} />
          {item.children.length > 0 && (
            <div className="mt-2 pl-4">
              <NotionBlocks blocks={item.children} />
            </div>
          )}
        </li>
      ))}
    </>
  );
}

function Figure({ url, caption }: { url: string; caption: string }) {
  if (!url) return null;
  return (
    <figure className="my-8">
      {/* Sizes are unknown up front and the proxy streams arbitrary dimensions,
          so next/image would need explicit width/height it cannot infer here. */}
      <img
        src={url}
        alt={caption}
        loading="lazy"
        className="h-auto w-full rounded-lg shadow-md"
      />
      {caption && (
        <figcaption className="mt-3 text-center text-sm font-light text-gray-500">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}

function NotionBlock({ block }: { block: NewsBlock }) {
  switch (block.type) {
    case "paragraph":
      if (!block.richText.length) return null;
      return (
        <p className="font-lato mb-5 font-light leading-relaxed text-gray-800">
          <RichText parts={block.richText} />
        </p>
      );

    case "heading_1":
      return (
        <h2 className="font-playfairDisplay text-magenta mb-4 mt-10 text-3xl font-bold">
          <RichText parts={block.richText} />
        </h2>
      );

    case "heading_2":
      return (
        <h3 className="font-playfairDisplay text-magenta mb-3 mt-8 text-2xl font-bold">
          <RichText parts={block.richText} />
        </h3>
      );

    case "heading_3":
      return (
        <h4 className="font-playfairDisplay mb-3 mt-6 text-xl font-bold text-gray-900">
          <RichText parts={block.richText} />
        </h4>
      );

    case "quote":
      return (
        <blockquote className="border-magenta my-6 border-l-4 bg-white py-3 pl-5 pr-4 italic text-gray-700">
          <RichText parts={block.richText} />
        </blockquote>
      );

    case "callout":
      return (
        <div className="my-6 flex gap-3 rounded-lg border border-gray-200 bg-white p-5">
          {block.emoji && (
            <span aria-hidden="true" className="text-xl leading-none">
              {block.emoji}
            </span>
          )}
          <div className="font-light text-gray-800">
            <RichText parts={block.richText} />
          </div>
        </div>
      );

    case "bulleted_list":
      return (
        <ul className="mb-5 list-disc pl-6 text-gray-800">
          <ListItems items={block.items} />
        </ul>
      );

    case "numbered_list":
      return (
        <ol className="mb-5 list-decimal pl-6 text-gray-800">
          <ListItems items={block.items} />
        </ol>
      );

    case "to_do":
      return (
        <div className="mb-2 flex items-start gap-3 text-gray-800">
          <input
            type="checkbox"
            checked={block.checked}
            readOnly
            className="accent-magenta mt-1.5"
          />
          <span className={block.checked ? "font-light line-through" : "font-light"}>
            <RichText parts={block.richText} />
          </span>
        </div>
      );

    case "code":
      return (
        <pre className="my-6 overflow-x-auto rounded-lg bg-gray-900 p-5 text-sm text-gray-100">
          <code>{block.text}</code>
        </pre>
      );

    case "image":
      return <Figure url={block.url} caption={block.caption} />;

    case "video":
    case "embed":
      if (!block.url) return null;
      return (
        <div className="my-8">
          <div className="relative aspect-video w-full overflow-hidden rounded-lg shadow-md">
            <iframe
              src={block.url.replace("watch?v=", "embed/")}
              title={block.caption || "Embedded media"}
              allowFullScreen
              className="absolute inset-0 h-full w-full"
            />
          </div>
          {block.caption && (
            <p className="mt-3 text-center text-sm font-light text-gray-500">
              {block.caption}
            </p>
          )}
        </div>
      );

    case "bookmark":
      if (!block.url) return null;
      return (
        <a
          href={block.url}
          target="_blank"
          rel="noopener noreferrer"
          className="my-6 block rounded-lg border border-gray-200 bg-white p-4 text-sm break-all text-gray-700 transition hover:border-magenta hover:shadow-md"
        >
          {block.caption || block.url}
        </a>
      );

    case "divider":
      return <hr className="my-10 border-gray-200" />;

    default:
      return null;
  }
}

export default function NotionBlocks({ blocks }: { blocks: NewsBlock[] }) {
  return (
    <>
      {blocks.map((block) => (
        <NotionBlock key={block.id} block={block} />
      ))}
    </>
  );
}
