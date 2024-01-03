import ModalComp, {IModalProps} from './modal';
import RootSiblings from 'react-native-root-siblings';

export default class Modal {
  private static siblings: RootSiblings | undefined;

  public static present(opt: IModalProps) {
    if (this.siblings) this.siblings.destroy();
    this.siblings = new RootSiblings(
      (
        <ModalComp
          {...opt}
          onClose={() => {
            if ([undefined, true].includes(opt.autoDismiss)) this.dismiss();
            else opt.onClose?.();
          }}
        />
      ),
    );
  }
  /**
   * 隐藏
   */
  public static dismiss() {
    if (this.siblings) {
      this.siblings?.destroy();
    }
    this.siblings = undefined;
  }
}
