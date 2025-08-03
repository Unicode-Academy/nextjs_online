import { File } from "lucide-react";
import Item from "./Item";
import { useQuery } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Id } from "../../../../convex/_generated/dataModel";
import { useRouter } from "next/navigation";
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
  const router = useRouter();
  const handleExpand = (id: string) => {
    setExpanded((prevExpended) => {
      return {
        ...prevExpended,
        [id]: !prevExpended[id],
      };
    });
  };
  if (!documents) {
    return (
      <div
        className="flex flex-col gap-2"
        style={{ paddingLeft: `${level > 0 ? level * 18 + 18 : 18}px` }}
      >
        <Item.Skeleton />
        {level === 0 && (
          <div>
            <Item.Skeleton />
            <Item.Skeleton />
          </div>
        )}
      </div>
    );
  }
  return (
    <div className="mt-1">
      <p
        className={cn(
          "hidden text-sm text-muted-foreground mb-3 truncate",
          expanded && "last:block",
          level === 0 && "hidden"
        )}
        style={{ paddingLeft: `${level > 0 ? level * 18 + 18 : 18}px` }}
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
              level={level}
              onClick={() => {
                router.push(`/documents/${document._id}`);
              }}
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
