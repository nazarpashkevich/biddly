export abstract class AbstractEmailDriver {
  private constructor() {}

  abstract send(to: string, subject: string, text: string): Promise<void>;
}
