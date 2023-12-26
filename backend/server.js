const db = require("./src/lib/db");
const app = require("./app");

app.listen(4000, async () => {
    try {
        await db.sequelize.sync({ force: false });
        console.log("Backend Start");
    } catch (error) {
        console.error("Backend Error", error);
    }
});
