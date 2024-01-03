import React from 'react';
import RootSiblings from 'react-native-root-siblings';
import ToastComp, {TImageProps, TMessageProps} from './Toast';

class Toast {
  private static siblings: RootSiblings | undefined;
  private static instance: ToastComp | null = null;
  private static timer: any = 0;

  /** 构造对象 */
  private static create(
    icon: TImageProps,
    message: TMessageProps,
    duration: number,
    cb?: () => void,
  ) {
    if (this.timer) clearTimeout(this.timer);
    if (this.siblings) {
      this.siblings.destroy();
    }
    this.siblings = new RootSiblings(
      (
        <ToastComp
          ref={e => {
            this.instance = e;
            this.instance?.showWithAnimate();
            if (duration <= 0) return;
            this.timer = setTimeout(() => {
              this.hide();
              cb?.();
            }, duration);
          }}
          image={icon}
          message={message}
        />
      ),
    );
  }

  /**
   * info 形式展示toast
   * @param message 文字信息
   * @param duration 时长
   */
  public static info(
    message: TMessageProps,
    duration: number = 2000,
    cb?: () => void,
  ) {
    this.create('info', message, duration, cb);
  }

  /**
   * 成功 形式展示toast
   * @param message 文字信息
   * @param duration 时长
   */
  public static success(
    message: TMessageProps,
    duration: number = 2000,
    cb?: () => void,
  ) {
    this.create('success', message, duration, cb);
  }

  /**
   * 失败 形式展示toast
   * @param message 文字信息
   * @param duration 时长
   */
  public static failed(
    message: TMessageProps,
    duration: number = 2000,
    cb?: () => void,
  ) {
    this.create('failed', message, duration, cb);
  }

  /**
   * loading 形式展示toast
   * @param message 文字信息
   * @param duration 时长
   */
  public static loading(
    message: TMessageProps,
    duration: number = 2000,
    cb?: () => void,
  ) {
    this.create('loading', message, duration, cb);
  }

  /**
   * 纯文字
   * @param message 文字信息
   * @param duration 时长
   * @param cb
   */
  public static text(
    message: TMessageProps,
    duration: number = 2000,
    cb?: () => void,
  ) {
    this.create('none', message, duration, cb);
  }

  /**
   * 自定义
   * @param message 文字信息
   * @param duration 时长
   */
  public static show(
    message: TMessageProps,
    icon?: TImageProps,
    duration: number = 2000,
    cb?: () => void,
  ) {
    this.create(icon || 'none', message, duration, cb);
  }

  /**
   * 隐藏
   */
  public static hide() {
    if (this.siblings) {
      this.instance?.hideWithAnimate(() => {
        this.siblings?.destroy();
        this.siblings = undefined;
        if (this.timer) clearTimeout(this.timer);
      });
    } else {
      this.siblings = undefined;
      if (this.timer) clearTimeout(this.timer);
    }
  }
}

export default Toast;
