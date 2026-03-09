import { GitCommit, Github, ExternalLink } from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

export function AuthorCard() {
  return (
    <div className="flex items-start gap-4 rounded-lg border bg-card p-5">
      <Avatar className="size-14 shrink-0 border">
        <AvatarImage
          src="https://api.dicebear.com/9.x/initials/svg?seed=CL"
          alt="Autor"
        />
        <AvatarFallback>
          <GitCommit className="size-6 text-muted-foreground" />
        </AvatarFallback>
      </Avatar>
      <div className="min-w-0">
        <h3 className="font-semibold text-foreground">Bryan Alvarenga</h3>
        <p className="mt-0.5 text-sm leading-relaxed text-muted-foreground">
          Estudante de Engenharia de Software interessado em entender como
          sistemas são projetados e construídos. Gosto de explorar tanto o lado
          visual quanto a lógica por trás das aplicações, especialmente no
          ecossistema web.
        </p>
        <div className="mt-3 flex gap-3">
          <a
            href="https://github.com/bryancalvarenga"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-xs text-muted-foreground transition-colors hover:text-foreground"
          >
            <Github className="size-3.5" />
            GitHub
          </a>
        </div>
      </div>
    </div>
  );
}
