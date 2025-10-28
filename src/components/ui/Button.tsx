type ButtonProps = {
  children: React.ReactNode;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

const Button = ({ children, ...props }: ButtonProps) => {
  return (
    <button
      className="w-full flex justify-center items-center space-x-2 bg-[#80B5FF] hover:bg-[#80B5FF]/80 text-sm font-medium text-black px-4 py-2.5 rounded-md"
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
