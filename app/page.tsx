import RenderExportView from "./_component/export-react-view";

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <main className=" w-full h-full max-w-2xl grid grid-cols-1 pt-28 lg:pt-10 items-start lg:items-center gap-4 px-5 lg:px-10">
        <RenderExportView />
      </main>
    </div>
  );
}
