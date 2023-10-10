export type Icons = {
    [key in string]: string;
};
declare class Notify {
    private popupMargin;
    private topStartingPoint;
    private template;
    private icons;
    show(options: {
        [index: string]: string;
    }): void;
}
export declare const notify: Notify;
export {};
