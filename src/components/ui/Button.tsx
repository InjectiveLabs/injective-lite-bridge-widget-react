type ButtonProps = {
  children: React.ReactNode;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

const Button = ({ children, ...props }: ButtonProps) => {
  return (
    <button
      className='w-full flex justify-center items-center space-x-2 bg-blue-500 text-white px-4 py-2 rounded-md'
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
