const Loading = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-4 px-4">
      <div
        className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"
        role="status"
        aria-label="Carregando"
      />
      <p className="text-slate-500 font-medium">Carregando...</p>
    </div>
  );
};

export default Loading;
