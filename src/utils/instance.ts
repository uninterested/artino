class Instance {
  private hashMap: POJO = {};

  public set(key: string, value: any) {
    this.hashMap[key] = value;
  }

  public get(key: string) {
    return this.hashMap[key];
  }

  public remove(key: string) {
    delete this.hashMap[key];
  }

  public destory() {
    this.hashMap = {};
  }
}

export default new Instance();
