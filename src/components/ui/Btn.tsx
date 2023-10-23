'use client';
import { cn } from '@/lib/utils';
import { Button } from '@chakra-ui/react';

type BtnProps = {
  type?: 'submit' | 'button' | 'reset';
  onClick?: () => void;
  children: React.ReactNode;
  className?: string;
  props?: unknown;
};
const Btn = ({ type, onClick, children, className, ...props }: BtnProps) => (
  <>
    <Button
      className={className}
      colorScheme='yellow'
      type={type}
      onClick={onClick}
      {...props}
    >
      {children}
    </Button>
  </>
);

export default Btn;
