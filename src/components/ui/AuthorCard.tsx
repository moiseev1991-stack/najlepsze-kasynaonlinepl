import { AuthorBox } from "@/components/ui/AuthorBox";
import type { Author } from "@/lib/types";

/** Alias semantyczny pod szablon recenzji (jak w specyfikacji). */
export function AuthorCard({ author }: { author: Author }) {
  return <AuthorBox author={author} />;
}
