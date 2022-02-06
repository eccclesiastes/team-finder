const connection = require('../../databaseConfig.js').connection;

module.exports = {
    getStatement(desiredQualities) {
        const experience = desiredQualities.experience;
        const qualifications = desiredQualities.qualifications;
        const year_joined = desiredQualities.year_joined;
        const location = desiredQualities.location;
        const ou = desiredQualities.ou;
        const contact_info = desiredQualities.contact_info;
        const grade = desiredQualities.grade;
        const skills = desiredQualities.skills;
        const current_project = desiredQualities.current_project;
        const availability = desiredQualities.availability;

        let sqlStatement = 'SELECT * FROM users WHERE';

        if (experience) {
            sqlStatement += ` experience="${experience}" AND`;
        };

        if (qualifications) {
            sqlStatement += ` qualifications="${qualifications}" AND`;
        };

        if (year_joined) {
            sqlStatement += ` year_joined="${year_joined}" AND`;
        };

        if (location) {
            sqlStatement += ` location="${location}" AND`;
        };

        if (ou) {
            sqlStatement += ` ou="${ou}" AND`;
        };

        if (contact_info) {
            sqlStatement += ` contact_info="${contact_info}" AND`;
        };

        if (grade) {
            sqlStatement += ` grade="${grade}" AND`;
        };

        if (skills) {
            sqlStatement += ` skills="${skills}" AND`;
        };

        if (current_project) {
            sqlStatement += ` current_project="${current_project}" AND`;
        };

        if (availability) {
            sqlStatement += ` availability="${availability}" AND`;
        };

        let sqlToRun;

        if (sqlStatement.endsWith('AND')) {
            sqlToRun = sqlStatement.slice(0, -4);
        } else if (sqlStatement.endsWith('WHERE')) {
            sqlToRun = sqlStatement.slice(0, -6);
        } else {
            sqlToRun = sqlStatement;
        };

        sqlToRun += ';';

        return sqlToRun;
    },

    async getPossibleUsers(sqlStatement, callback) {
        connection.query(sqlStatement, (err, result) => {
            if (err) { throw err; };

            callback(result);
        });
    },

    async createUser(qualities, callback) {
        const name = qualities.name
        const experience = qualities.experience;
        const qualifications = qualities.qualifications;
        const year_joined = qualities.year_joined;
        const location = qualities.location;
        const ou = qualities.ou;
        const contact_info = qualities.contact_info;
        const grade = qualities.grade;
        const skills = qualities.skills;
        const current_project = qualities.current_project;
        const availability = qualities.availability;

        try {
            connection.execute(`INSERT INTO users (name, experience, qualifications, year_joined, location, ou, contact_info, grade, skills, current_project, availability) values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`, [name, experience, qualifications, year_joined, location, ou, contact_info, grade, skills, current_project, availability], (err, result) => {
                callback(result);
            });
        } catch (e) {
            callback(undefined);
        };
    },
};