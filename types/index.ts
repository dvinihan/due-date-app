export class GuessWithoutId {
  name: string;
  date: string;

  constructor(props: Partial<GuessWithoutId> = {}) {
    this.name = props.name || "";
    this.date = props.date || "";
  }
}

export class GuessWithId extends GuessWithoutId {
  _id: string;

  constructor(props: Partial<GuessWithId> = {}) {
    super(props);
    this._id = props._id || "";
  }
}
