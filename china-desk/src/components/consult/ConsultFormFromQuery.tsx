"use client";

import { useSearchParams } from "next/navigation";
import { ConsultForm, type ConsultFormProps } from "./ConsultForm";

/** ?case=<slug> 로 들어오면 사건유형 자동 선택 (페이지는 정적으로 두고 쿼리는 브라우저에서 읽는다) */
export function ConsultFormFromQuery(props: Omit<ConsultFormProps, "defaultCase">) {
  const q = useSearchParams();
  const c = q.get("case") ?? "";
  return <ConsultForm key={c} {...props} defaultCase={c} />;
}
