export class GuessWithoutId {
  firstName: string;
  lastName: string;
  date: number;
  month: number;
  time: string;

  constructor(props: Partial<GuessWithoutId> = {}) {
    this.firstName = props.firstName || "";
    this.lastName = props.lastName || "";
    this.date = props.date || 0;
    this.month = props.month || 0;
    this.time = props.time || "";
  }
}

export class GuessWithId extends GuessWithoutId {
  _id: string;

  constructor(props: Partial<GuessWithId> = {}) {
    super(props);
    this._id = props._id || "";
  }
}

export type DayOfWeek =
  | "Sunday"
  | "Monday"
  | "Tuesday"
  | "Wednesday"
  | "Thursday"
  | "Friday"
  | "Saturday";

export type Month = "May" | "June";

export type CalendarDay = {
  dayOfWeek: DayOfWeek;
  date: number;
  month: Month;
};
