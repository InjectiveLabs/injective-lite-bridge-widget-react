import { useId } from "react";

type Props = React.SVGProps<SVGSVGElement>;

const InjectiveLogo = ({ ...props }: Props) => {
  const id = useId();

  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width='140'
      height='30'
      fill='none'
      viewBox='0 0 140 30'
      {...props}
    >
      <g clipPath={`url(#clip0_${id}_13707)`}>
        <path
          fill='currentColor'
          d='M39.032 21.925V9.954c0-1.23.997-2.227 2.227-2.227h.163v14.2h-2.39zM44.887 21.925V7.726h2.515l5.757 10.305V7.726h.06c1.23 0 2.227.997 2.227 2.227v11.973H52.93L47.173 11.62v10.304h-2.286zM62.978 22.27c-1.483 0-2.64-.453-3.471-1.358-.831-.907-1.247-2.11-1.247-3.611h2.39c0 .879.194 1.582.582 2.11.402.513.984.77 1.746.77s1.344-.257 1.746-.77c.416-.528.623-1.225.623-2.09V9.953c0-1.23.998-2.227 2.228-2.227h.163v9.595c0 1.5-.423 2.705-1.268 3.61-.831.893-1.995 1.34-3.492 1.34zM70.984 7.726h8.397a2.09 2.09 0 01-2.09 2.09h-3.917v4.016h6.007v2.09h-6.007v3.914h6.007v2.09h-8.397V7.725zM131.654 7.726h8.397a2.09 2.09 0 01-2.09 2.09h-3.917v4.016h6.007v2.09h-6.007v3.914h6.007v2.09h-8.397V7.725zM89.153 22.27c-2.074 0-3.715-.69-4.925-2.069-1.21-1.38-1.814-3.171-1.814-5.376 0-2.204.605-3.996 1.814-5.375 1.21-1.38 2.851-2.07 4.925-2.07 1.74 0 3.172.488 4.295 1.461 1.123.96 1.783 2.212 1.98 3.753h-.534c-1.049 0-1.886-.793-2.508-1.637a3.586 3.586 0 00-.623-.655c-.666-.555-1.53-.832-2.592-.832-1.419 0-2.53.487-3.332 1.46-.79.96-1.185 2.26-1.185 3.895 0 1.637.395 2.942 1.185 3.916.802.96 1.913 1.44 3.332 1.44 1.062 0 1.926-.277 2.592-.832.236-.193.444-.411.623-.655.622-.844 1.46-1.637 2.508-1.637h.535c-.198 1.541-.858 2.8-1.981 3.773-1.123.96-2.555 1.44-4.295 1.44zM101.6 21.925V9.918h-4.219c0-1.21.981-2.19 2.191-2.19h8.659v2.19h-4.24v12.008H101.6zM111.264 21.925V9.954c0-1.23.997-2.227 2.227-2.227h.163v14.2h-2.39zM121.509 21.925l-4.822-14.199h.972c.968 0 1.826.626 2.121 1.549l2.872 8.98 2.872-8.98a2.226 2.226 0 012.121-1.549h.972l-4.822 14.2h-2.286z'
        ></path>
        <path
          fill={`url(#paint0_linear_${id}_13707)`}
          d='M3.521 5.1c.18-.227.372-.445.562-.663.01-.01.028-.013.037-.023.017-.022.045-.035.062-.056l.017-.022c.134-.123.275-.257.439-.374a6.535 6.535 0 011.81-.991c2.027-.712 4.285-.273 6.055 1.398 2.472 2.317 2.25 6.05.278 8.53-2.494 3.7-6.78 8.86-.846 13.482 1.067.831 1.858 1.517 5.219 2.488-2.198.405-4.236.279-6.504-.3-1.605-.906-4.127-2.845-4.985-5.464-1.298-3.972 2.283-9.909 4.014-12.195 2.376-3.165-1.469-6.59-4.3-2.766-1.479 1.993-4.067 7.633-3.168 11.817.526 2.372 1.227 4.101 4.007 6.477a13.164 13.164 0 01-1.502-1.035C-1.742 19.387-.992 10.086 3.521 5.1z'
        ></path>
        <path
          fill={`url(#paint1_linear_${id}_13707)`}
          d='M25.505 24.089c-.18.227-.371.445-.562.662-.009.011-.028.013-.037.024-.017.022-.045.035-.062.056l-.017.022c-.133.123-.275.257-.438.373a6.53 6.53 0 01-1.81.992c-2.028.712-4.285.273-6.056-1.398-2.472-2.317-2.25-6.05-.277-8.531 2.494-3.699 6.779-8.859.845-13.481-1.066-.831-1.858-1.517-5.218-2.488 2.198-.405 4.235-.279 6.504.3 1.604.906 4.127 2.845 4.985 5.464 1.297 3.972-2.284 9.908-4.014 12.195-2.376 3.165 1.468 6.59 4.299 2.766 1.48-1.993 4.068-7.633 3.168-11.817-.526-2.372-1.227-4.102-4.006-6.477a13.14 13.14 0 011.501 1.035c6.458 6.016 5.709 15.317 1.195 20.303z'
        ></path>
      </g>
      <defs>
        <linearGradient
          id={`paint0_linear_${id}_13707`}
          x1='0.003'
          x2='29.024'
          y1='14.594'
          y2='14.594'
          gradientUnits='userSpaceOnUse'
        >
          <stop stopColor='#0082FA'></stop>
          <stop
            offset='1'
            stopColor='#00F2FE'
          ></stop>
        </linearGradient>
        <linearGradient
          id={`paint1_linear_${id}_13707`}
          x1='0.003'
          x2='29.024'
          y1='14.594'
          y2='14.594'
          gradientUnits='userSpaceOnUse'
        >
          <stop stopColor='#0082FA'></stop>
          <stop
            offset='1'
            stopColor='#00F2FE'
          ></stop>
        </linearGradient>
        <clipPath id={`clip0_${id}_13707`}>
          <path
            fill='currentColor'
            d='M0 0H140V29.085H0z'
          ></path>
        </clipPath>
      </defs>
    </svg>
  );
};

export default InjectiveLogo;
