const connection = require('../../databaseConfig.js').connection;
const transporter = require('../../mailConfig.js').transporter;

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
            sqlStatement += ` experience LIKE "%${experience}%" AND`;
        };

        if (qualifications) {
            sqlStatement += ` qualifications LIKE "%${qualifications}%" AND`;
        };

        if (year_joined) {
            sqlStatement += ` year_joined="${year_joined}" AND`;
        };

        if (location) {
            sqlStatement += ` location LIKE "%${location}%" AND`;
        };

        if (ou) {
            sqlStatement += ` ou LIKE "%${ou}%" AND`;
        };

        if (contact_info) {
            sqlStatement += ` contact_info LIKE "%${contact_info}%" AND`;
        };

        if (grade) {
            sqlStatement += ` grade LIKE "%${grade}%" AND`;
        };

        if (skills) {
            sqlStatement += ` skills LIKE "%${skills}%" AND`;
        };

        if (current_project) {
            sqlStatement += ` current_project LIKE "%${current_project}%" AND`;
        };

        if (availability) {
            sqlStatement += ` availability LIKE "%${availability}%" AND`;
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
        const experience = qualities.cexperience;
        const qualifications = qualities.cqualifications;
        const year_joined = qualities.cyear_joined;
        const location = qualities.clocation;
        const ou = qualities.cou;
        const contact_info = qualities.ccontact_info;
        const grade = qualities.cgrade;
        const skills = qualities.cskills;
        const current_project = qualities.ccurrent_project;
        const availability = qualities.cavailability;
        const profile_pic = qualities.cprofile_pic;

        try {
            connection.execute(`INSERT INTO users (name, experience, qualifications, year_joined, location, ou, contact_info, grade, skills, current_project, availability, profile_pic) values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`, [name, experience, qualifications, year_joined, location, ou, contact_info, grade, skills, current_project, availability, profile_pic], (err, result) => {
                callback(result);
            });
        } catch (e) {
            callback(undefined);
        };
    },

    getUpdateStatement(qualities) {
        const name = qualities.updateName
        const newExperience = qualities.uexperience;
        const newQualifications = qualities.uqualifications;
        const newLocation = qualities.ulocation;
        const newOu = qualities.uou;
        const newContact_info = qualities.ucontact_info;
        const newGrade = qualities.ugrade;
        const newSkills = qualities.uskills;
        const newCurrent_project = qualities.ucurrent_project;
        const newAvailability = qualities.uavailability;
        const newProfilePic = qualities.uprofile_pic;

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

        if (newProfilePic) {
            sqlStatement += ` profile_pic="${newProfilePic}",`;
        }

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
            connection.query(`SELECT password, salt FROM credentials WHERE username="${username}";`, (err, result) => {
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
        const profile_pic = qualities.profile_pic;

        return `INSERT INTO users (name, experience, qualifications, year_joined, location, ou, contact_info, grade, skills, current_project, availability, profile_pic) values (${name}, ${experience}, ${qualifications}, ${year_joined}, ${location}, ${ou}, ${contact_info}, ${grade}, ${skills}, ${current_project}, ${availability}, ${profile_pic})`;
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

    insertCredentials(username, password, salt, callback) {
        try {
            connection.query(`INSERT INTO credentials (username, password, salt) VALUES (?, ?, ?)`, [username, password, salt], (err, result) => {
                callback(result);
            });
        } catch (e) {
            callback(undefined);
        };
    },

    sendPasswordEmail(email, username, password, callback) {
        const messageToSend = {
            from: `Team Finder <${require('../../config.json').username}>`,
            to: email,
            subject: 'Your administrator has given you moderation rights',
            text: `Dear ${email}, \n\n Your organisation's administrator has granted you permission to update/create members on Team Finder. The login is as follows: \n\n Username: ${username} \n Password: ${password} \n\n Please contact your administrator for any further queries.`,
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