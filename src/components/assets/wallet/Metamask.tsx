import { useId } from "react";

type Props = React.SVGProps<SVGSVGElement>;

const Metamask = ({ ...props }: Props) => {
  const id = useId();

  return (
    <svg
      width='16'
      height='16'
      viewBox='0 0 16 16'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      {...props}
    >
      <g clipPath={`url(#clip${id})`}>
        <path
          fillRule='evenodd'
          clipRule='evenodd'
          d='M4.92627 13.25L6.79847 13.7467V13.0972L6.9513 12.9443H8.02112V13.7085V14.2434H6.87489L5.46118 13.6321L4.92627 13.25Z'
          fill='#CDBDB2'
        />
        <path
          fillRule='evenodd'
          clipRule='evenodd'
          d='M11.0391 13.25L9.2051 13.7467V13.0972L9.05227 12.9443H7.98246V13.7085V14.2434H9.12868L10.5423 13.6321L11.0391 13.25Z'
          fill='#CDBDB2'
        />
        <path
          fillRule='evenodd'
          clipRule='evenodd'
          d='M6.95117 11.8366L6.79834 13.0974L6.98934 12.9446H8.97614L9.20538 13.0974L9.05255 11.8366L8.74689 11.6455L7.21859 11.6837L6.95117 11.8366Z'
          fill='#393939'
        />
        <path
          fillRule='evenodd'
          clipRule='evenodd'
          d='M5.91943 3.31641L6.83641 5.45603L7.25673 11.6839H8.74679L9.20528 5.45603L10.0458 3.31641H5.91943Z'
          fill='#F89C35'
        />
        <path
          fillRule='evenodd'
          clipRule='evenodd'
          d='M1.9077 8.01537L0.837891 11.1101L3.51242 10.9573H5.23172V9.62008L5.15531 6.86914L4.77323 7.1748L1.9077 8.01537Z'
          fill='#F89D35'
        />
        <path
          fillRule='evenodd'
          clipRule='evenodd'
          d='M3.93262 8.35938L7.06564 8.43579L6.7218 10.0405L5.23167 9.65843L3.93262 8.35938Z'
          fill='#D87C30'
        />
        <path
          fillRule='evenodd'
          clipRule='evenodd'
          d='M3.93262 8.39746L5.23167 9.6201V10.8427L3.93262 8.39746Z'
          fill='#EA8D3A'
        />
        <path
          fillRule='evenodd'
          clipRule='evenodd'
          d='M5.23193 9.6582L6.76024 10.0403L7.25697 11.6832L6.91307 11.8742L5.23193 10.8808V9.6582Z'
          fill='#F89D35'
        />
        <path
          fillRule='evenodd'
          clipRule='evenodd'
          d='M5.23193 10.8818L4.92627 13.2507L6.9513 11.8371L5.23193 10.8818Z'
          fill='#EB8F35'
        />
        <path
          fillRule='evenodd'
          clipRule='evenodd'
          d='M7.06567 8.43652L7.25674 11.6842L6.68359 10.0222L7.06567 8.43652Z'
          fill='#EA8E3A'
        />
        <path
          fillRule='evenodd'
          clipRule='evenodd'
          d='M3.47412 10.9201L5.23167 10.8818L4.92601 13.2507L3.47412 10.9201Z'
          fill='#D87C30'
        />
        <path
          fillRule='evenodd'
          clipRule='evenodd'
          d='M1.67846 14.2822L4.92606 13.2505L3.47418 10.9199L0.837891 11.1109L1.67846 14.2822Z'
          fill='#EB8F35'
        />
        <path
          fillRule='evenodd'
          clipRule='evenodd'
          d='M6.83639 5.45605L5.1935 6.83153L3.93262 8.35983L7.06564 8.47449L6.83639 5.45605Z'
          fill='#E8821E'
        />
        <path
          fillRule='evenodd'
          clipRule='evenodd'
          d='M4.92627 13.2506L6.9513 11.8369L6.79847 13.0596V13.7473L5.423 13.4798L4.92627 13.2506Z'
          fill='#DFCEC3'
        />
        <path
          fillRule='evenodd'
          clipRule='evenodd'
          d='M11.0391 13.2506L9.05227 11.8369L9.2051 13.0596V13.7473L10.5806 13.4798L11.0391 13.2506Z'
          fill='#DFCEC3'
        />
        <path
          fillRule='evenodd'
          clipRule='evenodd'
          d='M6.22519 9.12402L6.64551 10.0028L5.15538 9.62076L6.22519 9.12402Z'
          fill='#393939'
        />
        <path
          fillRule='evenodd'
          clipRule='evenodd'
          d='M1.64014 1.52051L6.83636 5.45585L5.95762 3.31623L1.64014 1.52051Z'
          fill='#E88F35'
        />
        <path
          fillRule='evenodd'
          clipRule='evenodd'
          d='M1.64037 1.52051L0.952637 3.62192L1.33471 5.91438L1.06726 6.06721L1.44933 6.41107L1.14367 6.67853L1.56396 7.0606L1.2965 7.28985L1.90783 8.054L4.77339 7.17522C6.17434 6.05447 6.86207 5.48136 6.8366 5.45589C6.81113 5.43041 5.07905 4.11862 1.64037 1.52051Z'
          fill='#8E5A30'
        />
        <path
          fillRule='evenodd'
          clipRule='evenodd'
          d='M14.0576 8.01537L15.1274 11.1101L12.4529 10.9573H10.7336V9.62008L10.81 6.86914L11.1921 7.1748L14.0576 8.01537Z'
          fill='#F89D35'
        />
        <path
          fillRule='evenodd'
          clipRule='evenodd'
          d='M12.0327 8.35938L8.8997 8.43579L9.24353 10.0405L10.7337 9.65843L12.0327 8.35938Z'
          fill='#D87C30'
        />
        <path
          fillRule='evenodd'
          clipRule='evenodd'
          d='M12.0327 8.39746L10.7337 9.6201V10.8427L12.0327 8.39746Z'
          fill='#EA8D3A'
        />
        <path
          fillRule='evenodd'
          clipRule='evenodd'
          d='M10.7334 9.6582L9.2051 10.0403L8.70836 11.6832L9.05227 11.8742L10.7334 10.8808V9.6582Z'
          fill='#F89D35'
        />
        <path
          fillRule='evenodd'
          clipRule='evenodd'
          d='M10.7334 10.8818L11.0391 13.2507L9.05227 11.8752L10.7334 10.8818Z'
          fill='#EB8F35'
        />
        <path
          fillRule='evenodd'
          clipRule='evenodd'
          d='M8.89966 8.43652L8.70859 11.6842L9.28174 10.0222L8.89966 8.43652Z'
          fill='#EA8E3A'
        />
        <path
          fillRule='evenodd'
          clipRule='evenodd'
          d='M12.4912 10.9201L10.7337 10.8818L11.0393 13.2507L12.4912 10.9201Z'
          fill='#D87C30'
        />
        <path
          fillRule='evenodd'
          clipRule='evenodd'
          d='M14.2869 14.2822L11.0393 13.2505L12.4912 10.9199L15.1274 11.1109L14.2869 14.2822Z'
          fill='#EB8F35'
        />
        <path
          fillRule='evenodd'
          clipRule='evenodd'
          d='M9.12894 5.45605L10.7718 6.83153L12.0327 8.35983L8.8997 8.47449L9.12894 5.45605Z'
          fill='#E8821E'
        />
        <path
          fillRule='evenodd'
          clipRule='evenodd'
          d='M9.74014 9.12402L9.31982 10.0028L10.81 9.62076L9.74014 9.12402Z'
          fill='#393939'
        />
        <path
          fillRule='evenodd'
          clipRule='evenodd'
          d='M14.3252 1.52051L9.12897 5.45585L10.0077 3.31623L14.3252 1.52051Z'
          fill='#E88F35'
        />
        <path
          fillRule='evenodd'
          clipRule='evenodd'
          d='M14.325 1.52051L15.0127 3.62192L14.6306 5.91438L14.8981 6.06721L14.516 6.41107L14.8217 6.67853L14.4014 7.0606L14.6688 7.28985L14.0575 8.054L11.1919 7.17522C9.791 6.05447 9.10326 5.48136 9.12873 5.45589C9.1542 5.43041 10.8863 4.11862 14.325 1.52051Z'
          fill='#8E5A30'
        />
      </g>
      <defs>
        <clipPath id={`clip${id}`}>
          <rect
            width='14.4'
            height='14.4'
            fill='white'
            transform='translate(0.799805 0.799805)'
          />
        </clipPath>
      </defs>
    </svg>
  );
};

export default Metamask;
