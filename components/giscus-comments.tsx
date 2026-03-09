"use client";

import Giscus from "@giscus/react";

export function GiscusComments() {
  const repo = process.env.NEXT_PUBLIC_GISCUS_REPO as `${string}/${string}`;
  const repoId = process.env.NEXT_PUBLIC_GISCUS_REPO_ID;
  const category = process.env.NEXT_PUBLIC_GISCUS_CATEGORY;
  const categoryId = process.env.NEXT_PUBLIC_GISCUS_CATEGORY_ID;

  if (!repo || !repoId || !category || !categoryId) {
    return (
      <div className="rounded-lg border border-red-500 bg-card p-4 text-sm text-red-400">
        Giscus não carregou porque alguma variável de ambiente está faltando.
        <pre className="mt-3 whitespace-pre-wrap text-xs">
          {JSON.stringify({ repo, repoId, category, categoryId }, null, 2)}
        </pre>
      </div>
    );
  }

  return (
    <div className="rounded-lg border bg-card p-4 sm:p-5">
      <Giscus
        repo={repo}
        repoId={repoId}
        category={category}
        categoryId={categoryId}
        mapping="pathname"
        strict="0"
        reactionsEnabled="1"
        emitMetadata="0"
        inputPosition="top"
        theme="preferred_color_scheme"
        lang="pt"
        loading="lazy"
      />
    </div>
  );
}
