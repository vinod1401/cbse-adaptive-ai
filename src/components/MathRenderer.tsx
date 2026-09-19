"use client";

import React, { useMemo } from "react";
import katex from "katex";

interface MathRendererProps {
  content: string;
  className?: string;
}

/**
 * Parses markdown-like text containing inline ($...$) and block ($$...$$) KaTeX math.
 */
export const MathRenderer: React.FC<MathRendererProps> = ({ content, className = "" }) => {
  const renderedElements = useMemo(() => {
    if (!content) return null;

    // Handle escaped dollar signs (\$ -> safe placeholder)
    const escapedContent = content.replace(/\\\$/g, "__ESCAPED_DOLLAR__");

    // Split by block math first: $$...$$
    const blockParts = escapedContent.split(/(\$\$[\s\S]*?\$\$)/g);

    return blockParts.map((bPart, bIdx) => {
      if (bPart.startsWith("$$") && bPart.endsWith("$$")) {
        const math = bPart.slice(2, -2).replace(/__ESCAPED_DOLLAR__/g, "\\$");
        try {
          const html = katex.renderToString(math, { displayMode: true, throwOnError: false });
          return <div key={`b-${bIdx}`} dangerouslySetInnerHTML={{ __html: html }} className="my-2 overflow-x-auto" />;
        } catch (e) {
          return <div key={`b-${bIdx}`}>{bPart.replace(/__ESCAPED_DOLLAR__/g, "$")}</div>;
        }
      }

      // Inside normal text, split by inline math: $...$
      const inlineParts = bPart.split(/(\$[^\$]+?\$)/g);
      return (
        <span key={`t-${bIdx}`}>
          {inlineParts.map((iPart, iIdx) => {
            if (iPart.startsWith("$") && iPart.endsWith("$") && iPart.length > 2) {
              const math = iPart.slice(1, -1).replace(/__ESCAPED_DOLLAR__/g, "\\$");
              try {
                const html = katex.renderToString(math, { displayMode: false, throwOnError: false });
                return <span key={`i-${iIdx}`} dangerouslySetInnerHTML={{ __html: html }} />;
              } catch (e) {
                return <span key={`i-${iIdx}`}>{iPart.replace(/__ESCAPED_DOLLAR__/g, "$")}</span>;
              }
            }
            return <span key={`i-${iIdx}`}>{iPart.replace(/__ESCAPED_DOLLAR__/g, "$")}</span>;
          })}
        </span>
      );
    });
  }, [content]);

  return <div className={`leading-relaxed ${className}`}>{renderedElements}</div>;
};
