import ExpressConfig from './Express';

export default class Application {

  static port = process.env.PORT || 8000;
  
  public server:  any;
  public express: ExpressConfig;

  public constructor() {
    this.express = new ExpressConfig();
    this.express.app.listen(Application.port, () => {
      console.log(`Server has started! Check out: http://localhost:${Application.port}`);
    });
  }

}
