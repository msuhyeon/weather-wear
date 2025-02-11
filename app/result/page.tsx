import { Suspense } from "react";
import Result from "@/components/result/Result";

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Result />
    </Suspense>
  );
}
