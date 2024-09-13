interface Props {
  name: string;
  logo: React.FC<React.SVGProps<SVGSVGElement>>;
  connect: () => void;
}

export const WalletItem = ({ name, logo: Logo, connect }: Props) => {
  return (
    <button
      onClick={connect}
      className='flex w-full items-center gap-2 p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md'
    >
      <Logo className='size-10' />
      <p>{name}</p>
    </button>
  );
};
