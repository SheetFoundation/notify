
export type Icons = {
    [key in string]: string;
};
declare class Notify {
    private popupMargin;
    private topStartingPoint;
    private template;
    private icons;
    private showIcon;
    private duration;
    setDefaultSettings(settings: {
        showIcon?: boolean;
        duration?: number;
        popupMargin?: number;
        topStartingPoint?: number;
        template?: string;
    }): any;
    getIcon(type: string): string;
    setIcon(type: string, template: string): void;
    getIcons(): Icons;
    setIcons(icons: Icons): void;
    show(options: {
        title?: string;
        message?: string;
        type?: string;
        log?: string;
        showIcon?: boolean;
        duration?: number;
    }): void;
}
export declare const notify: Notify;
export {};
