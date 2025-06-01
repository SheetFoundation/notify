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
    private closeIcon;
    private showIcon;
    private showCloseButton;
    private duration;
    private notificationsCount;
    setDefaultSettings(settings: {
        showIcon?: boolean;
        showCloseButton?: boolean;
        duration?: number;
        popupMargin?: number;
        topStartingPoint?: number;
        template?: string;
    }): any;
    getIcon(type: NotifyType): string;
    setIcon(type: NotifyType, template: string): void;
    getIcons(): NotifyIcons;
    setIcons(icons: NotifyIcons): void;
    getCloseIcon(): string;
    setCloseIcon(template: string): void;
    show(options: {
        title?: string;
        message?: string;
        type?: NotifyType;
        log?: string;
        icon?: string;
        showIcon?: boolean;
        duration?: number;
        showCloseButton?: boolean;
    }): void;
    private hide;
}
export declare const notify: Notify;
export {};
