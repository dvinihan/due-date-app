export class GuessWithoutId {
  name: string;
  date: Date;

  constructor(props: Partial<GuessWithoutId> = {}) {
    this.name = props.name || "";
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
