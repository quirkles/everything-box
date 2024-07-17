const EventTypes = {
  SHOW_INPUT: "SHOW_INPUT",
  HIDE_INPUT: "HIDE_INPUT",
} as const;

export type EventType = keyof typeof EventTypes;

type EventPayload = string | number | boolean | Record<string, unknown>;

type EventCreator<T extends EventType> = (...args: never[]) => {
  type: T;
  payload?: EventPayload;
};

export const eventCreators = {
  [EventTypes.SHOW_INPUT]: () => ({ type: EventTypes.SHOW_INPUT }),
  [EventTypes.HIDE_INPUT]: () => ({ type: EventTypes.HIDE_INPUT }),
} satisfies {
  [eventType in EventType]: EventCreator<eventType>;
};

export type Event<T extends EventType> = (typeof eventCreators)[T] extends (
  ...args: never[]
) => {
  type: T;
  payload?: infer Payload;
}
  ? {
      type: T;
      payload?: Payload;
    }
  : never;

export type AnyEvent = Event<EventType>;
