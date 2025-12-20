// TypeScript declaration for CarVisitors
export declare class CarVisitors {
  /**
   * Render the street and cars animation
   * @param container The DOM element to render into
   * @param cars Array of car configs
   */
  static render(
    container: HTMLElement,
    cars?: Array<{ carColor: string; wheelColor: string }>
  ): void;
}
