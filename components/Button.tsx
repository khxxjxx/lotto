import { ButtonHTMLAttributes } from 'react';

interface IButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children?: React.ReactNode;
  width?: 'auto' | 'full';
  size?: 'sm' | 'md' | 'lg';
  variant?: 'contained' | 'outlined';
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  disabled?: boolean;
}

const Button = (props: IButtonProps) => {
  const {
    className = '',
    width = 'full',
    size = 'md',
    variant = 'contained',
    startIcon,
    endIcon,
    disabled,
    children,
    ...restProps
  } = props;

  const widthStyle =
    startIcon || endIcon || width == 'auto' ? 'w-auto' : 'w-full';
  const hasIcon = startIcon || endIcon;

  const defaultStyle = `relative flex items-center justify-center transition-[top] whitespace-nowrap top-0 [&:not(:disabled):active]:top-[2px]`;

  const styles = {
    contained:
      'bg-primary-charcoal hover:bg-black-80 text-white shadow-[0_4px_5px_#00000026]',
    outlined:
      'bg-white border border-primary-charcoal text-primary-charcoal hover:border-black-80 hover:text-black-80 shadow-[0_4px_5px_#00000014]',
    disabled: 'bg-black-10 text-black-40',

    sm: 'h-[32px] text-[14px] px-[8px] rounded-[6px] [&.withIcon]:px-[12px] leading-[14px]',
    md: 'h-[48px] text-[16px] px-[12px] rounded-[8px] [&.withIcon]:px-[16px] leading-[16px]',
    lg: 'h-[56px] text-[17px] px-[16px] rounded-[10px] [&.withIcon]:px-[20px] leading-[17px]',
    gap: {
      sm: 'gap-[4px]',
      md: 'gap-[8px]',
      lg: 'gap-[12px]',
    },
    icon: {
      contained: 'fill-white',
      outlined: 'fill-primary-charcoal hover:fill-black-80',
      disabled: 'fill-black-40',

      sm: 'w-[16px] h-[16px]',
      md: 'w-[20px] h-[20px]',
      lg: 'w-[24px] h-[24px]',
    },
  };

  return (
    <button
      className={`${className} ${hasIcon ? 'withIcon' : ''} ${defaultStyle} ${
        styles[disabled ? 'disabled' : variant]
      } ${styles[size]} ${
        startIcon || endIcon ? `${styles.gap[size]}` : ''
      } ${widthStyle} max-h-full py-[4px] font-medium`}
      disabled={!!disabled}
      {...restProps}
    >
      {startIcon && (
        <span
          className={`${styles.icon[disabled ? 'disabled' : variant]} ${
            styles.icon[size]
          }`}
        >
          {startIcon}
        </span>
      )}
      {children && <span className='px-[4px]'>{children}</span>}
      {endIcon && (
        <span
          className={`${styles.icon[disabled ? 'disabled' : variant]} ${
            styles.icon[size]
          }`}
        >
          {endIcon}
        </span>
      )}
    </button>
  );
};

export default Button;
