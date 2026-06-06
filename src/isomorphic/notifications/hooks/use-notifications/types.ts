import type { MessageDescriptor } from "@lingui/core";
import type { NotificationData as MantineNotificationData } from "@mantine/notifications";

export type NotificationMessage = MessageDescriptor | string;

export type NotificationOptions = Omit<
  MantineNotificationData,
  "id" | "message"
> & {
  message: NotificationMessage;
};

export type ShowNotification = (options: NotificationOptions) => string;

export type UpdateNotification = (
  id: string,
  options: NotificationOptions,
) => void;

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
  update: UpdateNotification;
  warning: ShowNotification;
};

export type UseNotificationsInput = object;

export type UseNotificationsOutput = {
  notifications: Notifications;
};
