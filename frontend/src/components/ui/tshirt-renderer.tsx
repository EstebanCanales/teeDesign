import { cn } from "@/lib/utils";

export interface TShirtColors {
  body: string;
  leftSleeve: string;
  rightSleeve: string;
  collar: string;
}

export interface TShirtRendererProps {
  colors?: TShirtColors;
  className?: string;
  size?: "sm" | "md" | "lg";
}

const defaultColors: TShirtColors = {
  body: "#ffffff",
  leftSleeve: "#ffffff",
  rightSleeve: "#ffffff",
  collar: "#ffffff",
};

export function TShirtRenderer({
  colors = defaultColors,
  className,
  size = "md",
}: TShirtRendererProps) {
  // Calcular clases basadas en el tamaño
  const sizeClasses = {
    sm: "w-24 h-32",
    md: "w-48 h-64",
    lg: "w-72 h-96",
  };

  return (
    <div
      data-testid="tshirt-container"
      className={cn("relative", sizeClasses[size], className)}
    >
      {/* Cuerpo de la camiseta */}
      <div
        data-testid="tshirt-body"
        className="absolute inset-x-0 top-[15%] bottom-0 rounded-t-3xl"
        style={{ backgroundColor: colors.body }}
      />

      {/* Cuello */}
      <div
        data-testid="tshirt-collar"
        className="absolute top-[15%] left-1/2 -translate-x-1/2 w-1/4 h-[10%] rounded-b-xl"
        style={{ backgroundColor: colors.collar }}
      />

      {/* Manga izquierda */}
      <div
        data-testid="tshirt-left-sleeve"
        className="absolute top-[15%] left-0 w-[30%] h-[30%] rounded-tr-3xl"
        style={{ backgroundColor: colors.leftSleeve }}
      />

      {/* Manga derecha */}
      <div
        data-testid="tshirt-right-sleeve"
        className="absolute top-[15%] right-0 w-[30%] h-[30%] rounded-tl-3xl"
        style={{ backgroundColor: colors.rightSleeve }}
      />

      {/* Contorno de la camiseta */}
      <div className="absolute inset-0 pointer-events-none border-2 border-black/10 dark:border-white/10 rounded-lg" />
    </div>
  );
}
