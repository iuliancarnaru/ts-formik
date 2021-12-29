import { ReactNode } from "react";

interface TextErrorProps {
  children: ReactNode;
}

export const TextError = ({ children }: TextErrorProps) => {
  return <div className="error">{children}</div>;
};
