import { Spinner } from "@/components/ui/spinner";

export function Loading() {
  return (
    <div className="flex h-screen flex-col items-center justify-center">
      <Spinner />
    </div>
  );
}
