import { createContext, ReactNode, useContext, useEffect } from "react";
import { connectable, Connectable, filter, fromEvent, map, merge } from "rxjs";

import { AnyEvent, eventCreators } from "./GlobalControlEvents.ts";

type IGlobalControlsContext = null | {
  eventsStream: Connectable<AnyEvent>;
};

const GlobalControlsContext = createContext<IGlobalControlsContext>(null);

export function GlobalControlsProvider({ children }: { children: ReactNode }) {
  let isShowingInput = false;
  const eventsStream = connectable(
    merge(
      fromEvent(window, "keydown").pipe(
        filter(
          (e) =>
            (e as KeyboardEvent).code === "Escape" ||
            (e as KeyboardEvent).code === "Space",
        ),
        map((e) => ({ type: "keydown", event: e })),
      ),
      fromEvent(window, "keyup").pipe(
        map((e) => ({ type: "keydown", event: e })),
      ),
    ).pipe(
      map((e) => {
        if ((e.event as KeyboardEvent).code === "Space" && !isShowingInput) {
          isShowingInput = true;
          return eventCreators["SHOW_INPUT"]();
        }
        if ((e.event as KeyboardEvent).code === "Escape" && isShowingInput) {
          isShowingInput = false;
          return eventCreators["HIDE_INPUT"]();
        }
        return null;
      }),
      filter((e) => e !== null),
    ),
  );

  useEffect(() => {
    const sub = eventsStream.connect();
    return () => {
      sub.unsubscribe();
    };
  }, []);

  const context: IGlobalControlsContext = {
    eventsStream,
  };

  return (
    <GlobalControlsContext.Provider value={context}>
      {children}
    </GlobalControlsContext.Provider>
  );
}

export function useGlobalControlsContext() {
  return useContext(GlobalControlsContext);
}
