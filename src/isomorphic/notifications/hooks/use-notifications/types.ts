import type { MessageDescriptor } from "@lingui/core";

export type NotificationOptions = {
  autoClose?: false | number;
  id?: string;
  message: MessageDescriptor | string;
};

export type ShowNotification = (options: NotificationOptions) => string;

export type RemoveNotification = (id: string) => void;

export type CleanNotifications = () => void;

export type NotificationsState = {
  displayed: string[];
  queued: string[];
};

export type Notifications = {
  clean: CleanNotifications;
  error: ShowNotification;
  info: ShowNotification;
  remove: RemoveNotification;
  state: NotificationsState;
  success: ShowNotification;
  warning: ShowNotification;
};

export type UseNotificationsInput = object;

export type UseNotificationsOutput = {
  notifications: Notifications;
};
