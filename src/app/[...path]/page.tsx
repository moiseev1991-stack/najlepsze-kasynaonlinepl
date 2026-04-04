import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PathPage } from "@/components/pages/PathPage";
import { metadataForSegments } from "@/lib/metadata-for-path";
import { getAllSegmentPaths } from "@/lib/routes";

type Props = { params: Promise<{ path?: string[] }> };

export async function generateStaticParams() {
  return getAllSegmentPaths().map((path) => ({ path }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  try {
    const { path = [] } = await params;
    const meta = metadataForSegments(path);
    return meta ?? {};
  } catch (e) {
    console.error("[generateMetadata]", e);
    return { title: "Błąd metadanych" };
  }
}

export default async function CatchAllPage({ params }: Props) {
  const { path = [] } = await params;
  return <PathPage segments={path} />;
}

export const dynamicParams = false;
