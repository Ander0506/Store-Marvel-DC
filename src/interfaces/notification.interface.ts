import { MessageType } from 'rsuite/esm/Notification/Notification';

export interface IPropsNotification {
  type: MessageType | undefined;
  message: string;
  header: string;
}
