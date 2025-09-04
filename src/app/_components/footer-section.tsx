import { cn } from "@/lib/utils";
import { SOURCE_CODE_GITHUB_URL, USER } from "@/data/site";

export const FooterSection = () => {
  return (
    <footer
      className={cn(
        "text-muted-foreground",
        "max-w-screen overflow-x-hidden px-4 py-2",
        "text-center text-sm text-balance",
      )}
    >
      Built by{" "}
      <a
        className="link"
        href={USER.githubUrl}
        target="_blank"
        rel="noopener noreferrer"
      >
        {USER.displayName}
      </a>
      . The source code is available on{" "}
      <a
        className="link"
        href={SOURCE_CODE_GITHUB_URL}
        target="_blank"
        rel="noopener noreferrer"
      >
        GitHub
      </a>
      .
    </footer>
  );
};
