import { ReactNode, useState } from "react";

import NoticeBar from "../components/NoticeBar";
import NoticeBarContext from "../context";
import type { NoticeBarState } from "../types";

interface NoticeBarProviderProps {
  children: ReactNode;
}

const NoticeBarProvider = ({ children }: NoticeBarProviderProps) => {
  const [queue, setQueue] = useState<NoticeBarState[]>([]);
  const [id, setId] = useState(0);

  const showNotice = ({
    message,
    duration = 2500,
  }: {
    message: string;
    duration?: number;
  }) => {
    setQueue((prevQueue) => {
      const newNotice: NoticeBarState = { id, message, duration };
      setId((prevId) => prevId + 1);
      return [...prevQueue, newNotice];
    });
  };

  return (
    <NoticeBarContext.Provider value={{ showNotice }}>
      {children}
      {queue.length > 0 &&
        queue.map((notice) => {
          return (
            <NoticeBar
              key={notice.id}
              setQueue={setQueue}
              zIndex={notice.id}
              {...notice}
            />
          );
        })}
    </NoticeBarContext.Provider>
  );
};

export default NoticeBarProvider;
