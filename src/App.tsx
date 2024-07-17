import { useEffect, useState } from "react";
import { Subscription } from "rxjs";
import styled from "styled-components";

import "./App.css";

import { useGlobalControlsContext } from "./context/GlobalControlsContext.tsx";
import { Input } from "./components/Input.tsx";
import { Apps } from "./components/Apps.tsx";

const StyledApp = styled.div`
  height: 100vh;
  width: 100vw;
  #apps,
  #input {
    height: 100vh;
    width: 100vw;
    position: absolute;
    z-index: 1;
    background-color: black;
  }
  #input {
    opacity: 0;
    transition: opacity 0.2s;
  }
  &.show-input {
    #input {
      z-index: 2;
      opacity: 0.7;
    }
  }

  &.show-apps {
    #apps {
      z-index: 2;
    }
  }
`;

function App() {
  const context = useGlobalControlsContext();
  const [isShowingInput, setIsShowingInput] = useState(false);
  useEffect(() => {
    let sub: Subscription | null = null;
    if (context?.eventsStream) {
      sub = context.eventsStream.subscribe((e) => {
        switch (e.type) {
          case "SHOW_INPUT":
            return setIsShowingInput(true);
          case "HIDE_INPUT":
            return setIsShowingInput(false);
          default:
            return;
        }
      });
    }
    return () => {
      sub?.unsubscribe();
    };
  }, [context?.eventsStream]);
  return (
    <StyledApp className={`show-${isShowingInput ? "input" : "apps"}`}>
      <Input />
      <Apps />
    </StyledApp>
  );
}

export default App;
