"use client";

import Giscus from "@giscus/react";
import { useTheme } from "next-themes";
import { useEffect, useMemo, useState } from "react";

function mapGiscusTheme(theme: string | undefined) {
  return theme === "dark" ? "transparent_dark" : "light";
}

export function GiscusComments() {
  const repo = process.env.NEXT_PUBLIC_GISCUS_REPO;
  const repoId = process.env.NEXT_PUBLIC_GISCUS_REPO_ID;
  const category = process.env.NEXT_PUBLIC_GISCUS_CATEGORY;
  const categoryId = process.env.NEXT_PUBLIC_GISCUS_CATEGORY_ID;

  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  const giscusTheme = useMemo(
    () => mapGiscusTheme(resolvedTheme),
    [resolvedTheme],
  );

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const iframe = document.querySelector<HTMLIFrameElement>(
      "iframe.giscus-frame",
    );

    if (!iframe) return;

    iframe.contentWindow?.postMessage(
      {
        giscus: {
          setConfig: {
            theme: giscusTheme,
          },
        },
      },
      "https://giscus.app",
    );
  }, [giscusTheme]);

  if (!repo || !repoId || !category || !categoryId) {
    return null;
  }

  if (!mounted) {
    return null;
  }

  return (
    <div className="rounded-lg border bg-card p-4 sm:p-5">
      <Giscus
        id="comments"
        repo={repo as `${string}/${string}`}
        repoId={repoId}
        category={category}
        categoryId={categoryId}
        mapping="pathname"
        strict="0"
        reactionsEnabled="1"
        emitMetadata="0"
        inputPosition="top"
        theme={giscusTheme}
        lang="pt"
        loading="lazy"
      />
    </div>
  );
}
