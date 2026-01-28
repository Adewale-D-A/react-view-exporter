import RenderExportView from "./_component/export-react-view";
import { Logo } from "./_component/logo";

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <main className=" w-full h-full max-w-2xl flex flex-col items-center justify-center gap-10">
        <Logo />
        <RenderExportView />
      </main>
    </div>
  );
}
