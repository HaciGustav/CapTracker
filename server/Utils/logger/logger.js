import errsole from "errsole";
import ErrsolePostgres from "errsole-postgres";

ErrsolePostgres.prototype.initialize = () => console.log("parent initialized");

class LoggerStorage extends ErrsolePostgres {
  constructor(options = {}) {
    super(options);

    let { tablePrefix, ...pgOptions } = options;

    tablePrefix = "captracker";

    this.logsTable = `${tablePrefix}_logs`;
    this.usersTable = `${tablePrefix}_users`;
    this.configTable = `${tablePrefix}_config`;
    this.notificationsTable = `${tablePrefix}_notifications`;

    // this.initialize();
  }

  async initialize() {
    await this.checkConnection();
    await this.setWorkMem();
    await this.createTables();
    await this.ensureLogsTTL();
    this.emit("ready");
    setInterval(() => this.flushLogs(), this.flushInterval);
  }
}

const loggerSingleton = () => {
  if (!errsole?.isInitialized) {
    errsole.initialize({
      storage: new LoggerStorage({
        host: "localhost",
        user: "postgres",
        password: "captracker",
        database: "captracker",
      }),
      enableDashboard: false,
    });
    errsole.isInitialized = true;
    console.log("errsole - initialized");
  }
  return errsole;
};

const logger = loggerSingleton();

export default logger;
