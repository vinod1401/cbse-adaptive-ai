"use client";

import React, { useMemo } from "react";
import katex from "katex";

interface MathRendererProps {
  content: string;
  className?: string;
}

export const MathRenderer: React.FC<MathRendererProps> = ({ content, className = "" }) => {
  const renderedElements = useMemo(() => {
    if (!content) return null;

    const blockParts = content.split(/(\$\$[\s\S]*?\$\$)/g);

    return blockParts.map((bPart, bIdx) => {
      if (bPart.startsWith("$$") && bPart.endsWith("$$")) {
        const math = bPart.slice(2, -2);
        try {
          const html = katex.renderToString(math, { displayMode: true, throwOnError: false });
          return <div key={`b-${bIdx}`} dangerouslySetInnerHTML={{ __html: html }} className="my-2 overflow-x-auto" />;
        } catch (e) {
          return <div key={`b-${bIdx}`}>{bPart}</div>;
        }
      }

      const inlineParts = bPart.split(/(\$[^\$\n]+?\$)/g);
      return (
        <span key={`t-${bIdx}`}>
          {inlineParts.map((iPart, iIdx) => {
            if (iPart.startsWith("$") && iPart.endsWith("$") && iPart.length > 2) {
              const math = iPart.slice(1, -1);
              try {
                const html = katex.renderToString(math, { displayMode: false, throwOnError: false });
                return <span key={`i-${iIdx}`} dangerouslySetInnerHTML={{ __html: html }} />;
              } catch (e) {
                return <span key={`i-${iIdx}`}>{iPart}</span>;
              }
            }
            return <span key={`i-${iIdx}`}>{iPart}</span>;
          })}
        </span>
      );
    });
  }, [content]);

  return <div className={`leading-relaxed ${className}`}>{renderedElements}</div>;
};
