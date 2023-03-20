export class GuessWithoutId {
  firstName: string;
  lastName: string;
  date: Date;

  constructor(props: Partial<GuessWithoutId> = {}) {
    this.firstName = props.firstName || "";
    this.lastName = props.lastName || "";
    this.date = new Date(props.date ?? "");
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
