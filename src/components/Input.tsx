import styled from "styled-components";
import { useEffect, useRef } from "react";
import { useGlobalControlsContext } from "../context/GlobalControlsContext.tsx";
import { filter, map } from "rxjs";
import { colors } from "../styles/colors.ts";

const StyledInput = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  input {
    font-size: 2rem;
    padding: 0.5rem;
    border: none;
    outline: none;
    color: ${colors.cyan[500]};
    &::placeholder {
      color: ${colors.cyan[100]};
    }
  }
`;

export function Input() {
  const inputRef = useRef<HTMLInputElement>(null);
  const globalControlsContext = useGlobalControlsContext();
  useEffect(() => {
    const sub = globalControlsContext?.eventsStream
      .pipe(
        filter((e) => e.type === "SHOW_INPUT" || e.type === "HIDE_INPUT"),
        map((e) => e.type),
      )
      .subscribe((e) => {
        if (e === "SHOW_INPUT") {
          setTimeout(() => {
            inputRef.current?.focus();
          }, 1);
        }
        if (e === "HIDE_INPUT") {
          inputRef.current?.blur();
        }
      });
    return () => {
      sub?.unsubscribe();
    };
  }, [globalControlsContext]);
  return (
    <StyledInput id="input">
      <input
        ref={inputRef}
        type="text"
        placeholder="command"
        className="monospace"
      />
    </StyledInput>
  );
}
