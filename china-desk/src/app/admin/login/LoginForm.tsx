"use client";

import { useActionState } from "react";
import { loginAction, type LoginState } from "../actions";

export function LoginForm() {
  const [state, action, pending] = useActionState<LoginState, FormData>(loginAction, {});
  return (
    <form action={action} className="space-y-4">
      <label className="block">
        <span className="text-[14px] font-semibold text-charcoal">비밀번호</span>
        <input
          type="password"
          name="password"
          required
          autoFocus
          autoComplete="current-password"
          className="mt-1.5 block h-12 w-full rounded-card border border-line px-3.5 text-[16px] focus:border-navy focus:outline-none focus:ring-2 focus:ring-navy/15"
        />
      </label>
      {state.error && <p className="rounded-lg bg-warn-bg px-3 py-2 text-[14px] text-warn" role="alert">{state.error}</p>}
      <button type="submit" disabled={pending} className="btn-primary w-full disabled:opacity-60">
        {pending ? "확인 중…" : "로그인"}
      </button>
    </form>
  );
}
