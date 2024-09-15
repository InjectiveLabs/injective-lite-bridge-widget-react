import { createContext, useContext } from "react";

interface EventContextType {
  onInit: (...args: unknown[]) => unknown;
  onError: (...args: unknown[]) => unknown;
  onSuccess: (...args: unknown[]) => unknown;
  mock: boolean;
}

export type EventState = EventContextType;

const EventContext = createContext<EventState>({
  onInit: () => {},
  onSuccess: () => {},
  onError: () => {},
  mock: false,
});

export const useEvent = () => {
  const context = useContext(EventContext);
  if (!context) {
    throw new Error("useEvent must be used within an EventProvider");
  }
  return context;
};

export default EventContext;
