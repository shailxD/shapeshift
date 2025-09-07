import Link from "next/link";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { TOOLS } from "@/data/site";

export const ToolsNavigationCardSection = () => {
  return (
    <section className="w-full px-4 py-8">
      <div className="container mx-auto max-w-4xl">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {TOOLS.map((tool) => (
            <Link key={tool.id} href={tool.href}>
              <Card className="h-full">
                <CardHeader className="sr-only">
                  <CardTitle>{tool.title}</CardTitle>
                </CardHeader>
                <CardContent className="flex items-center gap-3">
                  <tool.icon size={24} className="text-primary" />
                  <p className="text-base leading-relaxed">{tool.title}</p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};
