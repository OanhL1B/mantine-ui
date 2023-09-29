import { NotificationProps, notifications } from "@mantine/notifications";

interface INotification extends Omit<NotificationProps, "title" | "message"> {
  title: string;
  message: string;
}

const AutoClose: number = 5000;

export const NotificationHelper = {
  showSuccess: (props: INotification) => {
    const { title, message, autoClose, ...rest } = props;
    notifications.show({
      title: title,
      message: message,
      autoClose: AutoClose,
      color: "green",
      ...rest,
    });
  },

  showError: (props: INotification) => {
    const { title, message, autoClose, ...rest } = props;
    notifications.show({
      title: title,
      message: message,
      autoClose: AutoClose,
      color: "red",
      ...rest,
    });
  },

};
