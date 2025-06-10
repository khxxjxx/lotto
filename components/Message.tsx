import { createRoot } from 'react-dom/client';

interface IAlertProps {
  type: string;
  content: string;
}

class Message {
  error = (content: string, timeout?: number) => {
    this.message('error', content, timeout);
  };
  warning = (content: string, timeout?: number) => {
    this.message('warning', content, timeout);
  };
  info = (content: string, timeout?: number) => {
    this.message('info', content, timeout);
  };
  success = (content: string, timeout?: number) => {
    this.message('success', content, timeout);
  };

  message(type: string, content: string, timeout = 1200) {
    const container = document.createElement('div');
    container.className =
      'fixed left-1/2 translate-x-[-50%] top-[200px] z-[999] max-w-[80vw] w-max animate-slideInOut';
    container.style.cssText = `animation-duration: ${timeout}ms;`;
    document.body.appendChild(container);
    const root = createRoot(container);
    root.render(<Alert type={type} content={content} />);

    setTimeout(() => {
      root.unmount();
      container.remove();
    }, timeout);
  }
}

const Alert = (props: IAlertProps) => {
  const { type, content } = props;

  const icons: Record<string, React.ReactNode> = {
    success: (
      <svg width='24' height='24' viewBox='0 0 24 24' fill='none'>
        <path
          fillRule='evenodd'
          clipRule='evenodd'
          d='M12 24C18.6274 24 24 18.6274 24 12C24 5.37258 18.6274 0 12 0C5.37258 0 0 5.37258 0 12C0 18.6274 5.37258 24 12 24ZM17.652 9.37181C18.0309 8.96998 18.0123 8.33709 17.6104 7.95821C17.2086 7.57933 16.5757 7.59794 16.1968 7.99977L10.3743 14.1751L8.36382 12.0449C7.98475 11.6432 7.35185 11.6249 6.9502 12.004C6.54854 12.3831 6.53024 13.016 6.90931 13.4176L9.64736 16.3188C9.83634 16.519 10.0995 16.6325 10.3748 16.6324C10.6502 16.6324 10.9133 16.5188 11.1022 16.3184L17.652 9.37181Z'
          fill='#52c41a'
        />
      </svg>
    ),
    info: (
      <svg width='24' height='24' viewBox='0 0 24 24' fill='none'>
        <path
          fillRule='evenodd'
          clipRule='evenodd'
          d='M24 12C24 18.6274 18.6274 24 12 24C5.37258 24 4.43299e-07 18.6274 9.90136e-07 12C-3.70375e-07 5.37258 5.37258 1.81956e-07 12 -1.11152e-06C18.6274 -4.97644e-07 24 5.37258 24 12ZM13.4995 6.75733C13.5141 7.17694 13.3688 7.58513 13.0962 7.89C12.8237 8.19488 12.4469 8.37082 12.0507 8.37821L12.0237 8.37821C11.2038 8.37654 10.5315 7.68902 10.5009 6.82089C10.486 6.40119 10.6313 5.99284 10.9038 5.6879C11.1764 5.38296 11.5534 5.20711 11.9497 5.2L11.9767 5.2C12.7962 5.20276 13.4679 5.88968 13.4995 6.75733ZM13.0909 17.7128L13.0909 11.2111C13.0909 10.6127 12.6025 10.1275 12 10.1275C11.3975 10.1275 10.9091 10.6127 10.9091 11.2111L10.9091 17.7128C10.9091 18.3112 11.3975 18.7964 12 18.7964C12.6025 18.7964 13.0909 18.3112 13.0909 17.7128Z'
          fill='#333333'
        />
      </svg>
    ),
    warning: (
      <svg width='24' height='23' viewBox='0 0 24 23' fill='none'>
        <path
          fillRule='evenodd'
          clipRule='evenodd'
          d='M23.7585 19.5631L13.8739 1.108C13.5088 0.426808 12.7872 0 12.0005 0C11.2139 0 10.4923 0.426808 10.1271 1.108L0.241464 19.5631C-0.101983 20.2041 -0.0776716 20.974 0.305566 21.5931C0.688803 22.2122 1.3752 22.5904 2.11538 22.5903H21.8846C22.6248 22.5904 23.3112 22.2122 23.6944 21.5931C24.0777 20.974 24.102 20.2041 23.7585 19.5631ZM10.6134 7.11586C10.6134 6.40525 11.2154 5.96531 12.0111 5.96531C12.7873 5.96531 13.4087 6.42212 13.4087 7.11586V13.6336C13.4087 14.3266 12.7873 14.7835 12.0111 14.7835C11.2153 14.7835 10.6134 14.345 10.6134 13.6336V7.11586ZM12.0198 19.5779H12.045C12.4019 19.5718 12.7414 19.4134 12.9867 19.1386C13.232 18.8638 13.3624 18.4958 13.3483 18.1179C13.3194 17.3382 12.7149 16.7216 11.9784 16.7207H11.9533C11.5972 16.7276 11.2587 16.8859 11.0139 17.1599C10.7692 17.434 10.6386 17.8008 10.6517 18.1779C10.6797 18.9577 11.2832 19.5754 12.0198 19.5779Z'
          fill='#D59A03'
        />
      </svg>
    ),
    error: (
      <svg width='24' height='24' viewBox='0 0 24 24' fill='none'>
        <path
          fillRule='evenodd'
          clipRule='evenodd'
          d='M3.51461 3.51604C8.20076 -1.16995 15.7993 -1.17231 20.4884 3.51076C25.1705 8.20252 25.1705 15.7975 20.4884 20.4892C15.7993 25.1723 8.20076 25.1699 3.51461 20.484C-1.17154 15.798 -1.17154 8.20203 3.51461 3.51604ZM16.6707 16.9435C17.0454 16.5449 17.061 15.9057 16.7062 15.4871L13.5936 12.191C13.4963 12.0876 13.4963 11.9202 13.5936 11.8168L16.7062 8.51957C17.0973 8.10561 17.0975 7.4342 16.7067 7.01994C16.3159 6.60568 15.6821 6.60544 15.291 7.01941L12.1784 10.3166C12.1315 10.3664 12.0677 10.3945 12.0013 10.3945C11.9348 10.3945 11.8711 10.3664 11.8241 10.3166L8.71249 7.01941C8.31643 6.6406 7.70946 6.65756 7.3328 7.05796C6.95614 7.45836 6.94228 8.10138 7.30129 8.51957L10.4139 11.8168C10.4609 11.8663 10.4873 11.9336 10.4873 12.0039C10.4873 12.0741 10.4609 12.1415 10.4139 12.191L7.30129 15.4871C7.11336 15.686 7.00776 15.9558 7.00776 16.2372C7.00776 16.5186 7.11336 16.7884 7.30129 16.9873C7.69641 17.3911 8.32237 17.3911 8.71749 16.9873L11.8291 13.6901C11.9273 13.5874 12.0852 13.5874 12.1834 13.6901L15.296 16.9873C15.6927 17.3613 16.296 17.3421 16.6707 16.9435Z'
          fill='#FF4948'
        />
      </svg>
    ),
  };

  const typeStyle: Record<string, Record<string, string>> = {
    success: {
      bg: 'bg-white shadow-[0_7.65px_7.65px_0_#0000001A]',
      text: 'text-primary-charcoal',
    },
    info: {
      bg: 'bg-black-10 shadow-[0_7.65px_7.65px_0_#0000001F]',
      text: 'text-primary-charcoal',
    },
    warning: {
      bg: 'bg-[#fffcf4] shadow-[0_7.65px_7.65px_0_#9068011F]',
      text: 'text-[#D59A03]',
    },
    error: {
      bg: 'bg-red-50 shadow-[0_7.65px_7.65px_0_#9527261F]',
      text: 'text-red-600',
    },
  };

  return (
    <div
      className={`flex rounded-lg items-center gap-1 h-fit py-2 px-4 ${typeStyle[type].bg}`}
    >
      <div className='shrink-0'>{icons[type]}</div>
      <span className={`px-[4px] ${typeStyle[type].text}`}>{content}</span>
    </div>
  );
};

export const message = new Message();
