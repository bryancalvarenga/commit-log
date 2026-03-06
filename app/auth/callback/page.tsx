export default function GitHubCallbackPage() {
  return (
    <div className="mx-auto flex min-h-[60vh] max-w-sm flex-col items-center justify-center px-4 py-16">
      <div className="text-center">
        <h1 className="mb-2 text-xl font-semibold text-foreground">Autenticando...</h1>
        <p className="text-sm text-muted-foreground">
          Processando callback do GitHub. Voce sera redirecionado em breve.
        </p>
      </div>
    </div>
  )
}
