import { ReactNode } from "react";
import EventContext from "./eventContext";

type Props = {
  children: ReactNode;
  mock?: boolean;
  onInit: (...args: unknown[]) => unknown;
  onSuccess: (...args: unknown[]) => unknown;
  onError: (...args: unknown[]) => unknown;
};

export const EventProvider = ({
  children,
  onInit,
  onSuccess,
  onError,
  mock,
}: Props) => {
  return (
    <EventContext.Provider value={{ onInit, onSuccess, onError, mock }}>
      {children}
    </EventContext.Provider>
  );
};
