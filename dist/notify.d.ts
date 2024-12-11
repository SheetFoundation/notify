export declare enum NotifyType {
    information = "information",
    success = "success",
    warning = "warning",
    danger = "danger"
}
export type NotifyIcons = {
    [key in NotifyType]: string;
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
    getIcon(type: NotifyType): string;
    setIcon(type: NotifyType, template: string): void;
    getIcons(): NotifyIcons;
    setIcons(icons: NotifyIcons): void;
    show(options: {
        title?: string;
        message?: string;
        type?: NotifyType;
        log?: string;
        icon?: string;
        showIcon?: boolean;
        duration?: number;
    }): void;
}
export declare const notify: Notify;
export {};
