import { LoginForm } from "./LoginForm";

export const dynamic = "force-dynamic";

export default function AdminLoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <div className="w-full max-w-sm rounded-card border border-line bg-white p-7 shadow-float">
        <div className="flex items-center gap-2.5">
          <span className="flex h-10 w-10 items-center justify-center rounded-[6px] bg-navy font-serif text-[15px] font-semibold text-white">R&amp;L</span>
          <div className="leading-tight">
            <p className="text-[15px] font-bold text-navy">Roh&amp;Lee China Desk</p>
            <p className="text-[12px] text-mute">관리자</p>
          </div>
        </div>
        <div className="mt-7">
          <LoginForm />
        </div>
      </div>
    </div>
  );
}
