interface Props {
  size?: "sm" | "md" | "lg";
  isWhite?: boolean;
}

const Spinner = ({ size = "md", isWhite = false }: Props) => {
  const sizeClasses = {
    sm: "h-4 w-4",
    md: "h-6 w-6",
    lg: "h-8 w-8",
  };

  return (
    <div
      className={`animate-spin rounded-full border-2 border-t-transparent ${
        sizeClasses[size]
      } ${isWhite ? "border-white" : "border-blue-500"}`}
    ></div>
  );
};

export default Spinner;
