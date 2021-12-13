import { FC } from 'react';
import { Notification } from 'rsuite';
import { IPropsNotification } from '../interfaces/notification.interface';

const PopupMessage: FC<IPropsNotification> = (props) => {
  return (
    <Notification type={props.type} header={props.header} closable>
      <p>{props.message}</p>
    </Notification>
  );
};

export default PopupMessage;
