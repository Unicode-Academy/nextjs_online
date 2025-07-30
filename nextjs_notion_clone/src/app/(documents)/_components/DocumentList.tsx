import { File } from "lucide-react";
import Item from "./Item";
import { useQuery } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Id } from "../../../../convex/_generated/dataModel";
interface DocumentListProps {
  level?: number;
  documentParent?: Id<"documents">;
}
export default function DocumentList({
  level = 0,
  documentParent,
}: DocumentListProps) {
  const documents = useQuery(api.documents.get, {
    parentDocument: documentParent,
  });
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});
  const handleExpand = (id: string) => {
    setExpanded((prevExpended) => {
      return {
        ...prevExpended,
        [id]: !prevExpended[id],
      };
    });
  };
  return (
    <div className="mt-3">
      <p
        className={cn(
          "px-8 text-sm text-muted-foreground mb-3",
          expanded && "block",
          level === 0 && "hidden"
        )}
      >
        No pages inside
      </p>
      {documents?.map((document) => {
        return (
          <div key={document._id}>
            <Item
              id={document._id}
              label={document.title}
              icon={File}
              expanded={expanded[document._id]}
              onExpand={() => handleExpand(document._id)}
            />
            {expanded[document._id] && (
              <DocumentList level={level + 1} documentParent={document._id} />
            )}
          </div>
        );
      })}
    </div>
  );
}

/*
{
    id: boolean
}
*/
