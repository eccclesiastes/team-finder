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

    getPossibleUsers(sqlStatement, callback) {
        connection.query(sqlStatement, (err, result) => {
            if (err) { throw err; };

            if (result.length === 0) {
                callback(undefined);
            } else {
                callback(result);
            }
        });
    },

    createUser(qualities, callback) {
        const name = qualities.createName
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

    getUpdateStatement(qualities) {
        const name = qualities.updateName
        const newExperience = qualities.experience;
        const newQualifications = qualities.qualifications;
        const newLocation = qualities.location;
        const newOu = qualities.ou;
        const newContact_info = qualities.contact_info;
        const newGrade = qualities.grade;
        const newSkills = qualities.skills;
        const newCurrent_project = qualities.current_project;
        const newAvailability = qualities.availability;

        let sqlStatement = 'UPDATE users SET';

        if (name === undefined) {
            return 1;
        } 

        if (newExperience) {
            sqlStatement += ` experience="${newExperience}",`;
        };

        if (newQualifications) {
            sqlStatement += ` qualifications="${newQualifications}",`;
        };

        if (newLocation) {
            sqlStatement += ` location="${newLocation}",`;
        };

        if (newOu) {
            sqlStatement += ` ou="${newOu}",`;
        };

        if (newContact_info) {
            sqlStatement += ` contact_info="${newContact_info}",`;
        };

        if (newGrade) {
            sqlStatement += ` grade="${newGrade}",`;
        };

        if (newSkills) {
            sqlStatement += ` skills="${newSkills}",`;
        };

        if (newCurrent_project) {
            sqlStatement += ` current_project="${newCurrent_project}",`;
        };

        if (newAvailability) {
            sqlStatement += ` availability="${newAvailability}",`;
        };

        let sqlToRun;

        if (sqlStatement.endsWith('SET')) {
            return 1;
        } else if (sqlStatement.endsWith(',')) {
            sqlToRun = sqlStatement.slice(0, -1);
        } else {
            sqlToRun = sqlStatement;
        };

        sqlToRun += ` WHERE name="${name}"`

        sqlToRun += ';';

        return sqlToRun;
    },

    updateUser(sqlStatement, callback) {
        try {
            connection.query(sqlStatement, (err, result) => {
                callback(result);
            });
        } catch (e) {
            callback(undefined);
        };
    },

    getCorrectPassword(username, callback) {
        try {
            connection.query(`SELECT password FROM credentials WHERE username="${username}";`, (err, result) => {
                callback(result);
            });
        } catch (e) {
            callback(undefined);
        };
    },

    getCreateStatementLogging(qualities) {
        const name = qualities.createName
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

        return `INSERT INTO users (name, experience, qualifications, year_joined, location, ou, contact_info, grade, skills, current_project, availability) values (${name}, ${experience}, ${qualifications}, ${year_joined}, ${location}, ${ou}, ${contact_info}, ${grade}, ${skills}, ${current_project}, ${availability})`
    },

    logAction(username, statement, callback) {
        try {
            connection.query(`INSERT INTO logs (username, action) VALUES (?, ?)`, [username, statement], (err, result) => {
                callback(result);
            });
        } catch (e) {
            callback(undefined);
        };
    },

    insertCredentials(username, password, callback) {
        try {
            connection.query(`INSERT INTO credentials (username, password) VALUES (?, ?)`, [username, password], (err, result) => {
                callback(result);
            });
        } catch (e) {
            callback(undefined);
        };
    },

    sendPasswordEmail(email, username, password, callback) {
        const nodemailer = require('nodemailer');

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: require('../../config.json').username,
                pass: require('../../config.json').password,
            },
        });

        const messageToSend = {
            from: 'Team Finder',
            to: email,
            subject: 'Your administrator has given you moderation rights',
            text: `Dear ${email}, \n\n Your organisation's administrator has granted you permission to update/create members on Team Finder. The login is as follows: \n\n Username: ${username} \n Password: ${password} \n Please contact your administrator for any further queries.`,
        };

        transporter.sendMail(messageToSend, (error, info) => {
            if (error) {
                console.log(error);
                callback(false);
            } else {
                callback(true);
            };
        });
    },
};