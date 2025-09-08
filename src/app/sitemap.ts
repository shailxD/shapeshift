import dayjs from "dayjs";
import type { MetadataRoute } from "next";

import { SITE_INFO, TOOLS } from "@/data/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const tools = TOOLS.map((tool) => ({
    url: `${SITE_INFO.url}${tool.href}`,
    lastModified: dayjs().toISOString(),
  }));

  const routes = [""].map((route) => ({
    url: `${SITE_INFO.url}${route}`,
    lastModified: dayjs().toISOString(),
  }));

  return [...routes, ...tools];
}
