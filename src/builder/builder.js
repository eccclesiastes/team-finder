const connection = require('../../databaseConfig.js').connection;

module.exports = {
    filterUser(desiredQualities) {
        const experience = desiredQualities.experience;
        const qualifications = desiredQualities.qualifications;
        const year_joined = desiredQualities.year_joined;
        const location = desiredQualities.location;
        const ou = desiredQualities.ou;
        const contact_info = desiredQualities.contact_info;
        const grade = desiredQualities.grade;
        const skills = desiredQualities.skills;
        const insight_colour = desiredQualities.insight_colour;
        const current_project = desiredQualities.current_project;
        const availability = desiredQualities.availability;

        let sqlStatement = 'SELECT * FROM users';

        if (experience) {
            sqlStatement += ` WHERE experience=${experience} AND`;
        };

        if (qualifications) {
            sqlStatement += ` WHERE qualifications=${qualifications} AND`;
        };

        if (year_joined) {
            sqlStatement += ` WHERE year_joined=${year_joined} AND`;
        };

        if (location) {
            sqlStatement += ` WHERE location=${location} AND`;
        };

        if (ou) {
            sqlStatement += ` WHERE ou=${ou} AND`;
        };

        if (contact_info) {
            sqlStatement += ` WHERE contact_info=${contact_info} AND`;
        };

        if (grade) {
            sqlStatement += ` WHERE grade=${grade} AND`;
        };

        if (skills) {
            sqlStatement += ` WHERE skills=${skills} AND`;
        };

        if (insight_colour) {
            sqlStatement += ` WHERE insight_colour=${insight_colour} AND`;
        };

        if (current_project) {
            sqlStatement += ` WHERE current_project=${current_project} AND`;
        };

        if (availability) {
            sqlStatement += ` WHERE availability=${availability} AND`;
        };

        let sqlToRun;

        if (sqlStatement.endsWith('AND')) {
            sqlToRun = sqlStatement.slice(0, -4);
        };

        sqlToRun += ';';
    },
};