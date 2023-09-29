import { modals } from "@mantine/modals";
import {
  OpenConfirmModal,
} from "@mantine/modals/lib/context";
import { ReactNode } from "react";



interface IModal extends OpenConfirmModal {
  title: string;
  children: ReactNode;
}

export const CustomModal = {
  showConfirm: (props: IModal) => {
    const { title, centered, children, ...rest } = props;
    modals.openConfirmModal({
      onCancel() {
        () => console.log("Cancel");
      },
      title: title,
      centered: true,
      children: children,
      confirmProps: { color: "red" },
   
      ...rest,
    });
  },
};
